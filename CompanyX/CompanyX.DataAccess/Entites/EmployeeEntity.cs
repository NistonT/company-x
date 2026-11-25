using CompanyX.Core.Models;

namespace CompanyX.DataAccess.Entites
{
    public class EmployeeEntity
    {
        public int Id { get; set; }
        public string TabNumber { get; set; } = "";
        public string FullName { get; set; } = "";
        public Gender Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime? DismissalDate { get; set; }
        public string Position { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; } = "";
        public string? PhotoUrl { get; set; }
        public int DepartmentId { get; set; }
        public DepartmentEntity Department { get; set; } = null!;
        public List<EmployeeMovementEntity> Movements { get; set; } = new();
    }
}
