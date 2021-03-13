using BackEnd.Infrastructure.DTO;
using System.Threading.Tasks;

namespace BackEnd.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<StaffAccountDto> GetStaffAccountfByUsernameAndPassword(string username, string password);
        public Task<StaffDto> GetStaffByStaffId(int id);
    }
}
