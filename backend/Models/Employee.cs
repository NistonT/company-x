namespace CompanyX;

public class Employee
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
    public Department Department { get; set; } = null!;

    public bool IsActive { get; set; } = true;
    public List<EmployeeMovement> Movements { get; set; } = new();
}
