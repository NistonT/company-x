using CompanyX.Core.Models;

namespace CompanyX.Core.Abstractions
{
    public interface IEmployeeMovementRepository
    {
        Task Add(EmployeeMovement movement);
        Task<List<EmployeeMovement>> GetByPeriod(DateTime startDate, DateTime endDate, MovementType? type);
    }
}