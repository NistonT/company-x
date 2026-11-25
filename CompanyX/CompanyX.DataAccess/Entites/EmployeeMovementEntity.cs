using CompanyX.Core.Models;

namespace CompanyX.DataAccess.Entites
{
    public class EmployeeMovementEntity
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public EmployeeEntity Employee { get; set; } = null!;
        public MovementType Type { get; set; }
        public DateTime EventDate { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; } = "";
        public string? Position { get; set; }
    }
}
