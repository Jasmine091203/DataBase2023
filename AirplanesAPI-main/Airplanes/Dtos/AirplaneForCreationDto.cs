using System.ComponentModel.DataAnnotations;
namespace Airplanes.Dtos
{
    public class AirplaneForCreationDto
    {
        [Required]
        [StringLength(20, ErrorMessage = "Maximum 20 characters")]
        public string Pname { get; set; }
        [Required] public int Pseats { get; set; }
        [Required] public int Pmaxspeed { get; set; }
        [Required] public int Pheavyload { get; set; }
    }
}
