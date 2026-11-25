using CompanyX.Core.Abstractions;
using CompanyX.Core.Models;

namespace CompanyX.Application.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _repo;
        public DepartmentService(IDepartmentRepository repo) => _repo = repo;

        public async Task<List<Department>> GetAll() => await _repo.Get();

        public async Task<(Department? Department, string Error)> GetById(int id)
        {
            var d = await _repo.GetById(id);
            return d is null ? (null, "Не найдено") : (d, "");
        }

        public async Task<List<Department>> GetTree()
        {
            var all = await _repo.Get();
            List<Department> Build(int? parentId) =>
                all.Where(d => d.ParentDepartmentId == parentId).ToList();
            return Build(null);
        }

        public async Task<(int Id, string Error)> Create(string code, string fullName, string abbreviation, int? parentId)
        {
            var (dept, error) = Department.Create(0, code, fullName, abbreviation, DateTime.UtcNow, parentId);
            if (!string.IsNullOrEmpty(error)) return (0, error);

            if (await _repo.CodeExists(code)) return (0, "Код уже используется");
            if (parentId.HasValue && !await _repo.ParentExists(parentId.Value))
                return (0, "Родительское подразделение не найдено");

            var id = await _repo.Create(dept);
            return (id, "");
        }

        public async Task<string> Update(int id, string code, string fullName, string abbreviation, int? parentId)
        {
            var dept = await _repo.GetById(id);
            if (dept is null) return "Не найдено";
            if (dept.IsLiquidated) return "Нельзя редактировать ликвидированное подразделение";
            if (parentId == id) return "Подразделение не может быть своим родителем";
            if (await _repo.CodeExists(code, id)) return "Код уже используется";

            var (updated, error) = Department.Create(id, code, fullName, abbreviation, dept.CreatedDate, parentId, dept.LiquidatedDate);
            if (!string.IsNullOrEmpty(error)) return error;

            await _repo.Update(updated);
            return "";
        }

        public async Task<string> Liquidate(int id)
        {
            var dept = await _repo.GetById(id);
            if (dept is null) return "Не найдено";
            if (dept.IsLiquidated) return "Уже ликвидировано";
            if (await _repo.HasActiveEmployees(id)) return "В подразделении есть активные сотрудники";
            if (await _repo.HasActiveChildren(id)) return "Сначала ликвидируйте дочерние подразделения";

            dept.Liquidate(DateTime.UtcNow);
            await _repo.Update(dept);
            return "";
        }
    }
}
