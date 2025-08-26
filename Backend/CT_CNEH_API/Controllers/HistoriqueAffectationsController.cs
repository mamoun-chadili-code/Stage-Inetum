using CT_CNEH_API.DTOs;
using CT_CNEH_API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoriqueAffectationsController : ControllerBase
    {
        private readonly IHistoriqueAffectationsService _historiqueService;

        public HistoriqueAffectationsController(IHistoriqueAffectationsService historiqueService)
        {
            _historiqueService = historiqueService;
        }

        // GET: api/HistoriqueAffectations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistoriqueAffectationDto>>> GetHistoriques()
        {
            try
            {
                var historiques = await _historiqueService.GetAllAsync();
                return Ok(historiques);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/HistoriqueAffectations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HistoriqueAffectationDto>> GetHistorique(int id)
        {
            try
            {
                var historique = await _historiqueService.GetByIdAsync(id);
                if (historique == null)
                {
                    return NotFound($"Historique avec l'ID {id} non trouvé");
                }

                return Ok(historique);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/HistoriqueAffectations/agent/5
        [HttpGet("agent/{agentId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueAffectationDto>>> GetHistoriquesByAgent(int agentId)
        {
            try
            {
                var historiques = await _historiqueService.GetByAgentIdAsync(agentId);
                return Ok(historiques);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/HistoriqueAffectations/chefcentre/5
        [HttpGet("chefcentre/{chefCentreId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueAffectationDto>>> GetHistoriquesByChefCentre(int chefCentreId)
        {
            try
            {
                var historiques = await _historiqueService.GetByChefCentreIdAsync(chefCentreId);
                return Ok(historiques);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/HistoriqueAffectations/cct/5
        [HttpGet("cct/{cctId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueAffectationDto>>> GetHistoriquesByCCT(int cctId)
        {
            try
            {
                var historiques = await _historiqueService.GetByCCTIdAsync(cctId);
                return Ok(historiques);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // POST: api/HistoriqueAffectations
        [HttpPost]
        public async Task<ActionResult<HistoriqueAffectationDto>> CreateHistorique(HistoriqueAffectationDto historiqueDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdHistorique = await _historiqueService.CreateAsync(historiqueDto);
                return CreatedAtAction(nameof(GetHistorique), new { id = createdHistorique.Id }, createdHistorique);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // PUT: api/HistoriqueAffectations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHistorique(int id, HistoriqueAffectationDto historiqueDto)
        {
            try
            {
                if (id != historiqueDto.Id)
                {
                    return BadRequest("L'ID dans l'URL ne correspond pas à l'ID dans le corps de la requête");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedHistorique = await _historiqueService.UpdateAsync(id, historiqueDto);
                if (updatedHistorique == null)
                {
                    return NotFound($"Historique avec l'ID {id} non trouvé");
                }

                return Ok(updatedHistorique);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // DELETE: api/HistoriqueAffectations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistorique(int id)
        {
            try
            {
                var result = await _historiqueService.DeleteAsync(id);
                if (!result)
                {
                    return NotFound($"Historique avec l'ID {id} non trouvé");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
    }
}
