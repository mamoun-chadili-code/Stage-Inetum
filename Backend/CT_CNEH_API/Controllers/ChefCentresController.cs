using Microsoft.AspNetCore.Mvc;
using CT_CNEH_API.Services;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChefCentresController : ControllerBase
    {
        private readonly ChefCentreService _chefCentreService;

        public ChefCentresController(ChefCentreService chefCentreService)
        {
            _chefCentreService = chefCentreService;
        }

        // GET: api/ChefCentres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChefCentre>>> GetChefCentres()
        {
            try
            {
                var chefCentres = await _chefCentreService.GetAllChefCentresAsync();
                return Ok(chefCentres);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/ChefCentres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChefCentre>> GetChefCentre(int id)
        {
            try
            {
                var chefCentre = await _chefCentreService.GetChefCentreByIdAsync(id);
                
                if (chefCentre == null)
                {
                    return NotFound($"Chef de centre avec l'ID {id} non trouvé");
                }

                return Ok(chefCentre);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/ChefCentres/cct/5
        [HttpGet("cct/{cctId}")]
        public async Task<ActionResult<IEnumerable<ChefCentre>>> GetChefCentresByCCT(int cctId)
        {
            try
            {
                var chefCentres = await _chefCentreService.GetChefCentresByCCTAsync(cctId);
                return Ok(chefCentres);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // POST: api/ChefCentres
        [HttpPost]
        public async Task<ActionResult<ChefCentre>> CreateChefCentre([FromBody] ChefCentre chefCentre)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdChefCentre = await _chefCentreService.CreateChefCentreAsync(chefCentre);
                
                return CreatedAtAction(
                    nameof(GetChefCentre), 
                    new { id = createdChefCentre.Id }, 
                    createdChefCentre
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // PUT: api/ChefCentres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateChefCentre(int id, [FromBody] ChefCentreUpdateDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != dto.Id)
                {
                    return BadRequest("L'ID dans l'URL ne correspond pas à l'ID dans le corps de la requête");
                }

                var success = await _chefCentreService.UpdateChefCentreAsync(id, dto);
                
                if (!success)
                {
                    return NotFound($"Chef de centre avec l'ID {id} non trouvé");
                }

                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // PUT: api/ChefCentres/5/disassociate
        [HttpPut("{id}/disassociate")]
        public async Task<IActionResult> DisassociateFromCCT(int id)
        {
            try
            {
                var success = await _chefCentreService.DisassociateFromCCTAsync(id);
                
                if (!success)
                {
                    return NotFound($"Chef de centre avec l'ID {id} non trouvé");
                }

                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // DELETE: api/ChefCentres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChefCentre(int id)
        {
            try
            {
                var success = await _chefCentreService.DeleteChefCentreAsync(id);
                
                if (!success)
                {
                    return NotFound($"Chef de centre avec l'ID {id} non trouvé");
                }

                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
    }
}









