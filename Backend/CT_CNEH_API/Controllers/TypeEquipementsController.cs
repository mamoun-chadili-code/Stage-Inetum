using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeEquipementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TypeEquipementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TypeEquipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeEquipement>>> GetTypeEquipements()
        {
            return await _context.TypeEquipements.ToListAsync();
        }

        // GET: api/TypeEquipements/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeEquipement>> GetTypeEquipement(int id)
        {
            var typeEquipement = await _context.TypeEquipements.FindAsync(id);

            if (typeEquipement == null)
                return NotFound();

            return typeEquipement;
        }

        // POST: api/TypeEquipements
        [HttpPost]
        public async Task<ActionResult<TypeEquipement>> CreateTypeEquipement(TypeEquipement typeEquipement)
        {
            if (string.IsNullOrEmpty(typeEquipement.Libelle))
                return BadRequest("Le libellé est requis");

            _context.TypeEquipements.Add(typeEquipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTypeEquipement), new { id = typeEquipement.Id }, typeEquipement);
        }

        // PUT: api/TypeEquipements/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTypeEquipement(int id, TypeEquipement typeEquipement)
        {
            if (id != typeEquipement.Id)
                return BadRequest();

            if (string.IsNullOrEmpty(typeEquipement.Libelle))
                return BadRequest("Le libellé est requis");

            var existingType = await _context.TypeEquipements.FindAsync(id);
            if (existingType == null)
                return NotFound();

            existingType.Libelle = typeEquipement.Libelle;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeEquipementExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/TypeEquipements/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTypeEquipement(int id)
        {
            var typeEquipement = await _context.TypeEquipements.FindAsync(id);
            if (typeEquipement == null)
                return NotFound();

            // Vérifier s'il y a des équipements qui utilisent ce type
            var equipementsUsingType = await _context.Equipements.AnyAsync(e => e.TypeEquipementId == id);
            if (equipementsUsingType)
                return BadRequest("Impossible de supprimer ce type car il est utilisé par des équipements");

            _context.TypeEquipements.Remove(typeEquipement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TypeEquipementExists(int id)
        {
            return _context.TypeEquipements.Any(e => e.Id == id);
        }
    }
}
