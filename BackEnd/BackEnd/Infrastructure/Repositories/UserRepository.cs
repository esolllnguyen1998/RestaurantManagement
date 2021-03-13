using BackEnd.Infrastructure.Dapper;
using BackEnd.Infrastructure.DTO;
using BackEnd.Infrastructure.Repositories.Interfaces;
using Dapper;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository 
    {
        private readonly IDatabaseConnectionFactory _dbConnectionFactory;
        public UserRepository(IDatabaseConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<StaffAccountDto> GetStaffAccountfByUsernameAndPassword(string username, string password)
        {
            using var conn = await _dbConnectionFactory.CreateConnectionAsync();
            var paramaters = new { username = username , password = password };
            var result = conn.Query<StaffAccountDto>("SELECT * FROM tbl_account WHERE username = @username AND password = @password", paramaters).FirstOrDefault();
            return result;
        }
        public async Task<StaffDto> GetStaffByStaffId(int id)
        {
            using var conn = await _dbConnectionFactory.CreateConnectionAsync();
            var paramaters = new { id = id };
            var result = conn.Query<StaffDto>("SELECT * FROM tbl_staff WHERE id = @id", paramaters).FirstOrDefault();
            return result;
        }
    }
}
