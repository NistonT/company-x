using CompanyX.Core.Models;
using CompanyX.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CompanyX.DataAccess.Configurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<DepartmentEntity>
    {
        public void Configure(EntityTypeBuilder<DepartmentEntity> builder)
        {
            builder.HasKey(d => d.Id);
            builder.HasIndex(d => d.Code).IsUnique();
            builder.Property(d => d.Code).HasMaxLength(Department.CODE_LENGTH).IsRequired();
            builder.Property(d => d.FullName).HasMaxLength(200).IsRequired();
            builder.Property(d => d.Abbreviation).HasMaxLength(50);

            builder.HasOne(d => d.Parent)
                   .WithMany(d => d.Children)
                   .HasForeignKey(d => d.ParentDepartmentId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
