using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoriqueAffectationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HistoriqueAffectationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/HistoriqueAffectations/agent/{agentId}
        [HttpGet("agent/{agentId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueAffectation>>> GetHistoriqueAgent(int agentId)
        {
            var historique = await _context.HistoriqueAffectations
                .Where(h => h.EntiteId == agentId && h.TypeEntite == "Agent")
                .Include(h => h.CCT)
                .OrderByDescending(h => h.DateAffectation)
                .ToListAsync();

            return Ok(historique);
        }

        // GET: api/HistoriqueAffectations/chefcentre/{chefCentreId}
        [HttpGet("chefcentre/{chefCentreId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueAffectation>>> GetHistoriqueChefCentre(int chefCentreId)
        {
            var historique = await _context.HistoriqueAffectations
                .Where(h => h.EntiteId == chefCentreId && h.TypeEntite == "ChefCentre")
                .Include(h => h.CCT)
                .OrderByDescending(h => h.DateAffectation)
                .ToListAsync();

            return Ok(historique);
        }

        // POST: api/HistoriqueAffectations
        [HttpPost]
        public async Task<ActionResult<HistoriqueAffectation>> CreateHistoriqueAffectation(HistoriqueAffectation historique)
        {
            // Valider que l'entité existe
            if (historique.TypeEntite == "Agent")
            {
                var agent = await _context.Agents.FindAsync(historique.EntiteId);
                if (agent == null)
                    return BadRequest("Agent non trouvé");
            }
            else if (historique.TypeEntite == "ChefCentre")
            {
                var chefCentre = await _context.ChefCentres.FindAsync(historique.EntiteId);
                if (chefCentre == null)
                    return BadRequest("Chef de centre non trouvé");
            }
            else
            {
                return BadRequest("Type d'entité invalide");
            }

            // Vérifier que le CCT existe
            var cct = await _context.CCTs.FindAsync(historique.CCTId);
            if (cct == null)
                return BadRequest("CCT non trouvé");

            // Désactiver l'ancienne affectation active
            var ancienneAffectation = await _context.HistoriqueAffectations
                .Where(h => h.EntiteId == historique.EntiteId && 
                           h.TypeEntite == historique.TypeEntite && 
                           h.IsActive)
                .FirstOrDefaultAsync();

            if (ancienneAffectation != null)
            {
                ancienneAffectation.IsActive = false;
                ancienneAffectation.DateFinAffectation = DateTime.UtcNow;
                ancienneAffectation.MotifFinAffectation = "Nouvelle affectation";
            }

            // Créer la nouvelle affectation
            historique.DateAffectation = DateTime.UtcNow;
            historique.IsActive = true;
            historique.DateCreation = DateTime.UtcNow;

            _context.HistoriqueAffectations.Add(historique);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHistoriqueAgent), new { agentId = historique.EntiteId }, historique);
        }

        // PUT: api/HistoriqueAffectations/{id}/terminer
        [HttpPut("{id}/terminer")]
        public async Task<IActionResult> TerminerAffectation(int id, [FromBody] string motif)
        {
            var historique = await _context.HistoriqueAffectations.FindAsync(id);
            if (historique == null)
                return NotFound();

            historique.IsActive = false;
            historique.DateFinAffectation = DateTime.UtcNow;
            historique.MotifFinAffectation = motif;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/HistoriqueAffectations/cct/{cctId}
        [HttpGet("cct/{cctId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetPersonnelCCT(int cctId)
        {
            var personnel = await _context.HistoriqueAffectations
                .Where(h => h.CCTId == cctId && h.IsActive)
                .Include(h => h.CCT)
                .Select(h => new
                {
                    h.Id,
                    h.EntiteId,
                    h.TypeEntite,
                    h.DateAffectation,
                    h.MotifAffectation,
                    CCT = new { h.CCT.Id, h.CCT.Nom }
                })
                .OrderBy(h => h.TypeEntite)
                .ThenBy(h => h.DateAffectation)
                .ToListAsync();

            return Ok(personnel);
        }
    }
}
