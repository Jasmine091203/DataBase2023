using System.ComponentModel.DataAnnotations;

namespace Airplanes.Dtos
{
    public class AirportOfAirplane
    {
        [Required]
        public Guid Pid { get; set; }
        [Required]
        public string Pname { get; set; }
        public List<String> Airports { get; set; } = new List<String>();
    }
}