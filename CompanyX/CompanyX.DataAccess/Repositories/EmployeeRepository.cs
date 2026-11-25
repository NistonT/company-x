using CompanyX.Core.Abstractions;
using CompanyX.Core.Models;
using CompanyX.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;

namespace CompanyX.DataAccess.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly CompanyXDbContext _context;
        public EmployeeRepository(CompanyXDbContext context) => _context = context;

        public async Task<List<Employee>> Get(bool includeDismissed)
        {
            var query = _context.Employees.Include(e => e.Department).AsNoTracking().AsQueryable();
            if (!includeDismissed) query = query.Where(e => e.DismissalDate == null);
            var entities = await query.ToListAsync();
            return entities.Select(ToDomain).ToList();
        }

        public async Task<Employee?> GetById(int id)
        {
            var entity = await _context.Employees.Include(e => e.Department).AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
            return entity is null ? null : ToDomain(entity);
        }

        public async Task<Employee?> GetForMovement(int id)
        {
            var entity = await _context.Employees.Include(e => e.Department).FirstOrDefaultAsync(e => e.Id == id);
            return entity is null ? null : ToDomain(entity);
        }

        public Task<bool> TabNumberExists(string tabNumber) =>
            _context.Employees.AnyAsync(e => e.TabNumber == tabNumber);

        public async Task<int> Create(Employee employee)
        {
            var entity = new EmployeeEntity
            {
                TabNumber = employee.TabNumber,
                FullName = employee.FullName,
                Gender = employee.Gender,
                BirthDate = employee.BirthDate,
                HireDate = employee.HireDate,
                Position = employee.Position,
                Phone = employee.Phone,
                Email = employee.Email,
                PhotoUrl = employee.PhotoUrl,
                DepartmentId = employee.DepartmentId,
            };
            _context.Employees.Add(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task Update(Employee employee)
        {
            await _context.Employees
                .Where(e => e.Id == employee.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(e => e.FullName, employee.FullName)
                    .SetProperty(e => e.Gender, employee.Gender)
                    .SetProperty(e => e.BirthDate, employee.BirthDate)
                    .SetProperty(e => e.Phone, employee.Phone)
                    .SetProperty(e => e.Email, employee.Email)
                    .SetProperty(e => e.PhotoUrl, employee.PhotoUrl)
                    .SetProperty(e => e.Position, employee.Position)
                    .SetProperty(e => e.DepartmentId, employee.DepartmentId)
                    .SetProperty(e => e.DismissalDate, employee.DismissalDate));
        }

        private static Employee ToDomain(EmployeeEntity e) =>
            Employee.Create(e.Id, e.TabNumber, e.FullName, e.Gender, e.BirthDate, e.HireDate,
                e.Position, e.Phone, e.Email, e.PhotoUrl, e.DepartmentId, e.Department?.FullName ?? "", e.DismissalDate).Employee;
    }
}
