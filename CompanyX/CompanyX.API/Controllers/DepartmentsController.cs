using CompanyX.API.Contracts;
using CompanyX.Core.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace CompanyX.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _service;
        public DepartmentsController(IDepartmentService service) => _service = service;

        private static DepartmentDto ToDto(Core.Models.Department d) =>
            new(d.Id, d.Code, d.FullName, d.Abbreviation, d.CreatedDate, d.LiquidatedDate, d.ParentDepartmentId);

        [HttpGet]
        public async Task<ActionResult<List<DepartmentDto>>> GetAll()
            => Ok((await _service.GetAll()).Select(ToDto).ToList());

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var (dept, error) = await _service.GetById(id);
            return dept is null ? NotFound(error) : Ok(ToDto(dept));
        }

        [HttpGet("tree")]
        public async Task<ActionResult<List<DepartmentTreeDto>>> GetTree()
        {
            var all = await _service.GetTree();
            List<DepartmentTreeDto> Build(int? parentId) =>
                all.Where(d => d.ParentDepartmentId == parentId)
                   .Select(d => new DepartmentTreeDto(d.Id, d.Code, d.FullName, d.Abbreviation,
                       d.CreatedDate, d.LiquidatedDate, Build(d.Id)))
                   .ToList();
            return Ok(Build(null));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDepartmentDto dto)
        {
            var (id, error) = await _service.Create(dto.Code, dto.FullName, dto.Abbreviation, dto.ParentId);
            if (!string.IsNullOrEmpty(error)) return BadRequest(error);
            var (dept, _) = await _service.GetById(id);
            return Ok(ToDto(dept!));
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateDepartmentDto dto)
        {
            var error = await _service.Update(id, dto.Code, dto.FullName, dto.Abbreviation, dto.ParentId);
            return string.IsNullOrEmpty(error) ? NoContent() : BadRequest(error);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Liquidate(int id)
        {
            var error = await _service.Liquidate(id);
            return string.IsNullOrEmpty(error) ? NoContent() : BadRequest(error);
        }
    }
}