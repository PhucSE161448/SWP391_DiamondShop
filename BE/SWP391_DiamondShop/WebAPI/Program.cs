using Application.Commons;
using Infrastructures;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Serilog;
using WebAPI;
using WebAPI.Middlewares;
using Google.Apis.Auth.OAuth2;
using Net.payOS;
using Newtonsoft.Json.Linq;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var configuration = builder.Configuration.Get<AppConfiguration>() ?? new AppConfiguration();
builder.Services.AddInfrastructuresService(configuration.DatabaseConnection);
builder.Services.AddWebAPIService();
PayOS payOs = new PayOS(configuration.PayOSConfig.PAYOS_CLIENT_ID,
                        configuration.PayOSConfig.PAYOS_API_KEY,
                        configuration.PayOSConfig.PAYOS_CHECKSUM_KEY);
builder.Services.AddSingleton(payOs);
builder.Services.AddSingleton(configuration);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration.JWTSection.Issuer,
            ValidAudience = configuration.JWTSection.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.JWTSection.SecretKey)),
            CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
        };
    });
builder.Services.AddSwaggerGen(setup =>
{
    // Include 'SecurityScheme' to use JWT Authentication
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Put **_ONLY_** your JWT Bearer token on textbox below!",

        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    setup.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    setup.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, Array.Empty<string>() }
    });
});

builder.Services.AddSingleton(configuration);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Host.UseSerilog((ctx, lc) => lc.WriteTo.Console().ReadFrom.Configuration(ctx.Configuration));

var google = JObject.FromObject(configuration.GoogleImage);
string g = google.ToString();
string temp = Path.GetTempFileName();
File.WriteAllText(temp, g);
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", temp);
GoogleCredential credential = GoogleCredential.FromFile(temp);

var app = builder.Build();
app.UseCors(options =>
    options.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseMiddleware<ConfirmationTokenMiddleware>();
//app.UseMiddleware<PerformanceMiddleware>();
app.MapHealthChecks("/healthchecks");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

