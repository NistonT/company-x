namespace CompanyX;

public class EmployeeMovement
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public MovementType Type { get; set; }
    public DateTime EventDate { get; set; }

    public int? DepartmentId { get; set; }
    public string DepartmentName { get; set; } = "";
    public string? Position { get; set; }
}
