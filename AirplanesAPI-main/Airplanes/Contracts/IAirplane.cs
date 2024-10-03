using Airplanes.Dtos;
using Airplanes.Models;


namespace Airplanes.Contracts
{
    public interface IAirplane
    {
        // 查詢所有Airplane資料的介面
        public Task<IEnumerable<Airplane>> GetAllAirplanes();
        // 查詢單一Airplane資料（依指定id）
        public Task<Airplane> GetAirplaneById(Guid id);
        // 新增Airplane資料
        public Task<AirplaneForCreationDto> CreateAirplane(AirplaneForCreationDto airplane);
        // 更新Airplane 資料（依指定id）
        public Task UpdateAirplane(Guid id, AirplaneForUpDateDto airplane);
        // 刪除Airplane資料（依指定id）
        public Task DeleteAirplane(Guid id);
    }

}
