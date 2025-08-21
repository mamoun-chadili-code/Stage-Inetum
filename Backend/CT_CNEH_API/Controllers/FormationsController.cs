using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using System.Linq;
using System.Threading.Tasks;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FormationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Formations
        [HttpGet]
        public async Task<ActionResult<object>> GetFormations(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? searchTerm = null,
            [FromQuery] int? reseauId = null,
            [FromQuery] int? cctId = null,
            [FromQuery] int? chefCentreId = null,
            [FromQuery] int? agentId = null,
            [FromQuery] int? typeFormationId = null,
            [FromQuery] DateTime? dateDebut = null,
            [FromQuery] DateTime? dateFin = null,
            [FromQuery] bool? valide = null)
        {
            try
            {
                var query = _context.Formations
                    .Include(f => f.CCT)
                    .Include(f => f.Agent)
                    .Include(f => f.ChefCentre)
                    .Include(f => f.TypeFormation)
                    .AsQueryable();

                // Appliquer les filtres
                if (!string.IsNullOrEmpty(searchTerm))
                {
                    query = query.Where(f => 
                        (f.Intitule != null && f.Intitule.Contains(searchTerm)) ||
                        (f.Matiere != null && f.Matiere.Contains(searchTerm)) ||
                        (f.PremierAnimateur != null && f.PremierAnimateur.Contains(searchTerm)) ||
                        (f.DeuxiemeAnimateur != null && f.DeuxiemeAnimateur.Contains(searchTerm)));
                }

                if (reseauId.HasValue)
                {
                    query = query.Where(f => f.CCT != null && f.CCT.ReseauId == reseauId.Value);
                }

                if (cctId.HasValue)
                {
                    query = query.Where(f => f.CCTId == cctId.Value);
                }

                if (chefCentreId.HasValue)
                {
                    query = query.Where(f => f.ChefCentreId == chefCentreId.Value);
                }

                if (agentId.HasValue)
                {
                    query = query.Where(f => f.AgentId == agentId.Value);
                }

                if (typeFormationId.HasValue)
                {
                    query = query.Where(f => f.TypeFormationId == typeFormationId.Value);
                }

                if (dateDebut.HasValue)
                {
                    query = query.Where(f => f.DateDebut >= dateDebut.Value);
                }

                if (dateFin.HasValue)
                {
                    query = query.Where(f => f.DateFin <= dateFin.Value);
                }

                if (valide.HasValue)
                {
                    query = query.Where(f => f.ValideParFormateur == valide.Value);
                }

                // Compter le total avant pagination
                var totalCount = await query.CountAsync();

                // Appliquer la pagination
                var formations = await query
                    .OrderByDescending(f => f.DateDebut)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(f => new
                    {
                        f.Id,
                        f.Intitule,
                        CCT = f.CCT != null ? f.CCT.Nom : "",
                        Agent = f.Agent != null ? $"{f.Agent.Nom} {f.Agent.Prenom}" : "",
                        ChefCentre = f.ChefCentre != null ? f.ChefCentre.Nom : "",
                        TypeFormation = f.TypeFormation != null ? f.TypeFormation.Libelle : "",
                        f.Matiere,
                        f.DateDebut,
                        f.DateFin,
                        f.ValideParFormateur,
                        f.PremierAnimateur,
                        f.DeuxiemeAnimateur,
                        f.ValideCHEH,
                        f.DateValidation,
                        f.CCTId,
                        f.AgentId,
                        f.ChefCentreId,
                        f.TypeFormationId
                    })
                    .ToListAsync();

                var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

                return Ok(new
                {
                    formations,
                    pagination = new
                    {
                        totalCount,
                        pageCount,
                        currentPage = page,
                        pageSize
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération des formations", error = ex.Message });
            }
        }

        // GET: api/Formations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetFormation(int id)
        {
            try
            {
                var formation = await _context.Formations
                    .Include(f => f.CCT)
                    .Include(f => f.Agent)
                    .Include(f => f.ChefCentre)
                    .Include(f => f.TypeFormation)
                    .FirstOrDefaultAsync(f => f.Id == id);

                if (formation == null)
                {
                    return NotFound(new { message = "Formation non trouvée" });
                }

                // Gérer les cas où les propriétés de navigation peuvent être null
                string cctName = "";
                string agentName = "";
                string chefCentreName = "";
                string typeFormationName = "";

                try
                {
                    cctName = formation.CCT?.Nom ?? "";
                }
                catch
                {
                    cctName = "";
                }

                try
                {
                    agentName = formation.Agent != null ? $"{formation.Agent.Nom} {formation.Agent.Prenom}" : "";
                }
                catch
                {
                    agentName = "";
                }

                try
                {
                    chefCentreName = formation.ChefCentre?.Nom ?? "";
                }
                catch
                {
                    chefCentreName = "";
                }

                try
                {
                    typeFormationName = formation.TypeFormation?.Libelle ?? "";
                }
                catch
                {
                    typeFormationName = "";
                }

                return Ok(new
                {
                    id = formation.Id,
                    intitule = formation.Intitule ?? "",
                    cct = cctName,
                    agent = agentName,
                    chefCentre = chefCentreName,
                    typeFormation = typeFormationName,
                    matiere = formation.Matiere ?? "",
                    dateDebut = formation.DateDebut,
                    dateFin = formation.DateFin,
                    valideParFormateur = formation.ValideParFormateur,
                    premierAnimateur = formation.PremierAnimateur ?? "",
                    deuxiemeAnimateur = formation.DeuxiemeAnimateur ?? "",
                    valideCHEH = formation.ValideCHEH,
                    valideLe = formation.DateValidation,
                    cctId = formation.CCTId,
                    agentId = formation.AgentId,
                    chefCentreId = formation.ChefCentreId,
                    typeFormationId = formation.TypeFormationId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération de la formation", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

        // POST: api/Formations
        [HttpPost]
        public async Task<ActionResult<object>> CreateFormation([FromBody] Formation formation)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState
                        .Where(x => x.Value.Errors.Count > 0)
                        .ToDictionary(
                            kvp => kvp.Key,
                            kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                        );
                    return BadRequest(new { message = "Erreurs de validation", errors });
                }

                // Vérifier que les IDs de référence existent
                if (formation.CCTId.HasValue)
                {
                    var cctExists = await _context.CCTs.AnyAsync(c => c.Id == formation.CCTId.Value);
                    if (!cctExists)
                    {
                        return BadRequest(new { message = "CCT spécifié n'existe pas" });
                    }
                }

                if (formation.AgentId.HasValue)
                {
                    var agentExists = await _context.Agents.AnyAsync(a => a.Id == formation.AgentId.Value);
                    if (!agentExists)
                    {
                        return BadRequest(new { message = "Agent spécifié n'existe pas" });
                    }
                }

                if (formation.ChefCentreId.HasValue)
                {
                    var chefExists = await _context.ChefCentres.AnyAsync(c => c.Id == formation.ChefCentreId.Value);
                    if (!chefExists)
                    {
                        return BadRequest(new { message = "Chef de centre spécifié n'existe pas" });
                    }
                }

                var typeFormationExists = await _context.TypesFormation.AnyAsync(t => t.Id == formation.TypeFormationId);
                if (!typeFormationExists)
                {
                    return BadRequest(new { message = "Type de formation spécifié n'existe pas" });
                }

                _context.Formations.Add(formation);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetFormation), new { id = formation.Id }, formation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la création de la formation", error = ex.Message });
            }
        }

        // PUT: api/Formations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFormation(int id, [FromBody] Formation formation)
        {
            try
            {
                if (id != formation.Id)
                {
                    return BadRequest(new { message = "L'ID dans l'URL ne correspond pas à l'ID dans le corps de la requête" });
                }

                if (!ModelState.IsValid)
                {
                    var errors = ModelState
                        .Where(x => x.Value.Errors.Count > 0)
                        .ToDictionary(
                            kvp => kvp.Key,
                            kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                        );
                    return BadRequest(new { message = "Erreurs de validation", errors });
                }

                var existingFormation = await _context.Formations.FindAsync(id);
                if (existingFormation == null)
                {
                    return NotFound(new { message = "Formation non trouvée" });
                }

                // Vérifier que les IDs de référence existent
                if (formation.CCTId.HasValue)
                {
                    var cctExists = await _context.CCTs.AnyAsync(c => c.Id == formation.CCTId.Value);
                    if (!cctExists)
                    {
                        return BadRequest(new { message = "CCT spécifié n'existe pas" });
                    }
                }

                if (formation.AgentId.HasValue)
                {
                    var agentExists = await _context.Agents.AnyAsync(a => a.Id == formation.AgentId.Value);
                    if (!agentExists)
                    {
                        return BadRequest(new { message = "Agent spécifié n'existe pas" });
                    }
                }

                if (formation.ChefCentreId.HasValue)
                {
                    var chefExists = await _context.ChefCentres.AnyAsync(c => c.Id == formation.ChefCentreId.Value);
                    if (!chefExists)
                    {
                        return BadRequest(new { message = "Chef de centre spécifié n'existe pas" });
                    }
                }

                var typeFormationExists = await _context.TypesFormation.AnyAsync(t => t.Id == formation.TypeFormationId);
                if (!typeFormationExists)
                {
                    return BadRequest(new { message = "Type de formation spécifié n'existe pas" });
                }

                _context.Entry(existingFormation).CurrentValues.SetValues(formation);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la mise à jour de la formation", error = ex.Message });
            }
        }

        // DELETE: api/Formations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormation(int id)
        {
            try
            {
                var formation = await _context.Formations.FindAsync(id);
                if (formation == null)
                {
                    return NotFound(new { message = "Formation non trouvée" });
                }

                _context.Formations.Remove(formation);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la suppression de la formation", error = ex.Message });
            }
        }

        // GET: api/Formations/types
        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<object>>> GetTypesFormation()
        {
            try
            {
                var types = await _context.TypesFormation
                    .Select(t => new { t.Id, t.Libelle })
                    .ToListAsync();

                return Ok(types);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération des types de formation", error = ex.Message });
            }
        }
    }
} 