using System.Runtime;

namespace MotoLogPrototyp.Models
{
    public class Motorcycle
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int cc { get; set; }
        public int Price { get; set; }

        public List<ServiceEntry> ServiceEntries { get; set; }
    }
}
