using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

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

        // DTOs pour les opérations
        public class ChefCentreDto
        {
            public int Id { get; set; }
            public string Nom { get; set; } = string.Empty;
            public string Prenom { get; set; } = string.Empty;
            public string CIN { get; set; } = string.Empty;
            public string? CCT { get; set; }
            public DateTime? DateNaissance { get; set; }
            public string? NiveauFormation { get; set; }
            public DateTime? DateAffectationCCT { get; set; }
            public int AnneeAutorisation { get; set; }
            public string? ReferenceApprobationCNEH { get; set; }
            public DateTime? DateApprobationCNEH { get; set; }
            public string Tel { get; set; } = string.Empty;
            public string? Mail { get; set; }
            public string CNSS { get; set; } = string.Empty;
            public bool Sexe { get; set; }
        }

        public class ChefCentreUpdateDto
        {
            public int Id { get; set; }
            public string Nom { get; set; } = string.Empty;
            public string Prenom { get; set; } = string.Empty;
            public string CIN { get; set; } = string.Empty;
            public int? CCTId { get; set; }
            public DateTime? DateAffectationCCT { get; set; }
            public string? ReferenceApprobationCNEH { get; set; }
            public int AnneeAutorisation { get; set; }
            public DateTime? DateApprobationCNEH { get; set; }
            public string Tel { get; set; } = string.Empty;
            public string? Mail { get; set; }
            public string CNSS { get; set; } = string.Empty;
            public bool Sexe { get; set; }
            public DateTime? DateNaissance { get; set; }
            public int? NiveauFormationInitialId { get; set; }
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
                CCT = c.CCT?.Nom,
                DateNaissance = c.DateNaissance,
                NiveauFormation = c.NiveauFormationInitial?.Libelle,
                DateAffectationCCT = c.DateAffectationCCT,
                AnneeAutorisation = c.AnneeAutorisation,
                ReferenceApprobationCNEH = c.ReferenceApprobationCNEH,
                DateApprobationCNEH = c.DateApprobationCNEH,
                Tel = c.Tel,
                Mail = c.Mail,
                CNSS = c.CNSS,
                Sexe = c.Sexe
            }).ToList();

            return Ok(chefCentreDtos);
        }

        // GET: api/ChefsCentre/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChefCentre>> GetChefCentre(int id)
        {
            var chefCentre = await _context.ChefCentres
                .Include(c => c.CCT)
                .Include(c => c.NiveauFormationInitial)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (chefCentre == null)
            {
                return NotFound();
            }

            return chefCentre;
        }

        // POST: api/ChefsCentre
        [HttpPost]
        public async Task<ActionResult<ChefCentre>> CreateChefCentre([FromBody] ChefCentreUpdateDto createDto)
        {
            var chefCentre = new ChefCentre
            {
                Nom = createDto.Nom,
                Prenom = createDto.Prenom,
                CIN = createDto.CIN,
                CCTId = createDto.CCTId,
                DateAffectationCCT = createDto.DateAffectationCCT,
                ReferenceApprobationCNEH = createDto.ReferenceApprobationCNEH,
                AnneeAutorisation = createDto.AnneeAutorisation,
                DateApprobationCNEH = createDto.DateApprobationCNEH,
                Tel = createDto.Tel,
                Mail = createDto.Mail,
                CNSS = createDto.CNSS,
                Sexe = createDto.Sexe,
                DateNaissance = createDto.DateNaissance,
                NiveauFormationInitialId = createDto.NiveauFormationInitialId
            };

            _context.ChefCentres.Add(chefCentre);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChefCentre), new { id = chefCentre.Id }, chefCentre);
        }

        // PUT: api/ChefsCentre/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateChefCentre(int id, [FromBody] ChefCentreUpdateDto updateDto)
        {
            var chefCentre = await _context.ChefCentres.FindAsync(id);
            if (chefCentre == null)
            {
                return NotFound();
            }

            chefCentre.Nom = updateDto.Nom;
            chefCentre.Prenom = updateDto.Prenom;
            chefCentre.CIN = updateDto.CIN;
            chefCentre.CCTId = updateDto.CCTId;
            chefCentre.DateAffectationCCT = updateDto.DateAffectationCCT;
            chefCentre.ReferenceApprobationCNEH = updateDto.ReferenceApprobationCNEH;
            chefCentre.AnneeAutorisation = updateDto.AnneeAutorisation;
            chefCentre.DateApprobationCNEH = updateDto.DateApprobationCNEH;
            chefCentre.Tel = updateDto.Tel;
            chefCentre.Mail = updateDto.Mail;
            chefCentre.CNSS = updateDto.CNSS;
            chefCentre.Sexe = updateDto.Sexe;
            chefCentre.DateNaissance = updateDto.DateNaissance;
            chefCentre.NiveauFormationInitialId = updateDto.NiveauFormationInitialId;

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

        // GET: api/ChefsCentre/5/historique
        [HttpGet("{id}/historique")]
        public async Task<ActionResult<IEnumerable<object>>> GetChefCentreHistorique(int id)
        {
            // Pour l'instant, retourner un historique vide
            // À implémenter selon vos besoins
            await Task.CompletedTask; // Pour éviter l'avertissement CS1998
            return Ok(new List<object>());
        }

        private bool ChefCentreExists(int id)
        {
            return _context.ChefCentres.Any(e => e.Id == id);
        }
    }
} 