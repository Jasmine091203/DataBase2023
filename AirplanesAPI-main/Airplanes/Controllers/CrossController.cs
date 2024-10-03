using Airplanes.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DepartmentStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrossController : ControllerBase
    {
        private readonly ILogger<CrossController> _logger;
        private readonly ICross _cross;
        public CrossController(ILogger<CrossController> logger, ICross cross)
        {
            _logger = logger;
            _cross = cross;
        }
        [HttpGet("AirplanesForAirport/{aid}")]
        public async Task<IActionResult> GetAirplanesByAirportId(Guid aid)
        {
            try
            {
                var airport = await _cross.GetAirplanesByAirportId(aid);
                return Ok(new
                {
                    Success = true,
                    Message = "輸出Airort的id,name，以及能停的Airplanes",
                    airport
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("AirportsForAirplane/{pid}")]
        public async Task<IActionResult> GetAirportsByAirplaneId(Guid pid)
        {
            try
            {
                var airplane = await _cross.GetAirportsByAirplaneId(pid);
                return Ok(new
                {
                    Success = true,
                    Message = "輸出Airplane的id,name，以及它能停放的Airport",
                    airplane
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("airplaneDetailsForAirport/{aid}")]
        public async Task<IActionResult> GetAirplaneDetailsByAirportId(Guid aid)
        {
            try
            {
                var airplaneDetails = await _cross.GetAirplaneDetailsByAirportId(aid);
                return Ok(new
                {
                    Success = true,
                    Message = "取得指定 id 詳細資料成功",
                    Data = airplaneDetails
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("airportDetailsForAirplane/{pid}")]
        public async Task<IActionResult> GetAirportDetailsByAirplaneId(Guid pid)
        {
            try
            {
                var airportDetails = await _cross.GetAirportDetailsByAirplaneId(pid);
                return Ok(new
                {
                    Success = true,
                    Message = "取得指定 id 詳細資料成功",
                    Data = airportDetails
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

