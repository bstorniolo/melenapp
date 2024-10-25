using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.Azure.Cosmos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


 string EndpointUri = "https://localhost:8081/";
string PrimaryKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="; // Use the emulator key




// Configure authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAdB2C"));

// Configure Cosmos DB client
builder.Services.AddSingleton<CosmosClient>(serviceProvider =>
{
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    var cosmosSettings = configuration.GetSection("CosmosDb");
    string account = cosmosSettings["Account"];
    string key = cosmosSettings["Key"];

    var cosmosClientOptions = new CosmosClientOptions
    {
        ConnectionMode = ConnectionMode.Gateway,
                LimitToEndpoint = true, // Prevent endpoint discovery
                HttpClientFactory = () =>
                {
                    var handler = new HttpClientHandler
                    {
                        // Accept self-signed certificates
                        ServerCertificateCustomValidationCallback = (request, cert, chain, errors) => true
                    };
                    return new HttpClient(handler);
                }
        // HttpClientFactory = () =>
        // {
        //     var handler = new HttpClientHandler
        //     {
        //         // ServerCertificateCustomValidationCallback = (request, cert, chain, errors) => true
        //         ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator

        //     };
        //     return new HttpClient(handler);
        // },
        // ConnectionMode = ConnectionMode.Gateway // Use Gateway mode for better compatibility
    };
    
    return new CosmosClient(EndpointUri, PrimaryKey, cosmosClientOptions);
});

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.

// app.UseHttpsRedirection();

app.UseCors();

// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.Run();


