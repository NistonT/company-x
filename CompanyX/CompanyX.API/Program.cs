using System.Text.Json.Serialization;
using CompanyX.Application.Services;
using CompanyX.Core.Abstractions;
using CompanyX.DataAccess;
using CompanyX.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CompanyXDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(CompanyXDbContext))));

builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeMovementRepository, EmployeeMovementRepository>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

builder.Services.AddCors(options => options.AddPolicy("React", policy =>
    policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4000")
          .AllowAnyHeader().AllowAnyMethod()));

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("React");
app.MapControllers();
app.Run();

//dotnet ef migrations add init -s .\BookStore.API\ -p .\BookStore.DataAccess\
//dotnet ef database update -s .\BookStore.API\ -p .\BookStore.DataAccess\