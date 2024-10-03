using System.ComponentModel.DataAnnotations;
namespace Airplanes.Dtos
{
    public class AirportForCreationDto
    {
        [Required]
        [StringLength(20, ErrorMessage = "Maximum 20 characters")] 
        public string Aname { get; set; }
        [Required] public int Aterminal { get; set; }
        [Required] public int Aapron { get; set; }
        [Required] public int Aarea { get; set; }

    }
}
