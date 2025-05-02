using Microsoft.EntityFrameworkCore;
using MotoLogPrototyp.Models;

namespace MotoLogPrototyp
{
    public static class ModelBuilderExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Motorcycles>().HasData(
                new Motorcycles
                {
                    Id = 1,
                    Name = "Ducati Panigale V4",
                    Brand = "Ducati",
                    Model = "Panigale V4",
                    Year = 2020,
                    cc = 1103,
                    Price = 25000
                },
                new Motorcycles
                {
                    Id = 2,
                    Name = "Kawasaki Ninja H2",
                    Brand = "Kawasaki",
                    Model = "Ninja H2",
                    Year = 2021,
                    cc = 998,
                    Price = 30000
                },
                new Motorcycles
                {
                    Id = 3,
                    Name = "BMW S1000RR",
                    Brand = "BMW",
                    Model = "S1000RR",
                    Year = 2019,
                    cc = 999,
                    Price = 20000
                },
                new Motorcycles
                {
                    Id = 4,
                    Name = "Yamaha YZF-R1",
                    Brand = "Yamaha",
                    Model = "YZF-R1",
                    Year = 2020,
                    cc = 998,
                    Price = 22000
                }
            );

            modelBuilder.Entity<ServiceEntry>().HasData(
                new ServiceEntry
                {
                    Id = 1,
                    Last_Service = new DateTime(2023, 1, 15),
                    Description = "Oil change and tire rotation",
                    MotorcycleId = 1
                },
                new ServiceEntry
                {
                    Id = 2,
                    Last_Service = new DateTime(2023, 3, 10),
                    Description = "Brake pad replacement",
                    MotorcycleId = 2
                });
        }
    }
}
