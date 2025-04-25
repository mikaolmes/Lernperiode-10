namespace MotoLogPrototyp.Models
{
    public class ServiceEntry
    {
        public int Id { get; set; }
        public DateTime Last_Service { get; set; }
        public string Description { get; set; }

        public int MotorcycleId { get; set; }
        public Motorcycle Motorcycle { get; set; }
    }
}
