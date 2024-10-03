using System.ComponentModel.DataAnnotations;
namespace Airplanes.Dtos
{
    public class AirportForUpdateDto
    {
        [Required][StringLength(20, ErrorMessage = "Maximum 20 characters")] public string Aname { get; set; }
        [Required] public int Aterminal { get; set; }
        public float? Aapron { get; set; }
        public float? Aarea { get; set; }

    }
}
