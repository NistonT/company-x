using CompanyX.Core.Models;

namespace CompanyX.Core.Abstractions
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetAll();
        Task<(Department? Department, string Error)> GetById(int id);
        Task<List<Department>> GetTree();
        Task<(int Id, string Error)> Create(string code, string fullName, string abbreviation, int? parentId);
        Task<string> Update(int id, string code, string fullName, string abbreviation, int? parentId);
        Task<string> Liquidate(int id);
    }
}