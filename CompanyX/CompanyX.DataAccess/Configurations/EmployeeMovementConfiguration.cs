using CompanyX.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CompanyX.DataAccess.Configurations
{
    public class EmployeeMovementConfiguration : IEntityTypeConfiguration<EmployeeMovementEntity>
    {
        public void Configure(EntityTypeBuilder<EmployeeMovementEntity> builder)
        {
            builder.HasKey(m => m.Id);
            builder.Property(m => m.DepartmentName).HasMaxLength(200);
            builder.Property(m => m.Position).HasMaxLength(100);

            builder.HasOne(m => m.Employee)
                   .WithMany(e => e.Movements)
                   .HasForeignKey(m => m.EmployeeId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
