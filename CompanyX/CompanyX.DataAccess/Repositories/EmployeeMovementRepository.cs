using CompanyX.Core.Abstractions;
using CompanyX.Core.Models;
using CompanyX.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;

namespace CompanyX.DataAccess.Repositories
{
    public class EmployeeMovementRepository : IEmployeeMovementRepository
    {
        private readonly CompanyXDbContext _context;
        public EmployeeMovementRepository(CompanyXDbContext context) => _context = context;

        public async Task Add(EmployeeMovement movement)
        {
            _context.EmployeeMovements.Add(new EmployeeMovementEntity
            {
                EmployeeId = movement.EmployeeId,
                Type = movement.Type,
                EventDate = movement.EventDate,
                DepartmentId = movement.DepartmentId,
                DepartmentName = movement.DepartmentName,
                Position = movement.Position,
            });
            await _context.SaveChangesAsync();
        }

        public async Task<List<EmployeeMovement>> GetByPeriod(DateTime startDate, DateTime endDate, MovementType? type)
        {
            var until = endDate.Date.AddDays(1);
            var entities = await _context.EmployeeMovements
                .Include(m => m.Employee)
                .AsNoTracking()
                .Where(m => m.EventDate >= startDate.Date && m.EventDate < until)
                .Where(m => type == null || m.Type == type)
                .OrderBy(m => m.EventDate)
                .ToListAsync();

            return entities.Select(m => EmployeeMovement.Create(
                m.EmployeeId, m.Employee.TabNumber, m.Employee.FullName, m.Type,
                m.EventDate, m.DepartmentId, m.DepartmentName, m.Position)).ToList();
        }
    }
}
