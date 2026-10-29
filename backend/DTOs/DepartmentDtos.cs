namespace CompanyX;

public record DepartmentDto(
    int Id,
    string Code,
    string FullName,
    string Abbreviation,
    DateTime CreatedDate,
    DateTime? LiquidatedDate,
    int? ParentDepartmentId
);

public record CreateDepartmentDto(string Code, string FullName, string Abbreviation, int? ParentId);

public record UpdateDepartmentDto(string Code, string FullName, string Abbreviation, int? ParentId);

public record DepartmentTreeDto(
    int Id,
    string Code,
    string FullName,
    string Abbreviation,
    DateTime CreatedDate,
    DateTime? LiquidatedDate,
    List<DepartmentTreeDto> Children
);
