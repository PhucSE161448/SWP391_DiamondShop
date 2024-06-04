using Application.Exceptions;
using Domain.Enums;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace WebAPI.Middlewares
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;
        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong while processing {context.Request.Path}");
                await HandleExceptionAsync(context, ex);
            }
        }
        private Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";
            var errorDetails = new ErrorDetails
            {
                ErrorType = ErrorType.InternalServerError.ToString(),
                ErrorMessage = ex.Message,
                //StackTrace = ex.StackTrace
            };

            errorDetails = ex switch
            {
                NotFoundException => errorDetails with { ErrorType = ErrorType.NotFound.ToString(), StatusCode = (int)HttpStatusCode.NotFound },
                BadRequestException => errorDetails with { ErrorType = ErrorType.BadRequest.ToString(), StatusCode = (int)HttpStatusCode.BadRequest },
                UnauthorizedException => errorDetails with { ErrorType = ErrorType.Unauthorized.ToString(), StatusCode = (int)HttpStatusCode.Unauthorized },
                _ => errorDetails
            };

            var response = JsonConvert.SerializeObject(errorDetails);
            context.Response.StatusCode = errorDetails.StatusCode;

            return context.Response.WriteAsync(response);
        }
        internal record ErrorDetails
        {
            public int StatusCode { get; set; } = (int)HttpStatusCode.InternalServerError;

            [EnumDataType(typeof(ErrorType))]
            public string ErrorType { get; set; }

            public string ErrorMessage { get; set; }

            //public string? StackTrace { get; set; }
        }
    }
}
