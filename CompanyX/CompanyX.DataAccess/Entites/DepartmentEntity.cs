namespace CompanyX.DataAccess.Entites
{
    public class DepartmentEntity
    {
        public int Id { get; set; }
        public string Code { get; set; } = "";
        public string FullName { get; set; } = "";
        public string Abbreviation { get; set; } = "";
        public DateTime CreatedDate { get; set; }
        public DateTime? LiquidatedDate { get; set; }
        public int? ParentDepartmentId { get; set; }
        public DepartmentEntity? Parent { get; set; }
        public List<DepartmentEntity> Children { get; set; } = new();
        public List<EmployeeEntity> Employees { get; set; } = new();
    }
}
