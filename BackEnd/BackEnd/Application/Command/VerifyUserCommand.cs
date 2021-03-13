using BackEnd.Application.Reponses;
using BackEnd.Helpers;
using BackEnd.Infrastructure.DTO;
using BackEnd.Infrastructure.Repositories.Interfaces;
using MediatR;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BackEnd.Application
{
    public class VerifyUserCommand : IRequest<LoginReponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class VerifyUserCommandHandler : IRequestHandler<VerifyUserCommand, LoginReponse>
    {
        private readonly IUserRepository _userRepository;

        public VerifyUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<LoginReponse> Handle(VerifyUserCommand request, CancellationToken cancellationToken)
        {
            var handler = new JwtSecurityTokenHandler();
            StaffAccountDto account = await _userRepository.GetStaffAccountfByUsernameAndPassword(request.Username, request.Password);
            if (account == null)
            {
                return new LoginReponse()
                {
                    StaffInfomation = null,
                    Message = "Username or Password is wrong.",
                    Token = string.Empty
                };
            }

            StaffDto staffInfomation = await _userRepository.GetStaffByStaffId(account.staff_id);
            return new LoginReponse() 
            {
                Message = "Login success.",
                StaffInfomation = staffInfomation,
                Token = RC4.Encrypt(staffInfomation.position.ToString())
            };
        }
    }
}
