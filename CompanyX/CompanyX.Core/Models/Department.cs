namespace CompanyX.Core.Models
{
    public class Department
    {
        public const int CODE_LENGTH = 4;

        private Department() { }

        public int Id { get; private set; }
        public string Code { get; private set; } = "";
        public string FullName { get; private set; } = "";
        public string Abbreviation { get; private set; } = "";
        public DateTime CreatedDate { get; private set; }
        public DateTime? LiquidatedDate { get; private set; }
        public int? ParentDepartmentId { get; private set; }

        public bool IsLiquidated => LiquidatedDate.HasValue;

        public static (Department Department, string Error) Create(
            int id, string code, string fullName, string abbreviation,
            DateTime createdDate, int? parentDepartmentId, DateTime? liquidatedDate = null)
        {
            var error = string.Empty;

            if (string.IsNullOrWhiteSpace(code) || code.Length != CODE_LENGTH)
                error = $"Код подразделения должен состоять из {CODE_LENGTH} символов";

            var dept = new Department
            {
                Id = id,
                Code = code,
                FullName = fullName,
                Abbreviation = abbreviation,
                CreatedDate = createdDate,
                ParentDepartmentId = parentDepartmentId,
                LiquidatedDate = liquidatedDate,
            };

            return (dept, error);
        }

        public void Liquidate(DateTime date) => LiquidatedDate = date;
    }
}