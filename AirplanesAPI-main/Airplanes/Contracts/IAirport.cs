using Airplanes.Dtos;
using Airplanes.Models;

namespace Airplanes.Contracts
{
    public interface IAirport
    {        
        // 查詢所有Airport資料的介面
        public Task<IEnumerable<Airport>> GetAllAirports();
        // 查詢單一Airport資料（依指定id）
        public Task<Airport> GetAirportById(Guid id);
        // 新增Airport資料
        public Task<AirportForCreationDto> CreateAirport(AirportForCreationDto airport);
        // 更新Airport 資料（依指定id）
        public Task UpdateAirport(Guid id, AirportForUpdateDto airport);
        // 刪除Airport資料（依指定id）
        public Task DeleteAirport(Guid id);

    }
}
