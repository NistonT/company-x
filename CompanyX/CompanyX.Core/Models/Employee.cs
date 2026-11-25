namespace CompanyX.Core.Models
{
    public class Employee
    {
        private Employee() { }

        public int Id { get; private set; }
        public string TabNumber { get; private set; } = "";
        public string FullName { get; private set; } = "";
        public Gender Gender { get; private set; }
        public DateTime BirthDate { get; private set; }
        public DateTime HireDate { get; private set; }
        public DateTime? DismissalDate { get; private set; }
        public string Position { get; private set; } = "";
        public string Phone { get; private set; } = "";
        public string Email { get; private set; } = "";
        public string? PhotoUrl { get; private set; }
        public int DepartmentId { get; private set; }
        public string DepartmentName { get; private set; } = "";

        public bool IsActive => DismissalDate == null;

        public static (Employee Employee, string Error) Create(
            int id, string tabNumber, string fullName, Gender gender,
            DateTime birthDate, DateTime hireDate, string position,
            string phone, string email, string? photoUrl,
            int departmentId, string departmentName, DateTime? dismissalDate = null)
        {
            var error = string.Empty;

            if (string.IsNullOrWhiteSpace(tabNumber))
                error = "Табельный номер не может быть пустым";

            var emp = new Employee
            {
                Id = id,
                TabNumber = tabNumber,
                FullName = fullName,
                Gender = gender,
                BirthDate = birthDate,
                HireDate = hireDate,
                Position = position,
                Phone = phone,
                Email = email,
                PhotoUrl = photoUrl,
                DepartmentId = departmentId,
                DepartmentName = departmentName,
                DismissalDate = dismissalDate,
            };

            return (emp, error);
        }

        public void UpdateProfile(string fullName, Gender gender, DateTime birthDate,
            string phone, string email, string? photoUrl)
        {
            FullName = fullName;
            Gender = gender;
            BirthDate = birthDate;
            Phone = phone;
            Email = email;
            PhotoUrl = photoUrl;
        }

        public void Transfer(int newDepartmentId, string newDepartmentName, string? position)
        {
            DepartmentId = newDepartmentId;
            DepartmentName = newDepartmentName;
            if (!string.IsNullOrWhiteSpace(position)) Position = position;
        }

        public void Fire(DateTime date) => DismissalDate = date.Date;

        public int Age => FullYears(BirthDate, DateTime.Today);

        public int TenureYears
        {
            get
            {
                var end = IsActive ? DateTime.Today : (DismissalDate?.Date ?? DateTime.Today);
                return FullYears(HireDate, end);
            }
        }

        private static int FullYears(DateTime from, DateTime to)
        {
            if (to < from) return 0;
            int years = to.Year - from.Year;
            if (from.Date.AddYears(years) > to.Date) years--;
            return Math.Max(years, 0);
        }
    }
}