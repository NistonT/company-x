using CompanyX.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyX.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public DepartmentsController(AppDbContext db) => _db = db;

    private static DepartmentDto ToDto(Department d) =>
        new(
            d.Id,
            d.Code,
            d.FullName,
            d.Abbreviation,
            d.CreatedDate,
            d.LiquidatedDate,
            d.ParentDepartmentId
        );

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Departments.AsNoTracking().Select(d => ToDto(d)).ToListAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var d = await _db.Departments.FindAsync(id);
        return d is null ? NotFound() : Ok(ToDto(d));
    }

    [HttpGet("tree")]
    public async Task<IActionResult> GetTree()
    {
        var all = await _db.Departments.AsNoTracking().ToListAsync();

        List<DepartmentTreeDto> Build(int? parentId) =>
            all.Where(d => d.ParentDepartmentId == parentId)
                .Select(d => new DepartmentTreeDto(
                    d.Id,
                    d.Code,
                    d.FullName,
                    d.Abbreviation,
                    d.CreatedDate,
                    d.LiquidatedDate,
                    Build(d.Id)
                ))
                .ToList();

        return Ok(Build(null));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDepartmentDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Code) || dto.Code.Length != 4)
            return BadRequest("Код подразделения должен состоять из 4 символов");

        if (await _db.Departments.AnyAsync(d => d.Code == dto.Code))
            return BadRequest("Код уже используется");

        if (dto.ParentId.HasValue && !await _db.Departments.AnyAsync(d => d.Id == dto.ParentId))
            return BadRequest("Родительское подразделение не найдено");

        var dept = new Department
        {
            Code = dto.Code,
            FullName = dto.FullName,
            Abbreviation = dto.Abbreviation,
            CreatedDate = DateTime.UtcNow,
            ParentDepartmentId = dto.ParentId,
        };

        _db.Departments.Add(dept);
        await _db.SaveChangesAsync();
        return Ok(ToDto(dept));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDepartmentDto dto)
    {
        var dept = await _db.Departments.FindAsync(id);
        if (dept is null)
            return NotFound();
        if (dept.LiquidatedDate.HasValue)
            return BadRequest("Нельзя редактировать ликвидированное подразделение");

        if (dto.ParentId == id)
            return BadRequest("Подразделение не может быть своим родителем");

        if (await _db.Departments.AnyAsync(d => d.Code == dto.Code && d.Id != id))
            return BadRequest("Код уже используется");

        dept.Code = dto.Code;
        dept.FullName = dto.FullName;
        dept.Abbreviation = dto.Abbreviation;
        dept.ParentDepartmentId = dto.ParentId;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Liquidate(int id)
    {
        var dept = await _db.Departments.FindAsync(id);
        if (dept is null)
            return NotFound();
        if (dept.LiquidatedDate.HasValue)
            return BadRequest("Уже ликвидировано");

        if (await _db.Employees.AnyAsync(e => e.DepartmentId == id && e.IsActive))
            return BadRequest("В подразделении есть активные сотрудники");

        if (
            await _db.Departments.AnyAsync(d =>
                d.ParentDepartmentId == id && d.LiquidatedDate == null
            )
        )
            return BadRequest("Сначала ликвидируйте дочерние подразделения");

        dept.LiquidatedDate = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
