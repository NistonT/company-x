namespace CompanyX;

public class Department
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string FullName { get; set; } = "";
    public string Abbreviation { get; set; } = "";
    public DateTime CreatedDate { get; set; }
    public DateTime? LiquidatedDate { get; set; }

    public int? ParentDepartmentId { get; set; }
    public Department? Parent { get; set; }
    public List<Department> Children { get; set; } = new();
}
