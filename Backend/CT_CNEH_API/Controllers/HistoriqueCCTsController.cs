using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoriqueCCTsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HistoriqueCCTsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/HistoriqueCCTs/cct/5
        [HttpGet("cct/{cctId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueCCT>>> GetByCCT(int cctId)
        {
            var historiques = await _context.HistoriqueCCTs
                .Include(h => h.Reseau)
                .Where(h => h.CCTId == cctId)
                .OrderByDescending(h => h.DateDebut)
                .ToListAsync();
            return Ok(historiques);
        }

        // POST: api/HistoriqueCCTs
        [HttpPost]
        public async Task<ActionResult<HistoriqueCCT>> Create(HistoriqueCCT historique)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.HistoriqueCCTs.Add(historique);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetByCCT), new { cctId = historique.CCTId }, historique);
        }

        // PUT: api/HistoriqueCCTs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, HistoriqueCCT historique)
        {
            if (id != historique.Id)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.Entry(historique).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.HistoriqueCCTs.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/HistoriqueCCTs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var historique = await _context.HistoriqueCCTs.FindAsync(id);
            if (historique == null)
                return NotFound();
            _context.HistoriqueCCTs.Remove(historique);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
} 