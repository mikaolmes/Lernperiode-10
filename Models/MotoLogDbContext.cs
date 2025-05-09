using Microsoft.EntityFrameworkCore;

namespace MotoLogPrototyp.Models
{
    public class MotoLogDbContext : DbContext
    {
        public DbSet<Motorcycles> Motorcycles { get; set; }
        public DbSet<ServiceEntry> ServiceEntries { get; set; }

        public MotoLogDbContext(DbContextOptions<MotoLogDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Motorcycles>()
                .HasMany(m => m.ServiceEntries)
                .WithOne(s => s.Motorcycle)
                .HasForeignKey(s => s.MotorcycleId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Seed();
        }
    }
}