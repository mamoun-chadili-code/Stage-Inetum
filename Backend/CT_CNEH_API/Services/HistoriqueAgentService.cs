using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Services
{
    public interface IHistoriqueAgentService
    {
        Task<IEnumerable<HistoriqueAgentDto>> GetAllAsync();
        Task<HistoriqueAgentDto> GetByIdAsync(int id);
        Task<IEnumerable<HistoriqueAgentDto>> GetByAgentIdAsync(int agentId);
        Task<IEnumerable<HistoriqueAgentDto>> GetByCCTIdAsync(int cctId);
        Task<HistoriqueAgentDto> CreateAsync(HistoriqueAgentDto historiqueDto);
        Task<HistoriqueAgentDto> UpdateAsync(int id, HistoriqueAgentDto historiqueDto);
        Task<bool> DeleteAsync(int id);
    }

    public class HistoriqueAgentService : IHistoriqueAgentService
    {
        private readonly ApplicationDbContext _context;

        public HistoriqueAgentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HistoriqueAgentDto>> GetAllAsync()
        {
            var historiques = await _context.HistoriqueAgents
                .Include(h => h.Agent)
                .Include(h => h.CCT)
                .OrderByDescending(h => h.DateDebutAffectation)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueAgentDto
            {
                Id = h.Id,
                AgentId = h.AgentId,
                AgentNom = h.Agent != null ? $"{h.Agent.Prenom} {h.Agent.Nom}" : "Agent inconnu",
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom ?? "CCT inconnu",
                DateDebutAffectation = h.DateDebutAffectation,
                DateFinAffectation = h.DateFinAffectation,
                DateMiseAJour = h.DateMiseAJour,
                IsActive = h.IsActive,
                DateCreation = h.DateCreation
            });
        }

        public async Task<HistoriqueAgentDto> GetByIdAsync(int id)
        {
            var historique = await _context.HistoriqueAgents
                .Include(h => h.Agent)
                .Include(h => h.CCT)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (historique == null) return null;

                                return new HistoriqueAgentDto
                    {
                        Id = historique.Id,
                        AgentId = historique.AgentId,
                        AgentNom = historique.Agent != null ? $"{historique.Agent.Prenom} {historique.Agent.Nom}" : "Agent inconnu",
                        CCTId = historique.CCTId,
                        CCTNom = historique.CCT?.Nom ?? "CCT inconnu",
                        DateDebutAffectation = historique.DateDebutAffectation,
                        DateFinAffectation = historique.DateFinAffectation,
                        DateMiseAJour = historique.DateMiseAJour,
                        IsActive = historique.IsActive,
                        DateCreation = historique.DateCreation
                    };
        }

        public async Task<IEnumerable<HistoriqueAgentDto>> GetByAgentIdAsync(int agentId)
        {
            var historiques = await _context.HistoriqueAgents
                .Include(h => h.Agent)
                .Include(h => h.CCT)
                .Where(h => h.AgentId == agentId)
                .OrderByDescending(h => h.DateDebutAffectation)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueAgentDto
            {
                Id = h.Id,
                AgentId = h.AgentId,
                AgentNom = h.Agent != null ? $"{h.Agent.Prenom} {h.Agent.Nom}" : "Agent inconnu",
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom ?? "CCT inconnu",
                DateDebutAffectation = h.DateDebutAffectation,
                DateFinAffectation = h.DateFinAffectation,
                DateMiseAJour = h.DateMiseAJour,
                IsActive = h.IsActive,
                DateCreation = h.DateCreation
            });
        }

        public async Task<IEnumerable<HistoriqueAgentDto>> GetByCCTIdAsync(int cctId)
        {
            var historiques = await _context.HistoriqueAgents
                .Include(h => h.Agent)
                .Include(h => h.CCT)
                .Where(h => h.CCTId == cctId)
                .OrderByDescending(h => h.DateDebutAffectation)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueAgentDto
            {
                Id = h.Id,
                AgentId = h.AgentId,
                AgentNom = h.Agent != null ? $"{h.Agent.Prenom} {h.Agent.Nom}" : "Agent inconnu",
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom ?? "CCT inconnu",
                DateDebutAffectation = h.DateDebutAffectation,
                DateFinAffectation = h.DateFinAffectation,
                DateMiseAJour = h.DateMiseAJour,
                IsActive = h.IsActive,
                DateCreation = h.DateCreation
            });
        }

        public async Task<HistoriqueAgentDto> CreateAsync(HistoriqueAgentDto historiqueDto)
        {
            var historique = new HistoriqueAgent
            {
                AgentId = historiqueDto.AgentId,
                CCTId = historiqueDto.CCTId,
                DateDebutAffectation = historiqueDto.DateDebutAffectation,
                DateFinAffectation = historiqueDto.DateFinAffectation,
                DateMiseAJour = DateTime.UtcNow,
                IsActive = historiqueDto.IsActive,
                DateCreation = DateTime.UtcNow
            };

            _context.HistoriqueAgents.Add(historique);
            await _context.SaveChangesAsync();

            historiqueDto.Id = historique.Id;
            historiqueDto.DateMiseAJour = historique.DateMiseAJour;
            historiqueDto.DateCreation = historique.DateCreation;
            return historiqueDto;
        }

        public async Task<HistoriqueAgentDto> UpdateAsync(int id, HistoriqueAgentDto historiqueDto)
        {
            var historique = await _context.HistoriqueAgents.FindAsync(id);
            if (historique == null) return null;

            historique.AgentId = historiqueDto.AgentId;
            historique.CCTId = historiqueDto.CCTId;
            historique.DateDebutAffectation = historiqueDto.DateDebutAffectation;
            historique.DateFinAffectation = historiqueDto.DateFinAffectation;
            historique.DateMiseAJour = DateTime.UtcNow;
            historique.IsActive = historiqueDto.IsActive;

            await _context.SaveChangesAsync();
            
            historiqueDto.DateMiseAJour = historique.DateMiseAJour;
            return historiqueDto;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var historique = await _context.HistoriqueAgents.FindAsync(id);
            if (historique == null) return false;

            _context.HistoriqueAgents.Remove(historique);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
