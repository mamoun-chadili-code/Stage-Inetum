using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CT_CNEH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/dashboard/stats
        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetDashboardStats()
        {
            try
            {
                var stats = new
                {
                    totalCCTs = await _context.CCTs.CountAsync(),
                    totalAgents = await _context.Agents.CountAsync(),
                    totalChefsCentre = await _context.ChefCentres.CountAsync(),
                    totalLignes = await _context.Lignes.CountAsync(),
                    totalFormations = await _context.Formations.CountAsync(),
                    totalEquipements = await _context.Equipements.CountAsync(),
                    totalDecisions = await _context.Decisions.CountAsync(),
                    totalReseaux = await _context.Reseaux.CountAsync(),
                    lastUpdate = DateTime.UtcNow
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération des statistiques", details = ex.Message });
            }
        }

        // GET: api/dashboard/ccts/count
        [HttpGet("ccts/count")]
        public async Task<ActionResult<object>> GetTotalCCTs()
        {
            try
            {
                var count = await _context.CCTs.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération du nombre de CCTs", details = ex.Message });
            }
        }

        // GET: api/dashboard/agents/count
        [HttpGet("agents/count")]
        public async Task<ActionResult<object>> GetTotalAgents()
        {
            try
            {
                var count = await _context.Agents.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération du nombre d'agents", details = ex.Message });
            }
        }

        // GET: api/dashboard/chefs-centre/count
        [HttpGet("chefs-centre/count")]
        public async Task<ActionResult<object>> GetTotalChefsCentre()
        {
            try
            {
                var count = await _context.ChefCentres.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération du nombre de chefs de centre", details = ex.Message });
            }
        }

        // GET: api/dashboard/lignes/count
        [HttpGet("lignes/count")]
        public async Task<ActionResult<object>> GetTotalLignes()
        {
            try
            {
                var count = await _context.Lignes.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération du nombre de lignes", details = ex.Message });
            }
        }

        // GET: api/dashboard/formations/count
        [HttpGet("formations/count")]
        public async Task<ActionResult<object>> GetTotalFormations()
        {
            try
            {
                var count = await _context.Formations.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération du nombre de formations", details = ex.Message });
            }
        }

        // GET: api/dashboard/equipements/count
        [HttpGet("equipements/count")]
        public async Task<ActionResult<object>> GetTotalEquipements()
        {
            try
            {
                var count = await _context.Equipements.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération du nombre d'équipements", details = ex.Message });
            }
        }

        // GET: api/dashboard/decisions/count
        [HttpGet("decisions/count")]
        public async Task<ActionResult<object>> GetTotalDecisions()
        {
            try
            {
                var count = await _context.Decisions.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération du nombre de décisions", details = ex.Message });
            }
        }

        // GET: api/dashboard/reseaux/count
        [HttpGet("reseaux/count")]
        public async Task<ActionResult<object>> GetTotalReseaux()
        {
            try
            {
                var count = await _context.Reseaux.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération du nombre de réseaux", details = ex.Message });
            }
        }

        // GET: api/dashboard/detailed
        [HttpGet("detailed")]
        public async Task<ActionResult<object>> GetDetailedStats()
        {
            try
            {
                // Statistiques de base
                var basicStats = new
                {
                    totalCCTs = await _context.CCTs.CountAsync(),
                    totalAgents = await _context.Agents.CountAsync(),
                    totalChefsCentre = await _context.ChefCentres.CountAsync(),
                    totalLignes = await _context.Lignes.CountAsync(),
                    totalFormations = await _context.Formations.CountAsync(),
                    totalEquipements = await _context.Equipements.CountAsync(),
                    totalDecisions = await _context.Decisions.CountAsync(),
                    totalReseaux = await _context.Reseaux.CountAsync()
                };

                // Statistiques par statut des agents
                var agentsStatusStats = await _context.Agents
                    .GroupBy(a => a.StatutAdministratif.Libelle)
                    .Select(g => new { StatutAdministratif = g.Key, count = g.Count() })
                    .ToListAsync();

                // Statistiques par statut des CCTs
                var cctsStatusStats = await _context.CCTs
                    .GroupBy(c => c.Statut.Libelle)
                    .Select(g => new { Statut = g.Key, count = g.Count() })
                    .ToListAsync();

                // Statistiques par région (ville)
                var regionStats = await _context.CCTs
                    .GroupBy(c => c.Ville.Nom)
                    .Select(g => new { Ville = g.Key, count = g.Count() })
                    .OrderByDescending(x => x.count)
                    .ToListAsync();

                // Statistiques de performance - décisions par mois (derniers 6 mois)
                var sixMonthsAgo = DateTime.UtcNow.AddMonths(-6);
                var decisionsMonthlyStats = await _context.Decisions
                    .Where(d => d.DateReference >= sixMonthsAgo)
                    .GroupBy(d => new { Month = d.DateReference.Month, Year = d.DateReference.Year })
                    .Select(g => new { 
                        month = $"{g.Key.Year}-{g.Key.Month:D2}", 
                        count = g.Count() 
                    })
                    .OrderBy(x => x.month)
                    .ToListAsync();

                // Statistiques des agents par formation
                var agentsFormationStats = await _context.Formations
                    .Select(f => new
                    {
                        Intitule = f.Intitule,
                        agentCount = _context.Agents.Count(a => a.Formations.Any(form => form.Id == f.Id))
                    })
                    .OrderByDescending(x => x.agentCount)
                    .ToListAsync();

                var detailedStats = new
                {
                    basicStats,
                    statusStats = new
                    {
                        agents = agentsStatusStats,
                        ccts = cctsStatusStats
                    },
                    regionStats,
                    performanceStats = new
                    {
                        decisionsMonthly = decisionsMonthlyStats,
                        agentsFormation = agentsFormationStats
                    },
                    lastUpdate = DateTime.UtcNow
                };

                return Ok(detailedStats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération des statistiques détaillées", details = ex.Message });
            }
        }

        // GET: api/dashboard/real-time
        [HttpGet("real-time")]
        public async Task<ActionResult<object>> GetRealTimeStats()
        {
            try
            {
                var stats = await GetDashboardStats();
                return stats;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erreur lors de la récupération des statistiques en temps réel", details = ex.Message });
            }
        }
    }
}
