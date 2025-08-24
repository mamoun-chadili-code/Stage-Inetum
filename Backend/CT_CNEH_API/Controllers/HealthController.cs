using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HealthController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Vérifie la santé générale de l'API
        /// </summary>
        [HttpGet]
        public IActionResult GetHealth()
        {
            return Ok(new
            {
                status = "healthy",
                timestamp = DateTime.UtcNow,
                version = "1.0.0",
                environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"
            });
        }

        /// <summary>
        /// Vérifie la connexion à la base de données
        /// </summary>
        [HttpGet("database")]
        public async Task<IActionResult> GetDatabaseHealth()
        {
            try
            {
                var canConnect = await _context.Database.CanConnectAsync();
                var databaseName = _context.Database.GetDbConnection().Database;
                var serverVersion = _context.Database.GetDbConnection().ServerVersion;

                return Ok(new
                {
                    status = canConnect ? "connected" : "disconnected",
                    database = databaseName,
                    serverVersion = serverVersion,
                    timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "error",
                    message = ex.Message,
                    timestamp = DateTime.UtcNow
                });
            }
        }

        /// <summary>
        /// Vérifie les statistiques de la base de données
        /// </summary>
        [HttpGet("stats")]
        public async Task<IActionResult> GetDatabaseStats()
        {
            try
            {
                var stats = new
                {
                    users = await _context.Users.CountAsync(),
                    reseaux = await _context.Reseaux.CountAsync(),
                    ccts = await _context.CCTs.CountAsync(),
                    agents = await _context.Agents.CountAsync(),
                                         lignes = await _context.Lignes.CountAsync(),
                    equipements = await _context.Equipements.CountAsync(),
                    formations = await _context.Formations.CountAsync(),
                    decisions = await _context.Decisions.CountAsync(),
                    timestamp = DateTime.UtcNow
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "error",
                    message = ex.Message,
                    timestamp = DateTime.UtcNow
                });
            }
        }
    }
}
