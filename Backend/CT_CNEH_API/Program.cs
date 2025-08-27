using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CT_CNEH_API.Data;
using CT_CNEH_API.Services;
using CT_CNEH_API.Scripts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuration de la base de données
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuration de l'authentification JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JwtSettings:SecretKey"]!)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

// Configuration de l'autorisation
builder.Services.AddAuthorization();

// Configuration CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "https://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials()
                   .WithExposedHeaders("X-Total-Count", "X-Page-Count")
                   .SetIsOriginAllowedToAllowWildcardSubdomains();
        });
    
    // Configuration CORS plus permissive pour le développement
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Injection des services
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ChefCentreService>();
builder.Services.AddScoped<LigneService>();
builder.Services.AddScoped<IDecisionService, DecisionService>();
builder.Services.AddScoped<IEquipementService, EquipementService>();
// CCTService supprimé car fichier vide
builder.Services.AddScoped<AgentService>();
builder.Services.AddScoped<IHistoriqueCCTService, HistoriqueCCTService>();
builder.Services.AddScoped<IHistoriqueAgentService, HistoriqueAgentService>();
builder.Services.AddScoped<IHistoriqueChefCentreService, HistoriqueChefCentreService>();

// Configuration d'AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Utilisation de CORS AVANT la redirection HTTPS
app.UseCors("AllowReactApp");

// Désactiver la redirection HTTPS en développement pour éviter les problèmes CORS
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Configuration des fichiers statiques pour les uploads
app.UseStaticFiles(); // Pour servir les fichiers statiques par défaut
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "uploads")),
    RequestPath = "/uploads"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Création de la base de données si elle n'existe pas et seeding des données
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        Console.WriteLine("=== DÉBUT INITIALISATION BASE DE DONNÉES ===");
        
        // Vérifier si la base existe, sinon la créer
        if (!context.Database.CanConnect())
        {
            Console.WriteLine("Base de données non accessible, création...");
            context.Database.EnsureCreated();
            Console.WriteLine("Base de données créée avec succès !");
        }
        else
        {
            Console.WriteLine("Base de données accessible.");
        }
        
        // Vérifier le nombre d'utilisateurs
        var userCount = context.Users.Count();
        Console.WriteLine($"Nombre d'utilisateurs dans la base : {userCount}");
        
        // Forcer le seeding si pas d'utilisateurs
        if (userCount == 0)
        {
            Console.WriteLine("Aucun utilisateur trouvé, exécution du seeding...");
            await SeedData.InitializeAsync(context);
            Console.WriteLine("Base de données peuplée avec succès !");
            
            // Vérifier après seeding
            var newUserCount = context.Users.Count();
            Console.WriteLine($"Nombre d'utilisateurs après seeding : {newUserCount}");
        }
        else
        {
            Console.WriteLine("Utilisateurs trouvés, seeding ignoré.");
        }
        
        Console.WriteLine("=== FIN INITIALISATION BASE DE DONNÉES ===");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ ERREUR lors de l'initialisation de la base : {ex.Message}");
        Console.WriteLine($"Stack trace : {ex.StackTrace}");
    }
}

app.Run(); 