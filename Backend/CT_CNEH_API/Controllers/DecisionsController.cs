using Microsoft.AspNetCore.Mvc;
using CT_CNEH_API.Services;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DecisionsController : ControllerBase
    {
        private readonly IDecisionService _decisionService;

        public DecisionsController(IDecisionService decisionService)
        {
            _decisionService = decisionService;
        }

        // GET: api/Decisions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DecisionDto>>> GetDecisions([FromQuery] DecisionSearchDto searchDto)
        {
            try
            {
                // Log pour déboguer
                Console.WriteLine($"🔍 GetDecisions - Paramètres reçus:");
                Console.WriteLine($"  - ReseauId: {searchDto.ReseauId}");
                Console.WriteLine($"  - CCTId: {searchDto.CCTId}");
                Console.WriteLine($"  - ChefCentreId: {searchDto.ChefCentreId}");
                Console.WriteLine($"  - LigneId: {searchDto.LigneId}");
                Console.WriteLine($"  - AgentId: {searchDto.AgentId}");
                Console.WriteLine($"  - TypeDecisionId: {searchDto.TypeDecisionId}");
                Console.WriteLine($"  - DateReference: {searchDto.DateReference}");
                Console.WriteLine($"  - Page: {searchDto.Page}, PageSize: {searchDto.PageSize}");

                if (!searchDto.IsValid())
                {
                    var errors = searchDto.GetValidationErrors();
                    return BadRequest(new { errors });
                }

                var (decisions, totalCount, totalPages) = await _decisionService.SearchDecisionsAsync(searchDto);

                // Ajouter les headers de pagination
                Response.Headers.Add("X-Total-Count", totalCount.ToString());
                Response.Headers.Add("X-Page-Count", totalPages.ToString());

                return Ok(decisions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur interne du serveur", details = ex.Message });
            }
        }

        // GET: api/Decisions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DecisionDto>> GetDecision(int id)
        {
            try
            {
                var decision = await _decisionService.GetDecisionByIdAsync(id);

                if (decision == null)
                    return NotFound(new { error = "Décision non trouvée" });

                return Ok(decision);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur interne du serveur", details = ex.Message });
            }
        }

        // POST: api/Decisions
        [HttpPost]
        public async Task<ActionResult<DecisionDto>> CreateDecision(Decision decision)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var createdDecision = await _decisionService.CreateDecisionAsync(decision);

                return CreatedAtAction(nameof(GetDecision), new { id = createdDecision.Id }, createdDecision);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur interne du serveur", details = ex.Message });
            }
        }

        // PUT: api/Decisions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDecision(int id, Decision decision)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var updatedDecision = await _decisionService.UpdateDecisionAsync(id, decision);

                return Ok(updatedDecision);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur interne du serveur", details = ex.Message });
            }
        }

        // DELETE: api/Decisions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDecision(int id)
        {
            try
            {
                var success = await _decisionService.DeleteDecisionAsync(id);

                if (!success)
                    return NotFound(new { error = "Décision non trouvée" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur interne du serveur", details = ex.Message });
            }
        }

        // GET: api/Decisions/types
        [HttpGet("types")]
        public ActionResult<IEnumerable<string>> GetDecisionTypes()
        {
            // Types de décisions prédéfinis
            var types = new[]
            {
                "Changement de nom",
                "Création",
                "Modification",
                "Suspension",
                "Révocation",
                "Promotion",
                "Mutation",
                "Formation",
                "Sanction",
                "Récompense"
            };

            return Ok(types);
        }

        // GET: api/Decisions/entites
        [HttpGet("entites")]
        public ActionResult<IEnumerable<string>> GetEntiteTypes()
        {
            // Types d'entités selon les spécifications
            var entites = new[]
            {
                "Agent",
                "ChefCentre", 
                "Cct",
                "Ligne",
                "Reseau"
            };

            return Ok(entites);
        }
    }
}
