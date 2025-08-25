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
            [FromQuery] int pageSize = 5,
            [FromQuery] string? marque = null,
            [FromQuery] string? modele = null,
            [FromQuery] int? ligne = null,
            [FromQuery] int? type = null,
            [FromQuery] int? cct = null)
        {
            var (equipements, totalCount, totalPages) = await _equipementService.GetEquipementsAsync(
                page, pageSize, marque, modele, ligne, type, cct);

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

        // GET: api/Equipements/debug/relations
        [HttpGet("debug/relations")]
        public async Task<ActionResult<object>> DebugRelations()
        {
            try
            {
                var debugInfo = new
                {
                    TotalEquipements = await _context.Equipements.CountAsync(),
                    TotalLignes = await _context.Lignes.CountAsync(),
                    TotalCCTs = await _context.CCTs.CountAsync(),
                    
                    EquipementsAvecLignes = await _context.Equipements
                        .Include(e => e.Ligne)
                        .Select(e => new
                        {
                            EquipementId = e.Id,
                            LigneId = e.LigneId,
                            LigneCCTId = e.Ligne.CCTId,
                            LigneNumero = e.Ligne.NumeroLigne
                        })
                        .ToListAsync(),
                    
                    LignesAvecCCTs = await _context.Lignes
                        .Select(l => new
                        {
                            LigneId = l.Id,
                            NumeroLigne = l.NumeroLigne,
                            CCTId = l.CCTId
                        })
                        .ToListAsync()
                };

                return Ok(debugInfo);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erreur lors du debug: {ex.Message}");
            }
        }

        // POST: api/Equipements
        [HttpPost]
        public async Task<ActionResult<Equipement>> CreateEquipement(EquipementCreateDto dto)
        {
            // Validation
            if (string.IsNullOrEmpty(dto.Marque))
                return BadRequest("La marque de l'équipement est requise");

            if (string.IsNullOrEmpty(dto.Modele))
                return BadRequest("Le modèle de l'équipement est requis");

            if (dto.LigneId <= 0)
                return BadRequest("La ligne est requise");

            if (dto.TypeEquipementId <= 0)
                return BadRequest("Le type d'équipement est requis");

            // Vérifier que la ligne et le type existent
            var ligneExists = await _context.Lignes.AnyAsync(l => l.Id == dto.LigneId);
            if (!ligneExists)
                return BadRequest("Ligne invalide");

            var typeExists = await _context.TypeEquipements.AnyAsync(t => t.Id == dto.TypeEquipementId);
            if (!typeExists)
                return BadRequest("Type d'équipement invalide");

            // Validation des dates
            if (dto.DateExpirationEtalonnage.HasValue && dto.DateEtalonnage.HasValue)
            {
                if (dto.DateExpirationEtalonnage <= dto.DateEtalonnage)
                    return BadRequest("La date d'expiration de l'étalonnage doit être postérieure à la date d'étalonnage");
            }

            // Créer l'équipement à partir du DTO
            var equipement = new Equipement
            {
                Marque = dto.Marque,
                Modele = dto.Modele,
                LigneId = dto.LigneId,
                TypeEquipementId = dto.TypeEquipementId,
                Protocole = dto.Protocole,
                RefHomologation = dto.RefHomologation,
                DateHomologation = dto.DateHomologation,
                DateMiseService = dto.DateMiseService,
                DateEtalonnage = dto.DateEtalonnage,
                DateExpirationEtalonnage = dto.DateExpirationEtalonnage,
                CreatedAt = DateTime.Now
            };

            _context.Equipements.Add(equipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEquipement), new { id = equipement.Id }, equipement);
        }

        // PUT: api/Equipements/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEquipement(int id, EquipementUpdateDto dto)
        {
            var existingEquipement = await _context.Equipements.FindAsync(id);
            if (existingEquipement == null)
                return NotFound();

            // Validation
            if (string.IsNullOrEmpty(dto.Marque))
                return BadRequest("La marque de l'équipement est requise");

            if (string.IsNullOrEmpty(dto.Modele))
                return BadRequest("Le modèle de l'équipement est requis");

            if (dto.LigneId <= 0)
                return BadRequest("La ligne est requise");

            if (dto.TypeEquipementId <= 0)
                return BadRequest("Le type d'équipement est requis");

            // Vérifier que la ligne et le type existent
            var ligneExists = await _context.Lignes.AnyAsync(l => l.Id == dto.LigneId);
            if (!ligneExists)
                return BadRequest("Ligne invalide");

            var typeExists = await _context.TypeEquipements.AnyAsync(t => t.Id == dto.TypeEquipementId);
            if (!typeExists)
                return BadRequest("Type d'équipement invalide");

            // Validation des dates
            if (dto.DateExpirationEtalonnage.HasValue && dto.DateEtalonnage.HasValue)
            {
                if (dto.DateExpirationEtalonnage <= dto.DateEtalonnage)
                    return BadRequest("La date d'expiration de l'étalonnage doit être postérieure à la date d'étalonnage");
            }

            // Mettre à jour les propriétés
            existingEquipement.Marque = dto.Marque;
            existingEquipement.Modele = dto.Modele;
            existingEquipement.LigneId = dto.LigneId;
            existingEquipement.TypeEquipementId = dto.TypeEquipementId;
            existingEquipement.Protocole = dto.Protocole;
            existingEquipement.RefHomologation = dto.RefHomologation;
            existingEquipement.DateHomologation = dto.DateHomologation;
            existingEquipement.DateMiseService = dto.DateMiseService;
            existingEquipement.DateEtalonnage = dto.DateEtalonnage;
            existingEquipement.DateExpirationEtalonnage = dto.DateExpirationEtalonnage;
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
