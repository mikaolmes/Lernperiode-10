using Microsoft.EntityFrameworkCore;

namespace MotoLogPrototyp.Models
{
    using Microsoft.EntityFrameworkCore;

    public class MotoLogDbContext : DbContext
    {
        public MotoLogDbContext(DbContextOptions<MotoLogDbContext> options) : base(options) { }

        public DbSet<Motorcycle> Motorcycles { get; set; }
        public DbSet<ServiceEntry> ServiceEntries { get; set; }
    }

}
