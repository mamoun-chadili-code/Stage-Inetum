using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategorieCAPsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategorieCAPsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CategorieCAPs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategorieCCT>>> GetCategorieCAPs()
        {
            try
            {
                var categories = await _context.CategorieCCTs
                    .Select(c => new { c.Id, c.Libelle, c.Code })
                    .OrderBy(c => c.Libelle)
                    .ToListAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération des catégories CAP", error = ex.Message });
            }
        }

        // GET: api/CategorieCAPs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategorieCCT>> GetCategorieCAP(int id)
        {
            try
            {
                var categorie = await _context.CategorieCCTs.FindAsync(id);

                if (categorie == null)
                {
                    return NotFound(new { message = $"Catégorie CAP avec ID {id} non trouvée" });
                }

                return Ok(categorie);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération de la catégorie CAP", error = ex.Message });
            }
        }
    }
}
