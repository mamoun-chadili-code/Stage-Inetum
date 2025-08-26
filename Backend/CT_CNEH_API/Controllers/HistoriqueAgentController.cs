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
    public class HistoriqueAgentController : ControllerBase
    {
        private readonly IHistoriqueAgentService _historiqueService;

        public HistoriqueAgentController(IHistoriqueAgentService historiqueService)
        {
            _historiqueService = historiqueService;
        }

        // GET: api/HistoriqueAgent
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistoriqueAgentDto>>> GetHistoriques()
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

        // GET: api/HistoriqueAgent/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HistoriqueAgentDto>> GetHistorique(int id)
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

        // GET: api/HistoriqueAgent/agent/5
        [HttpGet("agent/{agentId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueAgentDto>>> GetHistoriquesByAgent(int agentId)
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

        // GET: api/HistoriqueAgent/cct/5
        [HttpGet("cct/{cctId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueAgentDto>>> GetHistoriquesByCCT(int cctId)
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

        // POST: api/HistoriqueAgent
        [HttpPost]
        public async Task<ActionResult<HistoriqueAgentDto>> CreateHistorique(HistoriqueAgentDto historiqueDto)
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

        // PUT: api/HistoriqueAgent/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHistorique(int id, HistoriqueAgentDto historiqueDto)
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

        // DELETE: api/HistoriqueAgent/5
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
