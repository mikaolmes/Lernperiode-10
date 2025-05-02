using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MotoLogPrototyp.Models
{

    public class ServiceEntry
    {

        public int Id { get; set; }

        public DateTime Last_Service { get; set; }


        public string Description { get; set; }

        public int MotorcycleId { get; set; }

        [JsonIgnore]
        [ForeignKey("MotorcycleId")]
        public Motorcycles? Motorcycle { get; set; }
    }
}