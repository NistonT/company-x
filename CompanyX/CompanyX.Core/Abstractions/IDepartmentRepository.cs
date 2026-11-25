using CompanyX.Core.Models;

namespace CompanyX.Core.Abstractions
{
    public interface IDepartmentRepository
    {
        Task<List<Department>> Get();
        Task<Department?> GetById(int id);
        Task<bool> CodeExists(string code, int? exceptId = null);
        Task<bool> ParentExists(int parentId);
        Task<bool> HasActiveEmployees(int departmentId);
        Task<bool> HasActiveChildren(int departmentId);
        Task<int> Create(Department department);
        Task Update(Department department);
    }
}