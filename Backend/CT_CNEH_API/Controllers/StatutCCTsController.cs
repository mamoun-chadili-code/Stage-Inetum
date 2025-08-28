using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatutCCTsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatutCCTsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StatutCCTs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatutCCT>>> GetStatutCCTs()
        {
            try
            {
                var statuts = await _context.StatutCCTs
                    .OrderBy(s => s.Id)
                    .ToListAsync();

                return Ok(statuts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération des statuts CCT", error = ex.Message });
            }
        }

        // GET: api/StatutCCTs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatutCCT>> GetStatutCCT(int id)
        {
            try
            {
                var statut = await _context.StatutCCTs.FindAsync(id);

                if (statut == null)
                {
                    return NotFound(new { message = "Statut CCT non trouvé" });
                }

                return Ok(statut);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération du statut CCT", error = ex.Message });
            }
        }

        // POST: api/StatutCCTs
        [HttpPost]
        public async Task<ActionResult<StatutCCT>> PostStatutCCT(StatutCCT statutCCT)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.StatutCCTs.Add(statutCCT);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetStatutCCT), new { id = statutCCT.Id }, statutCCT);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la création du statut CCT", error = ex.Message });
            }
        }

        // PUT: api/StatutCCTs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatutCCT(int id, StatutCCT statutCCT)
        {
            try
            {
                if (id != statutCCT.Id)
                {
                    return BadRequest(new { message = "ID de l'URL ne correspond pas à l'ID du statut CCT" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Entry(statutCCT).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StatutCCTExists(id))
                    {
                        return NotFound(new { message = "Statut CCT non trouvé" });
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la mise à jour du statut CCT", error = ex.Message });
            }
        }

        // DELETE: api/StatutCCTs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatutCCT(int id)
        {
            try
            {
                var statutCCT = await _context.StatutCCTs.FindAsync(id);
                if (statutCCT == null)
                {
                    return NotFound(new { message = "Statut CCT non trouvé" });
                }

                _context.StatutCCTs.Remove(statutCCT);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la suppression du statut CCT", error = ex.Message });
            }
        }

        private bool StatutCCTExists(int id)
        {
            return _context.StatutCCTs.Any(e => e.Id == id);
        }
    }
}











