using System.ComponentModel.DataAnnotations;

namespace Airplanes.Dtos
{
    public class AirplaneOfAirport
    {
        [Required]
        public Guid Aid { get; set; }
        [Required]
        public string Aname { get; set; }
        public List<String> Airplanes { get; set; } = new List<String>();
    }
}
