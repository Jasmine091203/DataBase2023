using Airplanes.Models;
using System.ComponentModel.DataAnnotations;

namespace Airplanes.Dtos
{
    public class AirportDetailsOfAirplane
    {
        [Required]
        public Guid Pid { get; set; }
        [Required]
        public string Pname { get; set; }

        public List<Airport> Airports { get; set; } = new List<Airport>();
    }
}