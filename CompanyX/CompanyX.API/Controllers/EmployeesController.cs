using CompanyX.API.Contracts;
using CompanyX.Core.Abstractions;
using CompanyX.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace CompanyX.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;
        public EmployeesController(IEmployeeService service) => _service = service;

        private static EmployeeDto ToDto(Employee e) => new(
            e.Id, e.TabNumber, e.FullName, e.Gender.ToString(), e.BirthDate.Date,
            e.Age, e.TenureYears, e.HireDate, e.DismissalDate, e.Position, e.Phone,
            e.Email, e.PhotoUrl, e.DepartmentId, e.DepartmentName, e.IsActive);

        [HttpGet]
        public async Task<ActionResult<List<EmployeeDto>>> GetAll([FromQuery] bool includeDismissed = false)
            => Ok((await _service.GetAll(includeDismissed)).Select(ToDto).ToList());

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var (emp, error) = await _service.GetById(id);
            return emp is null ? NotFound(error) : Ok(ToDto(emp));
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto dto)
        {
            var error = await _service.Update(id, dto.FullName, dto.Gender, dto.BirthDate, dto.Phone, dto.Email, dto.PhotoUrl);
            return string.IsNullOrEmpty(error) ? NoContent() : BadRequest(error);
        }

        [HttpPost("hire")]
        public async Task<IActionResult> Hire([FromBody] CreateEmployeeDto dto)
        {
            var (id, error) = await _service.Hire(dto.TabNumber, dto.FullName, dto.Gender, dto.BirthDate,
                dto.HireDate, dto.Position, dto.Phone, dto.Email, dto.PhotoUrl, dto.DepartmentId);
            return string.IsNullOrEmpty(error) ? Ok(id) : BadRequest(error);
        }

        [HttpPost("movement")]
        public async Task<IActionResult> Movement([FromBody] MovementDto dto)
        {
            var error = await _service.Movement(dto.EmployeeId, dto.Type, dto.EventDate, dto.DepartmentId, dto.Position);
            return string.IsNullOrEmpty(error) ? Ok() : BadRequest(error);
        }

        [HttpGet("report")]
        public async Task<IActionResult> GetReport([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, [FromQuery] MovementType? type = null)
        {
            if (endDate < startDate) return BadRequest("Некорректный период");

            var movements = await _service.GetReport(startDate, endDate, type);
            var report = movements
                .GroupBy(m => m.Type)
                .Select(g => new ReportDto(g.Key, g.Select(m => new ReportItemDto(
                    m.EmployeeId, m.TabNumber, m.EmployeeFullName, m.DepartmentName, m.Position, m.EventDate)).ToList()))
                .ToList();

            return Ok(report);
        }
    }
}