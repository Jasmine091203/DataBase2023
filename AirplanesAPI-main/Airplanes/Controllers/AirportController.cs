using Airplanes.Contracts;
using Airplanes.Dtos;
using Airplanes.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Security.Cryptography;

namespace DepartmentStore.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAny")]
    [ApiController]
    public class AirportController : ControllerBase
    {
        private readonly ILogger<AirportController> _logger;
        private readonly IAirport _airport;
        public AirportController(ILogger<AirportController> logger, IAirport airport)
        {
            _logger = logger;
            _airport = airport;
        }
        [EnableCors("AllowAny")]
        [HttpGet]
        public async Task<IActionResult> GetAllAirports()
        {
            try
            {
                var airports = await _airport.GetAllAirports();
                return Ok(new
                {
                    Success = true,
                    Message = "All Airports Returned.",
                    airports
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [EnableCors("AllowAny")]
        [HttpGet]
        [Route("{aid}")]
        public async Task<IActionResult> GetAirportById(Guid aid)
        {
            try
            {
                var airport = await _airport.GetAirportById(aid);
                return Ok(new
                {
                    Success = true,
                    Message = "Airport Returned.",
                    airport
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateAirport(AirportForCreationDto airport)
        {
            try
            {
                var newAirport = await _airport.CreateAirport(airport);
                return Ok(new
                {
                    Success = true,
                    Message = "Airport Created.",
                    newAirport
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut]
        [Route("{aid}")]
        public async Task<IActionResult> UpdateAirport(Guid aid, AirportForUpdateDto airport)
        {
            try
            {
                await _airport.UpdateAirport(aid, airport);
                return Ok(new
                {
                    Success = true,
                    Message = "Airport Updated."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete]
        [Route("{aid}")]
        public async Task<IActionResult> DeleteAirport(Guid aid)
        {
            try
            {
                await _airport.DeleteAirport(aid);
                return Ok(new
                {
                    Success = true,
                    Message = "Airport Deleted."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
