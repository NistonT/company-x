using Microsoft.EntityFrameworkCore;

namespace CompanyX.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<EmployeeMovement> EmployeeMovements => Set<EmployeeMovement>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<Department>()
            .HasOne(d => d.Parent)
            .WithMany(d => d.Children)
            .HasForeignKey(d => d.ParentDepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        mb.Entity<Department>().HasIndex(d => d.Code).IsUnique();
        mb.Entity<Employee>().HasIndex(e => e.TabNumber).IsUnique();

        mb.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany()
            .HasForeignKey(e => e.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
