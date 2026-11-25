using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CompanyX.DataAccess.Migrations;

/// <inheritdoc />
public partial class _20261125174035_init : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Departments",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Code = table.Column<string>(type: "character varying(4)", maxLength: 4, nullable: false),
                FullName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                Abbreviation = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                LiquidatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                ParentDepartmentId = table.Column<int>(type: "integer", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Departments", x => x.Id);
                table.ForeignKey(
                    name: "FK_Departments_Departments_ParentDepartmentId",
                    column: x => x.ParentDepartmentId,
                    principalTable: "Departments",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Restrict);
            });

        migrationBuilder.CreateTable(
            name: "Employees",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                TabNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                FullName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                Gender = table.Column<int>(type: "integer", nullable: false),
                BirthDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                HireDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                DismissalDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                Position = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                PhotoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                DepartmentId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Employees", x => x.Id);
                table.ForeignKey(
                    name: "FK_Employees_Departments_DepartmentId",
                    column: x => x.DepartmentId,
                    principalTable: "Departments",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Restrict);
            });

        migrationBuilder.CreateTable(
            name: "EmployeeMovements",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                EmployeeId = table.Column<int>(type: "integer", nullable: false),
                Type = table.Column<int>(type: "integer", nullable: false),
                EventDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                DepartmentId = table.Column<int>(type: "integer", nullable: true),
                DepartmentName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                Position = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_EmployeeMovements", x => x.Id);
                table.ForeignKey(
                    name: "FK_EmployeeMovements_Employees_EmployeeId",
                    column: x => x.EmployeeId,
                    principalTable: "Employees",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Departments_Code",
            table: "Departments",
            column: "Code",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_Departments_ParentDepartmentId",
            table: "Departments",
            column: "ParentDepartmentId");

        migrationBuilder.CreateIndex(
            name: "IX_EmployeeMovements_EmployeeId",
            table: "EmployeeMovements",
            column: "EmployeeId");

        migrationBuilder.CreateIndex(
            name: "IX_Employees_DepartmentId",
            table: "Employees",
            column: "DepartmentId");

        migrationBuilder.CreateIndex(
            name: "IX_Employees_TabNumber",
            table: "Employees",
            column: "TabNumber",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "EmployeeMovements");

        migrationBuilder.DropTable(
            name: "Employees");

        migrationBuilder.DropTable(
            name: "Departments");
    }
}
