using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypeDecisionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TypeDecisionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /TypeDecisions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeDecision>>> GetTypeDecisions()
        {
            try
            {
                var typeDecisions = await _context.TypeDecisions
                    .OrderBy(t => t.Libelle)
                    .ToListAsync();

                return Ok(typeDecisions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: /TypeDecisions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeDecision>> GetTypeDecision(int id)
        {
            try
            {
                var typeDecision = await _context.TypeDecisions.FindAsync(id);

                if (typeDecision == null)
                {
                    return NotFound($"Type de décision avec l'ID {id} non trouvé");
                }

                return Ok(typeDecision);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
    }
}
