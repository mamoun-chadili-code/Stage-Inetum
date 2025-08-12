using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NiveauxFormationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NiveauxFormationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/NiveauxFormation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NiveauFormation>>> GetNiveauxFormation()
        {
            return await _context.NiveauFormations.ToListAsync();
        }

        // GET: api/NiveauxFormation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NiveauFormation>> GetNiveauFormation(int id)
        {
            var niveauFormation = await _context.NiveauFormations.FindAsync(id);

            if (niveauFormation == null)
            {
                return NotFound();
            }

            return niveauFormation;
        }

        // POST: api/NiveauxFormation
        [HttpPost]
        public async Task<ActionResult<NiveauFormation>> CreateNiveauFormation(NiveauFormation niveauFormation)
        {
            _context.NiveauFormations.Add(niveauFormation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNiveauFormation), new { id = niveauFormation.Id }, niveauFormation);
        }

        // PUT: api/NiveauxFormation/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNiveauFormation(int id, NiveauFormation niveauFormation)
        {
            if (id != niveauFormation.Id)
            {
                return BadRequest();
            }

            _context.Entry(niveauFormation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NiveauFormationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/NiveauxFormation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNiveauFormation(int id)
        {
            var niveauFormation = await _context.NiveauFormations.FindAsync(id);
            if (niveauFormation == null)
            {
                return NotFound();
            }

            _context.NiveauFormations.Remove(niveauFormation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NiveauFormationExists(int id)
        {
            return _context.NiveauFormations.Any(e => e.Id == id);
        }
    }
} 