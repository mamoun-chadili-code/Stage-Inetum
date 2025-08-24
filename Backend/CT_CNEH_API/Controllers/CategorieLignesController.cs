using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategorieLignesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategorieLignesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CategorieLignes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategorieLigne>>> GetCategorieLignes()
        {
            try
            {
                var categories = await _context.CategorieLignes
                    .Where(c => c.EstActif)
                    .OrderBy(c => c.Libelle)
                    .ToListAsync();
                    
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/CategorieLignes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategorieLigne>> GetCategorieLigne(int id)
        {
            try
            {
                var categorie = await _context.CategorieLignes.FindAsync(id);
                
                if (categorie == null)
                {
                    return NotFound($"Catégorie avec l'ID {id} non trouvée");
                }
                
                return categorie;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
    }
}

