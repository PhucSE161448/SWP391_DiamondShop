using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Commons;
using Application.Interfaces;
using Application.Interfaces.SendEmails;
using Application.ViewModels.SendEmails;
using MailKit.Net.Smtp;
using MapsterMapper;
using MimeKit;

namespace Application.Services.SendEmails
{
    public class SendService : ISendService
    {
        private readonly AppConfiguration _emailConfig;

        public SendService(AppConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public async Task SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }
        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfig.EmailConfiguration.From, _emailConfig.EmailConfiguration.From));
            emailMessage.To.Add(new MailboxAddress(_emailConfig.EmailConfiguration.From, _emailConfig.EmailConfiguration.From));
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };
            return emailMessage;
        }
        private void Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.EmailConfiguration.SmtpServer, _emailConfig.EmailConfiguration.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.EmailConfiguration.UserName, _emailConfig.EmailConfiguration.Password);
                    client.Send(mailMessage);
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}
