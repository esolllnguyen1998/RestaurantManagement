using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace BackEnd.Infrastructure.Dapper
{
    public interface IDatabaseConnectionFactory
    {
        Task<IDbConnection> CreateConnectionAsync();
    }

    public class DatabasebConnectionFactory : IDatabaseConnectionFactory
    {
        private readonly string _connectionString;

        public DatabasebConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IDbConnection> CreateConnectionAsync()
        {
            var sqlConnection = new SqlConnection(_connectionString);
            await sqlConnection.OpenAsync();
            return sqlConnection;
        }
    }
}
