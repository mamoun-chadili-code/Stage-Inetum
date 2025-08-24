using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatutLignesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatutLignesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StatutLignes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatutLigne>>> GetStatutLignes()
        {
            try
            {
                var statuts = await _context.StatutLignes
                    .OrderBy(s => s.Libelle)
                    .ToListAsync();
                
                return Ok(statuts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/StatutLignes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatutLigne>> GetStatutLigne(int id)
        {
            try
            {
                var statut = await _context.StatutLignes
                    .FirstOrDefaultAsync(s => s.Id == id);

                if (statut == null)
                {
                    return NotFound($"Statut de ligne avec l'ID {id} non trouvé");
                }

                return Ok(statut);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // POST: api/StatutLignes
        [HttpPost]
        public async Task<ActionResult<StatutLigne>> CreateStatutLigne([FromBody] StatutLigne statutLigne)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.StatutLignes.Add(statutLigne);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetStatutLigne), new { id = statutLigne.Id }, statutLigne);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // PUT: api/StatutLignes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatutLigne(int id, [FromBody] StatutLigne statutLigne)
        {
            try
            {
                if (id != statutLigne.Id)
                {
                    return BadRequest("L'ID dans l'URL ne correspond pas à l'ID dans le corps de la requête");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingStatut = await _context.StatutLignes.FindAsync(id);
                if (existingStatut == null)
                {
                    return NotFound($"Statut de ligne avec l'ID {id} non trouvé");
                }

                existingStatut.Libelle = statutLigne.Libelle;
                existingStatut.Code = statutLigne.Code;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // DELETE: api/StatutLignes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatutLigne(int id)
        {
            try
            {
                var statutLigne = await _context.StatutLignes.FindAsync(id);
                if (statutLigne == null)
                {
                    return NotFound($"Statut de ligne avec l'ID {id} non trouvé");
                }

                // Vérifier s'il y a des lignes qui utilisent ce statut
                                            var lignesUsingStatut = await _context.Lignes
                    .Where(l => l.StatutId == id)
                    .AnyAsync();

                if (lignesUsingStatut)
                {
                    return BadRequest("Impossible de supprimer ce statut car il est utilisé par des lignes existantes");
                }

                _context.StatutLignes.Remove(statutLigne);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
    }
}
