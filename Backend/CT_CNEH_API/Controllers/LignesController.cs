using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using System.Linq;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LignesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LignesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // DTO pour l'affichage des lignes
        public class LigneDto
        {
            public int Id { get; set; }
            public int NumLigne { get; set; }
            public string? CCT { get; set; }
            public string? Categorie { get; set; }
            public string? Statut { get; set; }
            public DateTime DateStatut { get; set; }
            public string Decision { get; set; } = string.Empty;
            public DateTime DecisionDate { get; set; }
        }

        // DTO pour la création/modification
        public class LigneUpdateDto
        {
            public int Id { get; set; }
            public int CCTId { get; set; }
            public int NumLigne { get; set; }
            public int TypeLigneId { get; set; }
            public int StatutId { get; set; }
            public DateTime DateStatut { get; set; }
            public string Decision { get; set; } = string.Empty;
            public DateTime DecisionDate { get; set; }
        }

        // GET: api/Lignes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LigneDto>>> GetLignes(
            [FromQuery] int? regionId,
            [FromQuery] int? villeId,
            [FromQuery] int? reseauId,
            [FromQuery] int? cctId,
            [FromQuery] int? anneeDemarrage,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 1000)  // ← Augmenté de 10 à 1000
        {
            var query = _context.Lignes
                .Include(l => l.CCT)
                    .ThenInclude(c => c.Region)
                .Include(l => l.CCT)
                    .ThenInclude(c => c.Ville)
                .Include(l => l.CCT)
                    .ThenInclude(c => c.Reseau)
                .Include(l => l.TypeLigne)
                .Include(l => l.Statut)
                .AsQueryable();

            // Filtres
            if (regionId.HasValue)
                query = query.Where(l => l.CCT.RegionId == regionId.Value);

            if (villeId.HasValue)
                query = query.Where(l => l.CCT.VilleId == villeId.Value);

            if (reseauId.HasValue)
                query = query.Where(l => l.CCT.ReseauId == reseauId.Value);

            if (cctId.HasValue)
                query = query.Where(l => l.CCTId == cctId.Value);

            if (anneeDemarrage.HasValue)
                query = query.Where(l => l.DateStatut.Year == anneeDemarrage.Value);

            // Pagination - Récupération de toutes les lignes par défaut
            var totalCount = await query.CountAsync();
            var lignes = await query.ToListAsync();  // ← Supprimé Skip/Take pour récupérer toutes les lignes

            Response.Headers.Add("X-Total-Count", totalCount.ToString());
            Response.Headers.Add("X-Page-Count", "1");  // ← Une seule page puisque toutes les lignes sont récupérées

            // Mapping vers DTO
            var ligneDtos = lignes.Select(l => new LigneDto
            {
                Id = l.Id,
                NumLigne = l.NumLigne,
                CCT = l.CCT?.Nom,
                Categorie = l.TypeLigne?.Libelle,
                Statut = l.Statut?.Libelle,
                DateStatut = l.DateStatut,
                Decision = l.Decision,
                DecisionDate = l.DecisionDate
            }).ToList();

            return Ok(ligneDtos);
        }

        // GET: api/Lignes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ligne>> GetLigne(int id)
        {
            var ligne = await _context.Lignes
                .Include(l => l.CCT)
                .Include(l => l.TypeLigne)
                .Include(l => l.Statut)
                .Include(l => l.Equipements)
                .Include(l => l.Decisions)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (ligne == null)
                return NotFound();

            return ligne;
        }

        // POST: api/Lignes
        [HttpPost]
        public async Task<ActionResult<Ligne>> CreateLigne([FromBody] LigneUpdateDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ligne = new Ligne
            {
                CCTId = createDto.CCTId,
                NumLigne = createDto.NumLigne,
                TypeLigneId = createDto.TypeLigneId,
                StatutId = createDto.StatutId,
                DateStatut = createDto.DateStatut,
                Decision = createDto.Decision,
                DecisionDate = createDto.DecisionDate
            };

            _context.Lignes.Add(ligne);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLigne), new { id = ligne.Id }, ligne);
        }

        // PUT: api/Lignes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLigne(int id, [FromBody] LigneUpdateDto updateDto)
        {
            try
            {
                // Validation de base
                if (!ModelState.IsValid)
                {
                    var errors = ModelState
                        .Where(x => x.Value.Errors.Count > 0)
                        .Select(x => new { Field = x.Key, Errors = x.Value.Errors.Select(e => e.ErrorMessage) })
                        .ToList();
                    
                    return BadRequest(new { 
                        Message = "Données de validation invalides",
                        Errors = errors,
                        ReceivedData = updateDto
                    });
                }

                // Vérifier que l'ID dans l'URL correspond à l'ID dans le DTO
                if (updateDto.Id != id)
                {
                    return BadRequest(new { 
                        Message = $"L'ID dans l'URL ({id}) ne correspond pas à l'ID dans les données ({updateDto.Id})",
                        UrlId = id,
                        DtoId = updateDto.Id
                    });
                }

                // Vérifier que la ligne existe
                var existingLigne = await _context.Lignes.FindAsync(id);
                if (existingLigne == null)
                {
                    return NotFound(new { 
                        Message = $"Ligne avec l'ID {id} introuvable",
                        RequestedId = id
                    });
                }

                // Vérifier que les entités liées existent
                var cctExists = await _context.CCTs.AnyAsync(c => c.Id == updateDto.CCTId);
                var typeLigneExists = await _context.CategorieLignes.AnyAsync(t => t.Id == updateDto.TypeLigneId);
                var statutExists = await _context.StatutLignes.AnyAsync(s => s.Id == updateDto.StatutId);

                if (!cctExists)
                {
                    return BadRequest(new { 
                        Message = $"CCT avec l'ID {updateDto.CCTId} n'existe pas",
                        InvalidCCTId = updateDto.CCTId
                    });
                }

                if (!typeLigneExists)
                {
                    return BadRequest(new { 
                        Message = $"Type de ligne avec l'ID {updateDto.TypeLigneId} n'existe pas",
                        InvalidTypeLigneId = updateDto.TypeLigneId
                    });
                }

                if (!statutExists)
                {
                    return BadRequest(new { 
                        Message = $"Statut avec l'ID {updateDto.StatutId} n'existe pas",
                        InvalidStatutId = updateDto.StatutId
                    });
                }

                // Mettre à jour les propriétés
                existingLigne.CCTId = updateDto.CCTId;
                existingLigne.NumLigne = updateDto.NumLigne;
                existingLigne.TypeLigneId = updateDto.TypeLigneId;
                existingLigne.StatutId = updateDto.StatutId;
                existingLigne.DateStatut = updateDto.DateStatut;
                existingLigne.Decision = updateDto.Decision;
                existingLigne.DecisionDate = updateDto.DecisionDate;

                await _context.SaveChangesAsync();

                return Ok(new { 
                    Message = "Ligne mise à jour avec succès",
                    UpdatedLigne = new {
                        Id = existingLigne.Id,
                        NumLigne = existingLigne.NumLigne,
                        CCTId = existingLigne.CCTId,
                        TypeLigneId = existingLigne.TypeLigneId,
                        StatutId = existingLigne.StatutId,
                        DateStatut = existingLigne.DateStatut
                    }
                });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Conflict(new { 
                    Message = "Conflit de concurrence lors de la mise à jour",
                    Error = ex.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    Message = "Erreur interne du serveur lors de la mise à jour",
                    Error = ex.Message,
                    StackTrace = ex.StackTrace
                });
            }
        }

        // DELETE: api/Lignes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigne(int id)
        {
            var ligne = await _context.Lignes.FindAsync(id);
            if (ligne == null)
                return NotFound();

            _context.Lignes.Remove(ligne);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LigneExists(int id)
        {
            return _context.Lignes.Any(e => e.Id == id);
        }
    }
} 