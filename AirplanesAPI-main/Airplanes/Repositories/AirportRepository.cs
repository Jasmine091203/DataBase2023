using Airplanes.Contracts;
using Airplanes.Models;
using Airplanes.Utilities;
using Dapper;
using Airplanes.Dtos;
using System.Data;

namespace Airplanes.Repositories
{
    public class AirportRepository : IAirport
    {
        private readonly DbContext _dbContext;
        public AirportRepository(DbContext dbContext)
        {
            // 注入DbContext 服務
            _dbContext = dbContext;
        }
        // 查詢所有Airport資料的實作
        public async Task<IEnumerable<Airport>> GetAllAirports()
        {
            string sqlQuery = "SELECT * FROM Airport";
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行查詢
                var airports = await connection.QueryAsync<Airport>(sqlQuery);
                return airports.ToList();
            }


        }



        public async Task<Airport> GetAirportById(Guid id)
        {
            string sqlQuery = "SELECT * FROM Airport WHERE Aid = @id";
            using (var connection = _dbContext.CreateConnection())
            {
                var airport = await
                    connection.QueryFirstOrDefaultAsync<Airport>(sqlQuery, new { id = id }); return airport;
            }
        }




        public async Task<AirportForCreationDto> CreateAirport(AirportForCreationDto airport)
        {
            string sqlQuery = "INSERT INTO Airport (Aname, Aterminal, Aapron, Aarea) VALUES (@Aname, @Aterminal, @Aapron, @Aarea)";
            using (var connection = _dbContext.CreateConnection())
            {
                await connection.ExecuteAsync(sqlQuery, airport);
                return airport;
            }
        }




        public async Task UpdateAirport(Guid id, AirportForUpdateDto airport)
        {
            string sqlQuery = "UPDATE Airport SET Aname = @Aname, Aterminal = @Aterminal, Aapron = @Aapron, Aarea = @Aarea WHERE Aid = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Guid);
            parameters.Add("Aname", airport.Aname, DbType.String);
            parameters.Add("Aterminal", airport.Aterminal, DbType.Int32);
            parameters.Add("Aapron", airport.Aapron, DbType.Double);
            parameters.Add("Aarea", airport.Aarea, DbType.Double);
            using (var connection = _dbContext.CreateConnection())
            {
                await connection.ExecuteAsync(sqlQuery, parameters);
            }
        }

        
        public async Task DeleteAirport(Guid id)
        {
            string sqlQuery = "DELETE FROM Airport WHERE Aid = @Id";
            var parameters= new DynamicParameters();
            parameters.Add("Id", id, DbType.Guid);
                                                    
            using (var connection = _dbContext.CreateConnection())
            {
                await connection.ExecuteAsync(sqlQuery, parameters);}}


    }
}