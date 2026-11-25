using CompanyX.DataAccess.Configurations;
using CompanyX.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;

namespace CompanyX.DataAccess
{
    public class CompanyXDbContext : DbContext
    {
        public CompanyXDbContext(DbContextOptions<CompanyXDbContext> options)
            : base(options)
        {
        }

        public DbSet<DepartmentEntity> Departments => Set<DepartmentEntity>();
        public DbSet<EmployeeEntity> Employees => Set<EmployeeEntity>();
        public DbSet<EmployeeMovementEntity> EmployeeMovements => Set<EmployeeMovementEntity>();

        protected override void OnModelCreating(ModelBuilder mb)
            => mb.ApplyConfigurationsFromAssembly(typeof(DepartmentConfiguration).Assembly);
    }
}
