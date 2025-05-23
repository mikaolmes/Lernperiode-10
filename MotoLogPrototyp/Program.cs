using Microsoft.EntityFrameworkCore;
using MotoLogPrototyp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<MotoLogDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS hinzufügen
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// CORS verwenden
app.UseCors("AllowAll");

app.UseRouting();
app.UseStaticFiles(); // Wichtig für deine HTML/CSS/JS Dateien

// Standardseite auf motorcycles.html setzen
app.MapFallback(async context =>
{
    context.Response.Redirect("/motorcycles.html");
});

app.MapControllers();

app.Run();