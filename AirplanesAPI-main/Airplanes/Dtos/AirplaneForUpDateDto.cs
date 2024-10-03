using System.ComponentModel.DataAnnotations;
namespace Airplanes.Dtos
{
    public class AirplaneForUpDateDto
    {
        [Required][StringLength(20, ErrorMessage = "Maximum 20 characters")] public string Pname { get; set; }
        [Required] public int Pseats { get; set; }
        public int Pmaxspeed { get; set; }
        public double Pheavyload { get; set; }
    }
}
