using MailKit.Security;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using System.Net.Mail;
using System.Net;
using System.Text.RegularExpressions;
using DnsClient;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace Application.Ultils
{
    public static class SendEmail
    {
        public static async Task<bool> SendConfirmationEmail(string toEmail, string confirmationLink)
        {
            // Validate email format
            if (!IsValidEmail(toEmail))
            {
                return false;
            }

            // Validate MX records
            if (!await HasMxRecords(toEmail))
            {
                return false;
            }

            var userName = "DiamondShop";
            var emailFrom = "lamminhphuc285@gmail.com";
            var password = "eltj zalu zqyc pely";

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(userName, emailFrom));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Confirmation Email";
            message.Body = new TextPart("html")
            {
                Text =
                @"
                <html>
                    <head>
                        <style>
                            body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                                font-family: 'Arial', sans-serif;
                                background-color: #fff3e0;
                            }
                            .content {
                                text-align: center;
                                padding: 20px;
                                background-color: #ffe0b2;
                                border-radius: 10px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                color: #ff6f00;
                                font-size: 24px;
                                margin-bottom: 20px;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #ff9800;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                                transition: background-color 0.3s ease;
                            }
                            .button:hover {
                                background-color: #fb8c00;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='content'>
                            <div class='header'>Welcome to Our Diamond Shop!</div>
                            <p>Please click the button below to confirm your email and start exploring our product</p>
                            <a class='button' href='"
                + confirmationLink
                + @"'>Confirm Email</a>
                        </div>
                    </body>
                </html>
                "
            };

            using var client = new SmtpClient();
            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);

            await client.AuthenticateAsync(emailFrom, password);

            try
            {
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
                return true;
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.Message);
                return false;
            }
        }

        private static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private static async Task<bool> HasMxRecords(string email)
        {
            var domain = email.Split('@').Last();
            var lookup = new LookupClient();

            try
            {
                var result = await lookup.QueryAsync(domain, QueryType.MX);
                return result.Answers.MxRecords().Any();
            }
            catch
            {
                return false;
            }
        }
    }
}
