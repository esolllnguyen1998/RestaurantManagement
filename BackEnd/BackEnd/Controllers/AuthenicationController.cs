using System;
using System.Threading.Tasks;
using BackEnd.Application;
using BackEnd.Application.Reponses;
using BackEnd.Attributes;
using BackEnd.Model;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenicationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthenicationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// API POST Login
        /// </summary>
        /// <param username="username" password="password"></param>    
        [HttpPost("login")]
        public async Task<LoginReponse> Login([FromBody] VerifyUserCommand model)
        {
            return await _mediator.Send(model);
        }
    }
}