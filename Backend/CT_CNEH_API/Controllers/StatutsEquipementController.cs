using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatutsEquipementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatutsEquipementController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StatutsEquipement
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatutEquipement>>> GetStatutsEquipement()
        {
            return await _context.StatutsEquipement.ToListAsync();
        }

        // GET: api/StatutsEquipement/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<StatutEquipement>> GetStatutEquipement(int id)
        {
            var statutEquipement = await _context.StatutsEquipement.FindAsync(id);

            if (statutEquipement == null)
                return NotFound();

            return statutEquipement;
        }

        // POST: api/StatutsEquipement
        [HttpPost]
        public async Task<ActionResult<StatutEquipement>> CreateStatutEquipement(StatutEquipement statutEquipement)
        {
            if (string.IsNullOrEmpty(statutEquipement.Libelle))
                return BadRequest("Le libellé est requis");

            _context.StatutsEquipement.Add(statutEquipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStatutEquipement), new { id = statutEquipement.Id }, statutEquipement);
        }

        // PUT: api/StatutsEquipement/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatutEquipement(int id, StatutEquipement statutEquipement)
        {
            if (id != statutEquipement.Id)
                return BadRequest();

            if (string.IsNullOrEmpty(statutEquipement.Libelle))
                return BadRequest("Le libellé est requis");

            var existingStatut = await _context.StatutsEquipement.FindAsync(id);
            if (existingStatut == null)
                return NotFound();

            existingStatut.Libelle = statutEquipement.Libelle;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatutEquipementExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/StatutsEquipement/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatutEquipement(int id)
        {
            var statutEquipement = await _context.StatutsEquipement.FindAsync(id);
            if (statutEquipement == null)
                return NotFound();

            _context.StatutsEquipement.Remove(statutEquipement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StatutEquipementExists(int id)
        {
            return _context.StatutsEquipement.Any(e => e.Id == id);
        }
    }
}
