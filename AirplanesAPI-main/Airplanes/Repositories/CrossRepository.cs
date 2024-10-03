using Dapper;
using Airplanes.Contracts;
using Airplanes.Utilities;
using Airplanes.Dtos;
using Airplanes.Models;


namespace Airplanes.Repositories
{
    public class CrossRepository : ICross
    {
        private readonly DbContext _dbContext;
        public CrossRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AirplaneOfAirport> GetAirplanesByAirportId(Guid id)
        {
            string sqlQuery = "SELECT Aid, Aname FROM Airport WHERE Aid = @Id;" +
            "SELECT P.Pname FROM Airplane P, Flight_information I " +
           "WHERE I.Aid = @Id AND P.Pid = I.Pid;";
            using (var connection = _dbContext.CreateConnection())
            {
                var multi = await connection.QueryMultipleAsync(sqlQuery, new { Id = id });
                var airport = await multi.ReadSingleOrDefaultAsync<AirplaneOfAirport>();
                if (airport != null)
                    airport.Airplanes = (await multi.ReadAsync<String>()).ToList();
                return airport;
            }
        }

        public async Task<AirportOfAirplane> GetAirportsByAirplaneId(Guid id)
        {
            string sqlQuery = "SELECT Pid, Pname FROM Airplane WHERE Pid = @Id;" +
            "SELECT A.Aname FROM Airport A, Flight_information I " +
           "WHERE I.Pid = @Id AND A.Aid = I.Aid;";
            using (var connection = _dbContext.CreateConnection())
            {
                var multi = await connection.QueryMultipleAsync(sqlQuery, new { Id = id });
                var airplane = await multi.ReadSingleOrDefaultAsync<AirportOfAirplane>();
                if (airplane != null)
                    airplane.Airports = (await multi.ReadAsync<String>()).ToList();
                return airplane;
            }
        }
        public async Task<AirplaneDetailsOfAirport> GetAirplaneDetailsByAirportId(Guid id)
        {
            string sqlQuery = "SELECT Aid, Aname FROM Airport WHERE Aid = @Id;" +
            "SELECT P.* FROM Airplane P, Flight_information I " +
           "WHERE I.Aid = @Id AND P.Pid = I.Pid;";
            using (var connection = _dbContext.CreateConnection())
            {
                var multi = await connection.QueryMultipleAsync(sqlQuery, new { Id = id });
                var airport = await multi.ReadSingleOrDefaultAsync<AirplaneDetailsOfAirport>();
                if (airport != null)
                    airport.Airplanes = (await multi.ReadAsync<Airplane>()).ToList();
                return airport;
            }
        }
        public async Task<AirportDetailsOfAirplane> GetAirportDetailsByAirplaneId(Guid id)
        {
            string sqlQuery = "SELECT Pid, Pname FROM Airplane WHERE Pid = @Id;" +
            "SELECT A.* FROM Airport A, Flight_information I " +
           "WHERE I.Pid = @Id AND A.Aid = I.Aid;";
            using (var connection = _dbContext.CreateConnection())
            {
                var multi = await connection.QueryMultipleAsync(sqlQuery, new { Id = id });
                var airplane = await multi.ReadSingleOrDefaultAsync<AirportDetailsOfAirplane>();
                if (airplane != null)
                    airplane.Airports = (await multi.ReadAsync<Airport>()).ToList();
                return airplane;
            }
        }
    }
}
