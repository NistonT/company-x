namespace CompanyX.Api.DTOs;

public record DepartmentDto(
    int Id,
    string Code,
    string FullName,
    string Abbreviation,
    DateTime CreatedDate,
    DateTime? LiquidatedDate,
    int? ParentId
);

public record DepartmentTreeDto(
    int Id,
    string Code,
    string FullName,
    List<DepartmentTreeDto> Children
);

public record EmployeeDto(
    int Id,
    string TabNumber,
    string FullName,
    string Gender,
    DateTime BirthDate,
    int Age,
    int TenureYears,
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
    string Position,
    string Phone,
    string Email,
    string? PhotoUrl,
    int DepartmentId
);

public record UpdateEmployeeDto(
    string FullName,
    string Position,
    string Phone,
    string Email,
    string? PhotoUrl,
    int DepartmentId
);

public record MovementDto(
    int EmployeeId,
    MovementType Type,
    DateTime EventDate,
    int? DepartmentId,
    string? Position
);

public record ReportDto(MovementType Type, List<ReportItemDto> Employees);

public record ReportItemDto(
    string TabNumber,
    string FullName,
    string DepartmentName,
    DateTime EventDate
);
