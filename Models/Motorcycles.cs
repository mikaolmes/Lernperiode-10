using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MotoLogPrototyp.Models
{

    public class Motorcycles
    {

        public int Id { get; set; }


        public string Name { get; set; }


        public string Brand { get; set; }


        public string Model { get; set; }

        public int Year { get; set; }

        public int cc { get; set; }

        public int Price { get; set; }

        [JsonIgnore]
        public List<ServiceEntry> ServiceEntries { get; set; } = new List<ServiceEntry>();
    }
}