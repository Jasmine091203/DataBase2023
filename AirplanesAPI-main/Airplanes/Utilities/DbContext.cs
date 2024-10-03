using System.Data;
using Microsoft.Data.SqlClient;

namespace Airplanes.Utilities
{
    public class DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("AirplaneContext");
        }
        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);}
    }
