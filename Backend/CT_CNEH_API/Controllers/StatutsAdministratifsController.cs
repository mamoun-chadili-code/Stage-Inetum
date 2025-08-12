using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatutsAdministratifsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatutsAdministratifsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StatutsAdministratifs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatutAdministratif>>> GetStatutsAdministratifs()
        {
            try
            {
                // Récupération avec la propriété Code qui existe dans la base
                var statuts = await _context.StatutAdministratifs
                    .Select(s => new { s.Id, s.Libelle, s.Code })
                    .OrderBy(s => s.Libelle)
                    .ToListAsync();
                
                return Ok(statuts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération des statuts administratifs", error = ex.Message });
            }
        }

        // GET: api/StatutsAdministratifs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatutAdministratif>> GetStatutAdministratif(int id)
        {
            try
            {
                var statut = await _context.StatutAdministratifs.FindAsync(id);
                if (statut == null)
                {
                    return NotFound();
                }
                return Ok(statut);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération du statut administratif", error = ex.Message });
            }
        }

        // POST: api/StatutsAdministratifs
        [HttpPost]
        public async Task<ActionResult<StatutAdministratif>> CreateStatutAdministratif([FromBody] StatutAdministratif statut)
        {
            try
            {
                statut.DateCreation = DateTime.Now;
                statut.DateModification = DateTime.Now;
                
                _context.StatutAdministratifs.Add(statut);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetStatutAdministratif), new { id = statut.Id }, statut);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la création du statut administratif", error = ex.Message });
            }
        }

        // PUT: api/StatutsAdministratifs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatutAdministratif(int id, [FromBody] StatutAdministratif statut)
        {
            try
            {
                var existingStatut = await _context.StatutAdministratifs.FindAsync(id);
                if (existingStatut == null)
                {
                    return NotFound();
                }

                existingStatut.Libelle = statut.Libelle;
                existingStatut.DateModification = DateTime.Now;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la modification du statut administratif", error = ex.Message });
            }
        }

        // DELETE: api/StatutsAdministratifs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatutAdministratif(int id)
        {
            try
            {
                var statut = await _context.StatutAdministratifs.FindAsync(id);
                if (statut == null)
                {
                    return NotFound();
                }

                _context.StatutAdministratifs.Remove(statut);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la suppression du statut administratif", error = ex.Message });
            }
        }
    }
} 