using BackEnd.Infrastructure.DTO;

namespace BackEnd.Application.Reponses
{
    public class LoginReponse
    {
        public string Message { get; set; }
        public StaffDto StaffInfomation { get; set; }
        public string Token { get; set; }
    }
}
