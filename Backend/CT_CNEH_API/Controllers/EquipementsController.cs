using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;
using CT_CNEH_API.Services;

namespace CT_CNEH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEquipementService _equipementService;

        public EquipementsController(ApplicationDbContext context, IEquipementService equipementService)
        {
            _context = context;
            _equipementService = equipementService;
        }

        // GET: api/Equipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipementDto>>> GetEquipements(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? marque = null,
            [FromQuery] string? modele = null,
            [FromQuery] int? ligne = null,
            [FromQuery] int? type = null)
        {
            var (equipements, totalCount, totalPages) = await _equipementService.GetEquipementsAsync(
                page, pageSize, marque, modele, ligne, type);

            // Ajouter les informations de pagination dans les headers
            Response.Headers.Add("X-Total-Count", totalCount.ToString());
            Response.Headers.Add("X-Page-Count", totalPages.ToString());

            return Ok(equipements);
        }

        // GET: api/Equipements/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EquipementDto>> GetEquipement(int id)
        {
            var equipement = await _equipementService.GetEquipementByIdAsync(id);

            if (equipement == null)
                return NotFound();

            return Ok(equipement);
        }

        // POST: api/Equipements
        [HttpPost]
        public async Task<ActionResult<Equipement>> CreateEquipement(Equipement equipement)
        {
            // Validation
            if (string.IsNullOrEmpty(equipement.Marque))
                return BadRequest("La marque de l'équipement est requise");

            if (string.IsNullOrEmpty(equipement.Modele))
                return BadRequest("Le modèle de l'équipement est requis");

            if (equipement.LigneId <= 0)
                return BadRequest("La ligne est requise");

            if (equipement.TypeEquipementId <= 0)
                return BadRequest("Le type d'équipement est requis");

            // Vérifier que la ligne et le type existent
            var ligneExists = await _context.Lignes.AnyAsync(l => l.Id == equipement.LigneId);
            if (!ligneExists)
                return BadRequest("Ligne invalide");

            var typeExists = await _context.TypeEquipements.AnyAsync(t => t.Id == equipement.TypeEquipementId);
            if (!typeExists)
                return BadRequest("Type d'équipement invalide");

            // Validation des dates
            if (equipement.DateExpirationEtalonnage.HasValue && equipement.DateEtalonnage.HasValue)
            {
                if (equipement.DateExpirationEtalonnage <= equipement.DateEtalonnage)
                    return BadRequest("La date d'expiration de l'étalonnage doit être postérieure à la date d'étalonnage");
            }

            equipement.CreatedAt = DateTime.Now;
            _context.Equipements.Add(equipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEquipement), new { id = equipement.Id }, equipement);
        }

        // PUT: api/Equipements/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEquipement(int id, Equipement equipement)
        {
            if (id != equipement.Id)
                return BadRequest();

            var existingEquipement = await _context.Equipements.FindAsync(id);
            if (existingEquipement == null)
                return NotFound();

            // Validation
            if (string.IsNullOrEmpty(equipement.Marque))
                return BadRequest("La marque de l'équipement est requise");

            if (string.IsNullOrEmpty(equipement.Modele))
                return BadRequest("Le modèle de l'équipement est requis");

            if (equipement.LigneId <= 0)
                return BadRequest("La ligne est requise");

            if (equipement.TypeEquipementId <= 0)
                return BadRequest("Le type d'équipement est requis");

            // Vérifier que la ligne et le type existent
            var ligneExists = await _context.Lignes.AnyAsync(l => l.Id == equipement.LigneId);
            if (!ligneExists)
                return BadRequest("Ligne invalide");

            var typeExists = await _context.TypeEquipements.AnyAsync(t => t.Id == equipement.TypeEquipementId);
            if (!typeExists)
                return BadRequest("Type d'équipement invalide");

            // Validation des dates
            if (equipement.DateExpirationEtalonnage.HasValue && equipement.DateEtalonnage.HasValue)
            {
                if (equipement.DateExpirationEtalonnage <= equipement.DateEtalonnage)
                    return BadRequest("La date d'expiration de l'étalonnage doit être postérieure à la date d'étalonnage");
            }

            // Mettre à jour les propriétés
            existingEquipement.Marque = equipement.Marque;
            existingEquipement.Modele = equipement.Modele;
            existingEquipement.LigneId = equipement.LigneId;
            existingEquipement.TypeEquipementId = equipement.TypeEquipementId;
            existingEquipement.Protocole = equipement.Protocole;
            existingEquipement.RefHomologation = equipement.RefHomologation;
            existingEquipement.DateHomologation = equipement.DateHomologation;
            existingEquipement.DateMiseService = equipement.DateMiseService;
            existingEquipement.DateEtalonnage = equipement.DateEtalonnage;
            existingEquipement.DateExpirationEtalonnage = equipement.DateExpirationEtalonnage;
            existingEquipement.UpdatedAt = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipementExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Equipements/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipement(int id)
        {
            var equipement = await _context.Equipements.FindAsync(id);
            if (equipement == null)
                return NotFound();

            _context.Equipements.Remove(equipement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EquipementExists(int id)
        {
            return _context.Equipements.Any(e => e.Id == id);
        }
    }
}
