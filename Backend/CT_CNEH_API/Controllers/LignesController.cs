using Microsoft.AspNetCore.Mvc;
using CT_CNEH_API.Services;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LignesController : ControllerBase
    {
        private readonly LigneService _ligneService;

        public LignesController(LigneService ligneService)
        {
            _ligneService = ligneService;
        }

        // GET: api/Lignes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LigneDto>>> GetLignes()
        {
            try
            {
                var lignes = await _ligneService.GetAllLignesAsync();
                return Ok(lignes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/Lignes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LigneDto>> GetLigne(int id)
        {
            try
            {
                var ligne = await _ligneService.GetLigneByIdAsync(id);
                
                if (ligne == null)
                {
                    return NotFound($"Ligne avec l'ID {id} non trouvée");
                }

                return Ok(ligne);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/Lignes/search
        [HttpPost("search")]
        public async Task<ActionResult<object>> SearchLignes([FromBody] LigneSearchDto searchDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var (lignes, totalCount) = await _ligneService.SearchLignesAsync(searchDto);
                
                return Ok(new
                {
                    lignes = lignes,
                    totalCount = totalCount,
                    page = searchDto.Page,
                    pageSize = searchDto.PageSize,
                    totalPages = (int)Math.Ceiling((double)totalCount / searchDto.PageSize)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // GET: api/Lignes/cct/5
        [HttpGet("cct/{cctId}")]
        public async Task<ActionResult<IEnumerable<LigneDto>>> GetLignesByCCT(int cctId)
        {
            try
            {
                var lignes = await _ligneService.GetLignesByCCTAsync(cctId);
                return Ok(lignes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // POST: api/Lignes
        [HttpPost]
        public async Task<ActionResult<Ligne>> CreateLigne([FromBody] LigneCreateDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Vérifier si la ligne existe déjà
                if (await _ligneService.LigneExistsAsync(dto.NumeroLigne, dto.CCTId))
                {
                    return BadRequest($"Une ligne avec le numéro {dto.NumeroLigne} existe déjà dans ce CCT");
                }

                var createdLigne = await _ligneService.CreateLigneAsync(dto);
                
                return CreatedAtAction(
                    nameof(GetLigne), 
                    new { id = createdLigne.Id }, 
                    createdLigne
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // PUT: api/Lignes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLigne(int id, [FromBody] LigneUpdateDto dto)
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

                // Vérifier si la ligne existe déjà (exclure la ligne actuelle)
                if (await _ligneService.LigneExistsAsync(dto.NumeroLigne, dto.CCTId, id))
                {
                    return BadRequest($"Une ligne avec le numéro {dto.NumeroLigne} existe déjà dans ce CCT");
                }

                var success = await _ligneService.UpdateLigneAsync(id, dto);
                
                if (!success)
                {
                    return NotFound($"Ligne avec l'ID {id} non trouvée");
                }

                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // DELETE: api/Lignes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigne(int id)
        {
            try
            {
                var success = await _ligneService.DeleteLigneAsync(id);
                
                if (!success)
                {
                    return NotFound($"Ligne avec l'ID {id} non trouvée");
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