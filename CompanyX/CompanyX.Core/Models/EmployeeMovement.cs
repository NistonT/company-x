namespace CompanyX.Core.Models
{
    public class EmployeeMovement
    {
        private EmployeeMovement() { }

        public int Id { get; private set; }
        public int EmployeeId { get; private set; }
        public string TabNumber { get; private set; } = "";
        public string EmployeeFullName { get; private set; } = "";
        public MovementType Type { get; private set; }
        public DateTime EventDate { get; private set; }
        public int? DepartmentId { get; private set; }
        public string DepartmentName { get; private set; } = "";
        public string? Position { get; private set; }

        public static EmployeeMovement Create(
            int employeeId, string tabNumber, string employeeFullName, MovementType type,
            DateTime eventDate, int? departmentId, string departmentName, string? position)
            => new()
            {
                EmployeeId = employeeId,
                TabNumber = tabNumber,
                EmployeeFullName = employeeFullName,
                Type = type,
                EventDate = eventDate,
                DepartmentId = departmentId,
                DepartmentName = departmentName,
                Position = position,
            };
    }
}