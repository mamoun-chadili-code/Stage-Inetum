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
    public class HistoriqueCCTsController : ControllerBase
    {
        private readonly IHistoriqueCCTService _historiqueService;

        public HistoriqueCCTsController(IHistoriqueCCTService historiqueService)
        {
            _historiqueService = historiqueService;
        }

        // GET: api/HistoriqueCCTs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistoriqueCCTDto>>> GetHistoriques()
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

        // GET: api/HistoriqueCCTs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HistoriqueCCTDto>> GetHistorique(int id)
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

        // GET: api/HistoriqueCCTs/cct/5
        [HttpGet("cct/{cctId}")]
        public async Task<ActionResult<IEnumerable<HistoriqueCCTDto>>> GetHistoriquesByCCT(int cctId)
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

        // POST: api/HistoriqueCCTs
        [HttpPost]
        public async Task<ActionResult<HistoriqueCCTDto>> CreateHistorique(HistoriqueCCTDto historiqueDto)
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

        // PUT: api/HistoriqueCCTs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHistorique(int id, HistoriqueCCTDto historiqueDto)
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

        // DELETE: api/HistoriqueCCTs/5
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