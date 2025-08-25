using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypeEntitesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TypeEntitesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /TypeEntites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeEntite>>> GetTypeEntites()
        {
            try
            {
                var typeEntites = await _context.TypeEntites
                    .OrderBy(t => t.Libelle)
                    .ToListAsync();

                return Ok(typeEntites);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: /TypeEntites/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeEntite>> GetTypeEntite(int id)
        {
            try
            {
                var typeEntite = await _context.TypeEntites.FindAsync(id);

                if (typeEntite == null)
                {
                    return NotFound($"Type d'entité avec l'ID {id} non trouvé");
                }

                return Ok(typeEntite);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
    }
}
