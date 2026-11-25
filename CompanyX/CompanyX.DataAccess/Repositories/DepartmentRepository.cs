using CompanyX.Core.Abstractions;
using CompanyX.Core.Models;
using CompanyX.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;

namespace CompanyX.DataAccess.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly CompanyXDbContext _context;
        public DepartmentRepository(CompanyXDbContext context) => _context = context;

        public async Task<List<Department>> Get()
        {
            var entities = await _context.Departments.AsNoTracking().OrderBy(d => d.Code).ToListAsync();
            return entities.Select(ToDomain).ToList();
        }

        public async Task<Department?> GetById(int id)
        {
            var entity = await _context.Departments.AsNoTracking().FirstOrDefaultAsync(d => d.Id == id);
            return entity is null ? null : ToDomain(entity);
        }

        public Task<bool> CodeExists(string code, int? exceptId = null) =>
            _context.Departments.AnyAsync(d => d.Code == code && (exceptId == null || d.Id != exceptId));

        public Task<bool> ParentExists(int parentId) =>
            _context.Departments.AnyAsync(d => d.Id == parentId);

        public Task<bool> HasActiveEmployees(int departmentId) =>
            _context.Employees.AnyAsync(e => e.DepartmentId == departmentId && e.DismissalDate == null);

        public Task<bool> HasActiveChildren(int departmentId) =>
            _context.Departments.AnyAsync(d => d.ParentDepartmentId == departmentId && d.LiquidatedDate == null);

        public async Task<int> Create(Department department)
        {
            var entity = new DepartmentEntity
            {
                Code = department.Code,
                FullName = department.FullName,
                Abbreviation = department.Abbreviation,
                CreatedDate = department.CreatedDate,
                ParentDepartmentId = department.ParentDepartmentId,
            };
            _context.Departments.Add(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task Update(Department department)
        {
            await _context.Departments
                .Where(d => d.Id == department.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(d => d.Code, department.Code)
                    .SetProperty(d => d.FullName, department.FullName)
                    .SetProperty(d => d.Abbreviation, department.Abbreviation)
                    .SetProperty(d => d.ParentDepartmentId, department.ParentDepartmentId)
                    .SetProperty(d => d.LiquidatedDate, department.LiquidatedDate));
        }

        private static Department ToDomain(DepartmentEntity e) =>
            Department.Create(e.Id, e.Code, e.FullName, e.Abbreviation, e.CreatedDate, e.ParentDepartmentId, e.LiquidatedDate).Department;
    }
}
