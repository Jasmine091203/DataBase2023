using Airplanes.Dtos;

namespace Airplanes.Contracts
{
    public interface ICross
    {
        //P04第10頁 
        public Task<AirplaneOfAirport> GetAirplanesByAirportId(Guid id);
        public Task<AirportOfAirplane> GetAirportsByAirplaneId(Guid id);
        public Task<AirplaneDetailsOfAirport> GetAirplaneDetailsByAirportId(Guid id);
        public Task<AirportDetailsOfAirplane> GetAirportDetailsByAirplaneId(Guid id);
    }
}
