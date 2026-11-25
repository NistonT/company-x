using CompanyX.Core.Models;

namespace CompanyX.Core.Abstractions
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAll(bool includeDismissed);
        Task<(Employee? Employee, string Error)> GetById(int id);
        Task<string> Update(int id, string fullName, Gender gender, DateTime birthDate, string phone, string email, string? photoUrl);
        Task<(int Id, string Error)> Hire(string tabNumber, string fullName, Gender gender, DateTime birthDate, DateTime hireDate, string position, string phone, string email, string? photoUrl, int departmentId);
        Task<string> Movement(int employeeId, MovementType type, DateTime eventDate, int? departmentId, string? position);
        Task<List<EmployeeMovement>> GetReport(DateTime startDate, DateTime endDate, MovementType? type);
    }
}