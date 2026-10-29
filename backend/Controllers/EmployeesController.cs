using CompanyX.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyX.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly AppDbContext _db;

    public EmployeesController(AppDbContext db) => _db = db;

    private static int FullYears(DateTime from, DateTime to)
    {
        if (to < from)
            return 0;
        int years = to.Year - from.Year;
        if (from.Date.AddYears(years) > to.Date)
            years--;
        return Math.Max(years, 0);
    }

    private static EmployeeDto ToDto(Employee e)
    {
        var today = DateTime.Today;
        var end = e.IsActive ? today : (e.DismissalDate?.Date ?? today);

        return new EmployeeDto(
            e.Id,
            e.TabNumber,
            e.FullName,
            e.Gender.ToString(),
            e.BirthDate.Date,
            FullYears(e.BirthDate, today),
            FullYears(e.HireDate, end),
            e.HireDate,
            e.DismissalDate,
            e.Position,
            e.Phone,
            e.Email,
            e.PhotoUrl,
            e.DepartmentId,
            e.Department?.FullName ?? "",
            e.IsActive
        );
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool includeDismissed = false)
    {
        var query = _db.Employees.Include(e => e.Department).AsQueryable();

        if (!includeDismissed)
            query = query.Where(e => e.IsActive);

        var list = await query.ToListAsync();
        return Ok(list.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var e = await _db.Employees.Include(x => x.Department).FirstOrDefaultAsync(x => x.Id == id);

        return e is null ? NotFound() : Ok(ToDto(e));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto dto)
    {
        var e = await _db.Employees.FindAsync(id);
        if (e is null)
            return NotFound();

        e.FullName = dto.FullName;
        e.Gender = dto.Gender;
        e.BirthDate = dto.BirthDate;
        e.Phone = dto.Phone;
        e.Email = dto.Email;
        e.PhotoUrl = dto.PhotoUrl;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("hire")]
    public async Task<IActionResult> Hire([FromBody] CreateEmployeeDto dto)
    {
        if (await _db.Employees.AnyAsync(e => e.TabNumber == dto.TabNumber))
            return BadRequest("Табельный номер уже занят");

        var dept = await _db.Departments.FindAsync(dto.DepartmentId);
        if (dept is null || dept.LiquidatedDate.HasValue)
            return BadRequest("Подразделение не найдено или ликвидировано");

        var emp = new Employee
        {
            TabNumber = dto.TabNumber,
            FullName = dto.FullName,
            Gender = dto.Gender,
            BirthDate = DateTime.SpecifyKind(dto.BirthDate, DateTimeKind.Utc),
            HireDate = DateTime.SpecifyKind(dto.HireDate, DateTimeKind.Utc),
            Position = dto.Position,
            Phone = dto.Phone,
            Email = dto.Email,
            PhotoUrl = dto.PhotoUrl,
            DepartmentId = dto.DepartmentId,
            IsActive = true,
        };

        _db.Employees.Add(emp);
        await _db.SaveChangesAsync();

        _db.EmployeeMovements.Add(
            new EmployeeMovement
            {
                EmployeeId = emp.Id,
                Type = MovementType.Hire,
                EventDate = emp.HireDate,
                DepartmentId = dept.Id,
                DepartmentName = dept.FullName,
                Position = emp.Position,
            }
        );

        await _db.SaveChangesAsync();
        return Ok(emp.Id);
    }

    [HttpPost("movement")]
    public async Task<IActionResult> Movement([FromBody] MovementDto dto)
    {
        var emp = await _db
            .Employees.Include(e => e.Department)
            .FirstOrDefaultAsync(e => e.Id == dto.EmployeeId);

        if (emp is null)
            return NotFound("Сотрудник не найден");
        if (!emp.IsActive)
            return BadRequest("Сотрудник уже уволен");

        string deptName = emp.Department.FullName;
        int? targetDeptId = emp.DepartmentId;
        string? position = emp.Position;

        if (dto.Type == MovementType.Transfer)
        {
            if (!dto.DepartmentId.HasValue)
                return BadRequest("Укажите подразделение для перевода");

            var dept = await _db.Departments.FindAsync(dto.DepartmentId.Value);
            if (dept is null || dept.LiquidatedDate.HasValue)
                return BadRequest("Подразделение не найдено или ликвидировано");

            emp.DepartmentId = dept.Id;
            deptName = dept.FullName;
            targetDeptId = dept.Id;

            if (!string.IsNullOrWhiteSpace(dto.Position))
                emp.Position = dto.Position;

            position = emp.Position;
        }
        else if (dto.Type == MovementType.Fire)
        {
            emp.IsActive = false;
            emp.DismissalDate = dto.EventDate.Date;
        }
        else
        {
            return BadRequest("Для приема используйте /api/employees/hire");
        }

        _db.EmployeeMovements.Add(
            new EmployeeMovement
            {
                EmployeeId = emp.Id,
                Type = dto.Type,
                EventDate = DateTime.SpecifyKind(dto.EventDate, DateTimeKind.Utc),
                DepartmentId = targetDeptId,
                DepartmentName = deptName,
                Position = position,
            }
        );

        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("report")]
    public async Task<IActionResult> GetReport(
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate,
        [FromQuery] MovementType? type = null
    )
    {
        if (endDate < startDate)
            return BadRequest("Некорректный период");

        var until = endDate.Date.AddDays(1);

        var movements = await _db
            .EmployeeMovements.Where(m => m.EventDate >= startDate.Date && m.EventDate < until)
            .Where(m => type == null || m.Type == type)
            .OrderBy(m => m.EventDate)
            .ToListAsync();

        var report = movements
            .GroupBy(m => m.Type)
            .Select(g => new ReportDto(
                g.Key,
                g.Select(m => new ReportItemDto(
                        m.EmployeeId,
                        _db.Employees.Where(e => e.Id == m.EmployeeId)
                            .Select(e => e.TabNumber)
                            .FirstOrDefault()
                            ?? "",
                        _db.Employees.Where(e => e.Id == m.EmployeeId)
                            .Select(e => e.FullName)
                            .FirstOrDefault()
                            ?? "",
                        m.DepartmentName,
                        m.Position,
                        m.EventDate
                    ))
                    .ToList()
            ))
            .ToList();

        return Ok(report);
    }
}
