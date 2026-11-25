using CompanyX.Core.Abstractions;
using CompanyX.Core.Models;

namespace CompanyX.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _empRepo;
        private readonly IDepartmentRepository _deptRepo;
        private readonly IEmployeeMovementRepository _movRepo;

        public EmployeeService(IEmployeeRepository empRepo, IDepartmentRepository deptRepo, IEmployeeMovementRepository movRepo)
        {
            _empRepo = empRepo;
            _deptRepo = deptRepo;
            _movRepo = movRepo;
        }

        public async Task<List<Employee>> GetAll(bool includeDismissed) => await _empRepo.Get(includeDismissed);

        public async Task<(Employee? Employee, string Error)> GetById(int id)
        {
            var e = await _empRepo.GetById(id);
            return e is null ? (null, "Не найдено") : (e, "");
        }

        public async Task<string> Update(int id, string fullName, Gender gender, DateTime birthDate, string phone, string email, string? photoUrl)
        {
            var e = await _empRepo.GetById(id);
            if (e is null) return "Не найдено";
            e.UpdateProfile(fullName, gender, birthDate, phone, email, photoUrl);
            await _empRepo.Update(e);
            return "";
        }

        public async Task<(int Id, string Error)> Hire(string tabNumber, string fullName, Gender gender,
            DateTime birthDate, DateTime hireDate, string position, string phone, string email, string? photoUrl, int departmentId)
        {
            if (await _empRepo.TabNumberExists(tabNumber)) return (0, "Табельный номер уже занят");

            var dept = await _deptRepo.GetById(departmentId);
            if (dept is null || dept.IsLiquidated) return (0, "Подразделение не найдено или ликвидировано");

            var (emp, error) = Employee.Create(0, tabNumber, fullName, gender,
                DateTime.SpecifyKind(birthDate, DateTimeKind.Utc),
                DateTime.SpecifyKind(hireDate, DateTimeKind.Utc),
                position, phone, email, photoUrl, departmentId, dept.FullName);
            if (!string.IsNullOrEmpty(error)) return (0, error);

            var id = await _empRepo.Create(emp);

            await _movRepo.Add(EmployeeMovement.Create(id, tabNumber, fullName, MovementType.Hire,
                emp.HireDate, dept.Id, dept.FullName, position));

            return (id, "");
        }

        public async Task<string> Movement(int employeeId, MovementType type, DateTime eventDate, int? departmentId, string? position)
        {
            var emp = await _empRepo.GetForMovement(employeeId);
            if (emp is null) return "Сотрудник не найден";
            if (!emp.IsActive) return "Сотрудник уже уволен";

            if (type == MovementType.Hire)
                return "Для приема используйте /api/employees/hire";

            string deptName = emp.DepartmentName;
            int? targetDeptId = emp.DepartmentId;
            string? newPos = emp.Position;

            if (type == MovementType.Transfer)
            {
                if (!departmentId.HasValue) return "Укажите подразделение для перевода";
                var dept = await _deptRepo.GetById(departmentId.Value);
                if (dept is null || dept.IsLiquidated) return "Подразделение не найдено или ликвидировано";
                emp.Transfer(dept.Id, dept.FullName, position);
                deptName = dept.FullName;
                targetDeptId = dept.Id;
                newPos = emp.Position;
            }
            else if (type == MovementType.Fire)
            {
                emp.Fire(eventDate);
            }

            await _empRepo.Update(emp);

            await _movRepo.Add(EmployeeMovement.Create(emp.Id, emp.TabNumber, emp.FullName, type,
                DateTime.SpecifyKind(eventDate, DateTimeKind.Utc), targetDeptId, deptName, newPos));

            return "";
        }

        public Task<List<EmployeeMovement>> GetReport(DateTime startDate, DateTime endDate, MovementType? type)
            => _movRepo.GetByPeriod(startDate, endDate, type);
    }
}
