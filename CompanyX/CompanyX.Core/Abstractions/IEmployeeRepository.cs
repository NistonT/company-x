using CompanyX.Core.Models;

namespace CompanyX.Core.Abstractions
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> Get(bool includeDismissed);
        Task<Employee?> GetById(int id);
        Task<bool> TabNumberExists(string tabNumber);
        Task<int> Create(Employee employee);
        Task Update(Employee employee);
        Task<Employee?> GetForMovement(int id);
    }
}