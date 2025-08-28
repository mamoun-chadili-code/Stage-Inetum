using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;
using CT_CNEH_API.Services;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChefsCentreController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChefsCentreController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ChefsCentre/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllChefsCentre()
        {
            var chefsCentre = await _context.ChefCentres
                .Include(c => c.CCT)
                .Select(c => new { 
                    c.Id, 
                    c.Nom, 
                    c.Prenom, 
                    c.CIN, 
                    c.CCTId,
                    CCTNom = c.CCT != null ? c.CCT.Nom : null
                })
                .ToListAsync();
            
            return Ok(chefsCentre);
        }

        // GET: api/ChefsCentre
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChefCentreDto>>> GetChefsCentre(
            [FromQuery] int? regionId,
            [FromQuery] int? villeId,
            [FromQuery] int? reseauId,
            [FromQuery] int? cctId,
            [FromQuery] int? niveauFormationId,
            [FromQuery] int? anneeAffectation,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var query = _context.ChefCentres
                .Include(c => c.CCT)
                .Include(c => c.NiveauFormationInitial)
                .AsQueryable();

            // Filtres
            if (regionId.HasValue)
                query = query.Where(c => c.CCT != null && c.CCT.RegionId == regionId.Value);

            if (villeId.HasValue)
                query = query.Where(c => c.CCT != null && c.CCT.VilleId == villeId.Value);

            if (reseauId.HasValue)
                query = query.Where(c => c.CCT != null && c.CCT.ReseauId == reseauId.Value);

            if (cctId.HasValue)
                query = query.Where(c => c.CCTId == cctId.Value);

            if (niveauFormationId.HasValue)
                query = query.Where(c => c.NiveauFormationInitialId == niveauFormationId.Value);

            if (anneeAffectation.HasValue)
                query = query.Where(c => c.DateAffectationCCT.HasValue && c.DateAffectationCCT.Value.Year == anneeAffectation.Value);

            // Pagination
            var totalCount = await query.CountAsync();
            var chefsCentre = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Response.Headers.Add("X-Total-Count", totalCount.ToString());
            Response.Headers.Add("X-Page-Count", Math.Ceiling((double)totalCount / pageSize).ToString());

            // Mapping vers DTO
            var chefCentreDtos = chefsCentre.Select(c => new ChefCentreDto
            {
                Id = c.Id,
                Nom = c.Nom,
                Prenom = c.Prenom,
                CIN = c.CIN,
                Tel = c.Tel,
                Mail = c.Mail ?? string.Empty,
                CNSS = c.CNSS,
                Sexe = c.Sexe,
                DateNaissance = c.DateNaissance,
                NiveauFormationInitialId = c.NiveauFormationInitialId.GetValueOrDefault(0),
                NiveauFormationInitialNom = c.NiveauFormationInitial?.Libelle ?? string.Empty,
                CCTId = c.CCTId ?? 0,
                CCTNom = c.CCT?.Nom ?? string.Empty,
                DateAffectationCCT = c.DateAffectationCCT,
                AnneeAutorisation = c.AnneeAutorisation,
                ReferenceApprobationCNEH = c.ReferenceApprobationCNEH ?? string.Empty,
                DateApprobationCNEH = c.DateApprobationCNEH,
                IsActive = true,
                DateCreation = DateTime.Now
            }).ToList();

            return Ok(chefCentreDtos);
        }

        // GET: api/ChefsCentre/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChefCentreDto>> GetChefCentre(int id)
        {
            var chefCentre = await _context.ChefCentres
                .Include(c => c.CCT)
                .Include(c => c.NiveauFormationInitial)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (chefCentre == null)
            {
                return NotFound();
            }

            // Mapping vers DTO
            var chefCentreDto = new ChefCentreDto
            {
                Id = chefCentre.Id,
                Nom = chefCentre.Nom,
                Prenom = chefCentre.Prenom,
                CIN = chefCentre.CIN,
                Tel = chefCentre.Tel,
                Mail = chefCentre.Mail ?? string.Empty,
                CNSS = chefCentre.CNSS,
                Sexe = chefCentre.Sexe,
                DateNaissance = chefCentre.DateNaissance,
                NiveauFormationInitialId = chefCentre.NiveauFormationInitialId ?? 0,
                NiveauFormationInitialNom = chefCentre.NiveauFormationInitial?.Libelle ?? string.Empty,
                CCTId = chefCentre.CCTId ?? 0,
                CCTNom = chefCentre.CCT?.Nom ?? string.Empty,
                DateAffectationCCT = chefCentre.DateAffectationCCT,
                AnneeAutorisation = chefCentre.AnneeAutorisation,
                ReferenceApprobationCNEH = chefCentre.ReferenceApprobationCNEH ?? string.Empty,
                DateApprobationCNEH = chefCentre.DateApprobationCNEH,
                IsActive = true,
                DateCreation = DateTime.Now
            };

            return Ok(chefCentreDto);
        }

        // GET: api/ChefsCentre/{id}/historique
        [HttpGet("{id}/historique")]
        public async Task<ActionResult<IEnumerable<HistoriqueChefCentreDto>>> GetChefCentreHistorique(int id)
        {
            try
            {
                // Vérifier que le chef de centre existe
                var chefCentre = await _context.ChefCentres.FindAsync(id);
                if (chefCentre == null)
                {
                    return NotFound($"Chef de centre avec l'ID {id} non trouvé");
                }

                // Récupérer l'historique depuis le service HistoriqueChefCentre
                var historiqueService = HttpContext.RequestServices.GetRequiredService<IHistoriqueChefCentreService>();
                var historiques = await historiqueService.GetByChefCentreAsync(id);

                return Ok(historiques);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // POST: api/ChefsCentre
        [HttpPost]
        public async Task<ActionResult<ChefCentreDto>> CreateChefCentre([FromBody] CreateChefCentreDto createDto)
        {
            var chefCentre = new ChefCentre
            {
                Nom = createDto.Nom,
                Prenom = createDto.Prenom,
                CIN = createDto.CIN,
                CCTId = createDto.CCTId,
                DateAffectationCCT = createDto.DateAffectationCCT,
                ReferenceApprobationCNEH = createDto.ReferenceApprobationCNEH,
                AnneeAutorisation = createDto.AnneeAutorisation ?? DateTime.Now.Year,
                DateApprobationCNEH = createDto.DateApprobationCNEH,
                Tel = createDto.Tel,
                Mail = createDto.Mail,
                CNSS = createDto.CNSS,
                Sexe = createDto.Sexe ?? false,
                DateNaissance = createDto.DateNaissance,
                NiveauFormationInitialId = createDto.NiveauFormationInitialId
            };

            _context.ChefCentres.Add(chefCentre);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChefCentre), new { id = chefCentre.Id }, chefCentre);
        }

        // PUT: api/ChefsCentre/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateChefCentre(int id, [FromBody] UpdateChefCentreDto updateDto)
        {
            var chefCentre = await _context.ChefCentres.FindAsync(id);
            if (chefCentre == null)
            {
                return NotFound();
            }

            if (updateDto.Nom != null) chefCentre.Nom = updateDto.Nom;
            if (updateDto.Prenom != null) chefCentre.Prenom = updateDto.Prenom;
            if (updateDto.CIN != null) chefCentre.CIN = updateDto.CIN;
            if (updateDto.CCTId != null) chefCentre.CCTId = updateDto.CCTId;
            if (updateDto.DateAffectationCCT != null) chefCentre.DateAffectationCCT = updateDto.DateAffectationCCT;
            if (updateDto.ReferenceApprobationCNEH != null) chefCentre.ReferenceApprobationCNEH = updateDto.ReferenceApprobationCNEH;
            if (updateDto.AnneeAutorisation != null) chefCentre.AnneeAutorisation = updateDto.AnneeAutorisation.Value;
            if (updateDto.DateApprobationCNEH != null) chefCentre.DateApprobationCNEH = updateDto.DateApprobationCNEH;
            if (updateDto.Tel != null) chefCentre.Tel = updateDto.Tel;
            if (updateDto.Mail != null) chefCentre.Mail = updateDto.Mail;
            if (updateDto.CNSS != null) chefCentre.CNSS = updateDto.CNSS;
            if (updateDto.Sexe != null) chefCentre.Sexe = updateDto.Sexe.Value;
            if (updateDto.DateNaissance != null) chefCentre.DateNaissance = updateDto.DateNaissance;
            if (updateDto.NiveauFormationInitialId != null) chefCentre.NiveauFormationInitialId = updateDto.NiveauFormationInitialId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/ChefsCentre/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChefCentre(int id)
        {
            var chefCentre = await _context.ChefCentres.FindAsync(id);
            if (chefCentre == null)
            {
                return NotFound();
            }

            _context.ChefCentres.Remove(chefCentre);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}