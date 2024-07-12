using Application.ViewModels.SendEmails;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;
using Application.Interfaces.SendEmails;

namespace WebAPI.Controllers.SendEmail
{
    public class SendEmailController : BaseController
    {
        private readonly ISendService _service;
        public SendEmailController(ISendService service)
        {
            _service = service;
        }
        [HttpPut]
        public void SendEmail([FromBody] Message message)
        { 
            _service.SendEmail(message);
        }
    }
}
