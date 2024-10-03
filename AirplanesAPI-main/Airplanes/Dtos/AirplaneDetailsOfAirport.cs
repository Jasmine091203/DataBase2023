using Airplanes.Models;
using System.ComponentModel.DataAnnotations;


namespace Airplanes.Dtos
{
    public class AirplaneDetailsOfAirport
    {
        [Required]
        public Guid Aid { get; set; }
        [Required]
        public string Aname { get; set; }
        // 此 Member 所參與的 Calendars
        public List<Airplane> Airplanes { get; set; } = new List<Airplane>();
    }
}