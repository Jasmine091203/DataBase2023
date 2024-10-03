using Airplanes.Contracts;
using Airplanes.Dtos;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Airplanes.Controllers
{






    [Route("api/[controller]")]
    [EnableCors("AllowAny")]
    [ApiController]
    public class AirplaneController : ControllerBase
    {
        private readonly ILogger<AirplaneController> _logger;
        private readonly IAirplane _airplane;
        public AirplaneController(ILogger<AirplaneController> logger, IAirplane airplane)
        {
            _logger = logger;
            _airplane = airplane;
        }
        [EnableCors("AllowAny")]
        [HttpGet]
        public async Task<IActionResult> GetAllAirplanes()
        {
            try
            {
                var airplanes = await _airplane.GetAllAirplanes();
                return Ok(new
                {
                    Success = true,
                    Message = "All airplanes Returned.",
                    airplanes
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [EnableCors("AllowAny")]
        [HttpGet]
        [Route("{pid}")]
        public async Task<IActionResult> GetCounterById(Guid pid)
        {
            try
            {
                var airplanes = await _airplane.GetAirplaneById(pid);
                return Ok(new
                {
                    Success = true,
                    Message = "Airplanes Returned.",
                    airplanes
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateAirplane(AirplaneForCreationDto airplane)
        {
            try
            {
                var newAirplane = await _airplane.CreateAirplane(airplane);
                return Ok(new
                {
                    Success = true,
                    Message = "Airplane Created.",
                    newAirplane
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut]
        [Route("{pid}")]
        public async Task<IActionResult> UpdateAirplane(Guid pid, AirplaneForUpDateDto airplane)
        {
            try
            {
                await _airplane.UpdateAirplane(pid, airplane);
                return Ok(new
                {
                    Success = true,
                    Message = "Airplane Updated."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete]
        [Route("{pid}")]
        public async Task<IActionResult> DeleteAirplane(Guid pid)
        {
            try
            {
                await _airplane.DeleteAirplane(pid);
                return Ok(new
                {
                    Success = true,
                    Message = "Airplane Deleted."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



    }
}