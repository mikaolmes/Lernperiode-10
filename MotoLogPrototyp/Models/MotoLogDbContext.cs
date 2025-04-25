using Microsoft.EntityFrameworkCore;

namespace MotoLogPrototyp.Models
{
    public class MotoLogDbContext : DbContext
    {
        public MotoLogDbContext(DbContextOptions<MotoLogDbContext> options) : base(options) { }

        public DbSet<Motorcycle> Motorcycles { get; set; }
        public DbSet<ServiceEntry> ServiceEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Seed(); // Call the extension method to seed data
        }
    }
}