using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AgentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Agents
        [HttpGet]
        public async Task<ActionResult<object>> GetAgents(
            [FromQuery] int? regionId,
            [FromQuery] int? villeId,
            [FromQuery] int? reseauId,
            [FromQuery] int? cctId,
            [FromQuery] DateTime? dateCAP,
            [FromQuery] DateTime? dateExpirationCAP,
            [FromQuery] int? anneeAutorisation,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                var query = _context.Agents
                    .Include(a => a.CCT)
                    .Include(a => a.CategorieCAP)
                    .Include(a => a.StatutAdministratif)
                    .AsQueryable();

                // Appliquer les filtres
                if (regionId.HasValue)
                {
                    query = query.Where(a => a.CCT != null && a.CCT.RegionId == regionId);
                }

                if (villeId.HasValue)
                {
                    query = query.Where(a => a.CCT != null && a.CCT.VilleId == villeId);
                }

                if (reseauId.HasValue)
                {
                    query = query.Where(a => a.CCT != null && a.CCT.ReseauId == reseauId);
                }

                if (cctId.HasValue)
                {
                    query = query.Where(a => a.CCTId == cctId);
                }

                if (dateCAP.HasValue)
                {
                    query = query.Where(a => a.DateCAP == dateCAP);
                }

                if (dateExpirationCAP.HasValue)
                {
                    query = query.Where(a => a.DateExpirationCAP == dateExpirationCAP);
                }

                if (anneeAutorisation.HasValue)
                {
                    query = query.Where(a => a.AnneeAutorisation == anneeAutorisation);
                }

                var totalCount = await query.CountAsync();
                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                var agents = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(a => new AgentDto
                    {
                        Id = a.Id,
                        Nom = a.Nom,
                        Prenom = a.Prenom,
                        CIN = a.CIN,
                        Tel = a.Tel,
                        Mail = a.Mail,
                        CNSS = a.CNSS,
                        CCTId = a.CCTId,
                        CCT = a.CCTId.HasValue ? _context.CCTs
                            .Where(c => c.Id == a.CCTId.Value)
                            .Select(c => c.Nom)
                            .FirstOrDefault() : null,
                        // Ajouter Ville et Réseau via CCT
                        Ville = a.CCTId.HasValue ? _context.CCTs
                            .Where(c => c.Id == a.CCTId.Value)
                            .Select(c => c.Ville.Nom)
                            .FirstOrDefault() : null,
                        Reseau = a.CCTId.HasValue ? _context.CCTs
                            .Where(c => c.Id == a.CCTId.Value)
                            .Select(c => c.Reseau.Nom)
                            .FirstOrDefault() : null,
                        NumeroCAP = a.NumeroCAP,
                        DateCAP = a.DateCAP,
                        DateExpirationCAP = a.DateExpirationCAP,
                        CategorieCAPId = a.CategorieCAPId,
                        CategorieCAP = a.CategorieCAPId.HasValue ? _context.CategorieCCTs
                            .Where(cat => cat.Id == a.CategorieCAPId.Value)
                            .Select(cat => cat.Libelle)
                            .FirstOrDefault() : null,
                        StatutAdministratifId = a.StatutAdministratifId,
                        StatutAdministratif = _context.StatutAdministratifs
                            .Where(s => s.Id == a.StatutAdministratifId)
                            .Select(s => s.Libelle)
                            .FirstOrDefault(),
                        AnneeAutorisation = a.AnneeAutorisation,
                        DateAffectationCCT = a.DateAffectationCCT,
                        NumDecisionRenouv = a.NumDecisionRenouv,
                        DateDecisionRenouv = a.DateDecisionRenouv,
                        Adresse = a.Adresse
                    })
                    .ToListAsync();

                return Ok(new
                {
                    data = agents,
                    pagination = new
                    {
                        totalCount,
                        pageCount = totalPages,
                        currentPage = page,
                        pageSize
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération des agents", error = ex.Message });
            }
        }

        // GET: api/Agents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AgentDto>> GetAgent(int id)
        {
            try
            {
                // Récupérer l'agent avec ses relations incluant Ville et Réseau via CCT
                var agent = await _context.Agents
                    .Include(a => a.CCT)
                    .ThenInclude(cct => cct.Ville)
                    .Include(a => a.CCT)
                    .ThenInclude(cct => cct.Reseau)
                    .Where(a => a.Id == id)
                    .Select(a => new AgentDto
                    {
                        Id = a.Id,
                        Nom = a.Nom,
                        Prenom = a.Prenom,
                        CIN = a.CIN,
                        Tel = a.Tel,
                        Mail = a.Mail,
                        CNSS = a.CNSS,
                        CCTId = a.CCTId,
                        CCT = a.CCTId.HasValue ? _context.CCTs
                            .Where(c => c.Id == a.CCTId.Value)
                            .Select(c => c.Nom)
                            .FirstOrDefault() : null,
                        // Ajouter Ville et Réseau via CCT
                        Ville = a.CCTId.HasValue ? _context.CCTs
                            .Where(c => c.Id == a.CCTId.Value)
                            .Select(c => c.Ville.Nom)
                            .FirstOrDefault() : null,
                        Reseau = a.CCTId.HasValue ? _context.CCTs
                            .Where(c => c.Id == a.CCTId.Value)
                            .Select(c => c.Reseau.Nom)
                            .FirstOrDefault() : null,
                        NumeroCAP = a.NumeroCAP,
                        DateCAP = a.DateCAP,
                        DateExpirationCAP = a.DateExpirationCAP,
                        CategorieCAPId = a.CategorieCAPId,
                        CategorieCAP = a.CategorieCAPId.HasValue ? _context.CategorieCCTs
                            .Where(cat => cat.Id == a.CategorieCAPId.Value)
                            .Select(cat => cat.Libelle)
                            .FirstOrDefault() : null,
                        StatutAdministratifId = a.StatutAdministratifId,
                        StatutAdministratif = _context.StatutAdministratifs
                            .Where(s => s.Id == a.StatutAdministratifId)
                            .Select(s => s.Libelle)
                            .FirstOrDefault(),
                        AnneeAutorisation = a.AnneeAutorisation,
                        DateAffectationCCT = a.DateAffectationCCT,
                        NumDecisionRenouv = a.NumDecisionRenouv,
                        DateDecisionRenouv = a.DateDecisionRenouv,
                        Adresse = a.Adresse
                    })
                    .FirstOrDefaultAsync();

                if (agent == null)
                {
                    return NotFound(new { message = $"Agent avec ID {id} non trouvé" });
                }

                return Ok(agent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = "Erreur lors de la récupération de l'agent", 
                    error = ex.Message,
                    stackTrace = ex.StackTrace 
                });
            }
        }

        // POST: api/Agents
        [HttpPost]
        public async Task<ActionResult<Agent>> CreateAgent([FromBody] AgentUpdateDto agentDto)
        {
            try
            {
                var agent = new Agent
                {
                    Nom = agentDto.Nom,
                    Prenom = agentDto.Prenom,
                    CIN = agentDto.CIN,
                    Tel = agentDto.Tel,
                    Mail = agentDto.Mail,
                    CNSS = agentDto.CNSS,
                    CCTId = agentDto.CCTId,
                    NumeroCAP = agentDto.NumeroCAP,
                    DateCAP = agentDto.DateCAP,
                    DateExpirationCAP = agentDto.DateExpirationCAP,
                    CategorieCAPId = agentDto.CategorieCAPId,
                    StatutAdministratifId = agentDto.StatutAdministratifId,
                    AnneeAutorisation = agentDto.AnneeAutorisation,
                    DateAffectationCCT = agentDto.DateAffectationCCT,
                    NumDecisionRenouv = agentDto.NumDecisionRenouv,
                    DateDecisionRenouv = agentDto.DateDecisionRenouv,
                    Adresse = agentDto.Adresse
                };

                _context.Agents.Add(agent);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAgent), new { id = agent.Id }, agent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la création de l'agent", error = ex.Message });
            }
        }

        // PUT: api/Agents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAgent(int id, [FromBody] AgentUpdateDto agentDto)
        {
            try
            {
                var agent = await _context.Agents.FindAsync(id);
                if (agent == null)
                {
                    return NotFound();
                }

                agent.Nom = agentDto.Nom;
                agent.Prenom = agentDto.Prenom;
                agent.CIN = agentDto.CIN;
                agent.Tel = agentDto.Tel;
                agent.Mail = agentDto.Mail;
                agent.CNSS = agentDto.CNSS;
                agent.CCTId = agentDto.CCTId;
                agent.NumeroCAP = agentDto.NumeroCAP;
                agent.DateCAP = agentDto.DateCAP;
                agent.DateExpirationCAP = agentDto.DateExpirationCAP;
                agent.CategorieCAPId = agentDto.CategorieCAPId;
                agent.StatutAdministratifId = agentDto.StatutAdministratifId;
                agent.AnneeAutorisation = agentDto.AnneeAutorisation;
                agent.DateAffectationCCT = agentDto.DateAffectationCCT;
                agent.NumDecisionRenouv = agentDto.NumDecisionRenouv;
                agent.DateDecisionRenouv = agentDto.DateDecisionRenouv;
                agent.Adresse = agentDto.Adresse;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la modification de l'agent", error = ex.Message });
            }
        }

        // DELETE: api/Agents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgent(int id)
        {
            try
            {
                var agent = await _context.Agents.FindAsync(id);
                if (agent == null)
                {
                    return NotFound();
                }

                _context.Agents.Remove(agent);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la suppression de l'agent", error = ex.Message });
            }
        }

        // GET: api/Agents/5/historique
        [HttpGet("{id}/historique")]
        public async Task<ActionResult<object>> GetAgentHistorique(int id)
        {
            try
            {
                // Pour l'instant, retourner un historique vide
                // TODO: Implémenter la logique d'historique quand le modèle HistoriqueAgent sera créé
                await Task.CompletedTask;
                
                return Ok(new { historique = new List<object>() });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération de l'historique", error = ex.Message });
            }
        }
    }

    // DTOs
    public class AgentDto
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string CIN { get; set; } = string.Empty;
        public string Tel { get; set; } = string.Empty;
        public string? Mail { get; set; }
        public string? CNSS { get; set; }
        public int? CCTId { get; set; }
        public string? CCT { get; set; }
        public string? Ville { get; set; }
        public string? Reseau { get; set; }
        public string NumeroCAP { get; set; } = string.Empty;
        public DateTime? DateCAP { get; set; }
        public DateTime? DateExpirationCAP { get; set; }
        public int? CategorieCAPId { get; set; }
        public string? CategorieCAP { get; set; }
        public int StatutAdministratifId { get; set; }
        public string? StatutAdministratif { get; set; }
        public int AnneeAutorisation { get; set; }
        public DateTime? DateAffectationCCT { get; set; }
        public string? NumDecisionRenouv { get; set; }
        public DateTime? DateDecisionRenouv { get; set; }
        public string? Adresse { get; set; }
    }

    public class AgentUpdateDto
    {
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string CIN { get; set; } = string.Empty;
        public string Tel { get; set; } = string.Empty;
        public string? Mail { get; set; }
        public string? CNSS { get; set; }
        public int? CCTId { get; set; }
        public string NumeroCAP { get; set; } = string.Empty;
        public DateTime? DateCAP { get; set; }
        public DateTime? DateExpirationCAP { get; set; }
        public int? CategorieCAPId { get; set; }
        public int StatutAdministratifId { get; set; }
        public int AnneeAutorisation { get; set; }
        public DateTime? DateAffectationCCT { get; set; }
        public string? NumDecisionRenouv { get; set; }
        public DateTime? DateDecisionRenouv { get; set; }
        public string? Adresse { get; set; }
    }
} 