namespace CompanyX;

public record EmployeeDto(
    int Id,
    string TabNumber,
    string FullName,
    string Gender,
    DateTime BirthDate,
    int Age,
    int TenureYears,
    DateTime HireDate,
    DateTime? DismissalDate,
    string Position,
    string Phone,
    string Email,
    string? PhotoUrl,
    int DepartmentId,
    string DepartmentName,
    bool IsActive
);

public record CreateEmployeeDto(
    string TabNumber,
    string FullName,
    Gender Gender,
    DateTime BirthDate,
    DateTime HireDate,
    string Position,
    string Phone,
    string Email,
    string? PhotoUrl,
    int DepartmentId
);

public record UpdateEmployeeDto(
    string FullName,
    Gender Gender,
    DateTime BirthDate,
    string Phone,
    string Email,
    string? PhotoUrl
);

public record MovementDto(
    int EmployeeId,
    MovementType Type,
    DateTime EventDate,
    int? DepartmentId,
    string? Position
);

public record ReportItemDto(
    int EmployeeId,
    string TabNumber,
    string FullName,
    string DepartmentName,
    string? Position,
    DateTime EventDate
);

public record ReportDto(MovementType Type, List<ReportItemDto> Items);
