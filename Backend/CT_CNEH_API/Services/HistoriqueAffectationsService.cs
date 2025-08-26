using CT_CNEH_API.Data;
using CT_CNEH_API.DTOs;
using CT_CNEH_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CT_CNEH_API.Services
{
    public interface IHistoriqueAffectationsService
    {
        Task<IEnumerable<HistoriqueAffectationDto>> GetAllAsync();
        Task<HistoriqueAffectationDto> GetByIdAsync(int id);
        Task<IEnumerable<HistoriqueAffectationDto>> GetByAgentIdAsync(int agentId);
        Task<IEnumerable<HistoriqueAffectationDto>> GetByChefCentreIdAsync(int chefCentreId);
        Task<IEnumerable<HistoriqueAffectationDto>> GetByCCTIdAsync(int cctId);
        Task<HistoriqueAffectationDto> CreateAsync(HistoriqueAffectationDto historiqueDto);
        Task<HistoriqueAffectationDto> UpdateAsync(int id, HistoriqueAffectationDto historiqueDto);
        Task<bool> DeleteAsync(int id);
    }

    public class HistoriqueAffectationsService : IHistoriqueAffectationsService
    {
        private readonly ApplicationDbContext _context;

        public HistoriqueAffectationsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HistoriqueAffectationDto>> GetAllAsync()
        {
            var historiques = await _context.HistoriqueAffectations
                .Include(h => h.Agent)
                .Include(h => h.ChefCentre)
                .Include(h => h.CCT)
                .OrderByDescending(h => h.DateAffectation)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueAffectationDto
            {
                Id = h.Id,
                EntiteId = h.EntiteId,
                TypeEntite = h.TypeEntite,
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom,
                DateAffectation = h.DateAffectation,
                DateFinAffectation = h.DateFinAffectation,
                MotifAffectation = h.MotifAffectation,
                MotifFinAffectation = h.MotifFinAffectation,
                IsActive = h.IsActive,
                DateCreation = h.DateCreation,
                AgentId = h.AgentId,
                AgentNom = h.Agent != null ? $"{h.Agent.Prenom} {h.Agent.Nom}" : null,
                ChefCentreId = h.ChefCentreId,
                ChefCentreNom = h.ChefCentre != null ? $"{h.ChefCentre.Prenom} {h.ChefCentre.Nom}" : null
            });
        }

        public async Task<HistoriqueAffectationDto> GetByIdAsync(int id)
        {
            var historique = await _context.HistoriqueAffectations
                .Include(h => h.Agent)
                .Include(h => h.ChefCentre)
                .Include(h => h.CCT)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (historique == null) return null;

            return new HistoriqueAffectationDto
            {
                Id = historique.Id,
                EntiteId = historique.EntiteId,
                TypeEntite = historique.TypeEntite,
                CCTId = historique.CCTId,
                CCTNom = historique.CCT?.Nom,
                DateAffectation = historique.DateAffectation,
                DateFinAffectation = historique.DateFinAffectation,
                MotifAffectation = historique.MotifAffectation,
                MotifFinAffectation = historique.MotifFinAffectation,
                IsActive = historique.IsActive,
                DateCreation = historique.DateCreation,
                AgentId = historique.AgentId,
                AgentNom = historique.Agent != null ? $"{historique.Agent.Prenom} {historique.Agent.Nom}" : null,
                ChefCentreId = historique.ChefCentreId,
                ChefCentreNom = historique.ChefCentre != null ? $"{historique.ChefCentre.Prenom} {historique.ChefCentre.Nom}" : null
            };
        }

        public async Task<IEnumerable<HistoriqueAffectationDto>> GetByAgentIdAsync(int agentId)
        {
            var historiques = await _context.HistoriqueAffectations
                .Include(h => h.Agent)
                .Include(h => h.ChefCentre)
                .Include(h => h.CCT)
                .Where(h => h.AgentId == agentId)
                .OrderByDescending(h => h.DateAffectation)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueAffectationDto
            {
                Id = h.Id,
                EntiteId = h.EntiteId,
                TypeEntite = h.TypeEntite,
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom,
                DateAffectation = h.DateAffectation,
                DateFinAffectation = h.DateFinAffectation,
                MotifAffectation = h.MotifAffectation,
                MotifFinAffectation = h.MotifFinAffectation,
                IsActive = h.IsActive,
                DateCreation = h.DateCreation,
                AgentId = h.AgentId,
                AgentNom = h.Agent != null ? $"{h.Agent.Prenom} {h.Agent.Nom}" : null,
                ChefCentreId = h.ChefCentreId,
                ChefCentreNom = h.ChefCentre != null ? $"{h.ChefCentre.Prenom} {h.ChefCentre.Nom}" : null
            });
        }

        public async Task<IEnumerable<HistoriqueAffectationDto>> GetByChefCentreIdAsync(int chefCentreId)
        {
            var historiques = await _context.HistoriqueAffectations
                .Include(h => h.Agent)
                .Include(h => h.ChefCentre)
                .Include(h => h.CCT)
                .Where(h => h.ChefCentreId == chefCentreId)
                .OrderByDescending(h => h.DateAffectation)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueAffectationDto
            {
                Id = h.Id,
                EntiteId = h.EntiteId,
                TypeEntite = h.TypeEntite,
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom,
                DateAffectation = h.DateAffectation,
                DateFinAffectation = h.DateFinAffectation,
                MotifAffectation = h.MotifAffectation,
                MotifFinAffectation = h.MotifFinAffectation,
                IsActive = h.IsActive,
                DateCreation = h.DateCreation,
                AgentId = h.AgentId,
                AgentNom = h.Agent != null ? $"{h.Agent.Prenom} {h.Agent.Nom}" : null,
                ChefCentreId = h.ChefCentreId,
                ChefCentreNom = h.ChefCentre != null ? $"{h.ChefCentre.Prenom} {h.ChefCentre.Nom}" : null
            });
        }

        public async Task<IEnumerable<HistoriqueAffectationDto>> GetByCCTIdAsync(int cctId)
        {
            var historiques = await _context.HistoriqueAffectations
                .Include(h => h.Agent)
                .Include(h => h.ChefCentre)
                .Include(h => h.CCT)
                .Where(h => h.CCTId == cctId)
                .OrderByDescending(h => h.DateAffectation)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueAffectationDto
            {
                Id = h.Id,
                EntiteId = h.EntiteId,
                TypeEntite = h.TypeEntite,
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom,
                DateAffectation = h.DateAffectation,
                DateFinAffectation = h.DateFinAffectation,
                MotifAffectation = h.MotifAffectation,
                MotifFinAffectation = h.MotifFinAffectation,
                IsActive = h.IsActive,
                DateCreation = h.DateCreation,
                AgentId = h.AgentId,
                AgentNom = h.Agent != null ? $"{h.Agent.Prenom} {h.Agent.Nom}" : null,
                ChefCentreId = h.ChefCentreId,
                ChefCentreNom = h.ChefCentre != null ? $"{h.ChefCentre.Prenom} {h.ChefCentre.Nom}" : null
            });
        }

        public async Task<HistoriqueAffectationDto> CreateAsync(HistoriqueAffectationDto historiqueDto)
        {
            var historique = new HistoriqueAffectation
            {
                EntiteId = historiqueDto.EntiteId,
                TypeEntite = historiqueDto.TypeEntite,
                CCTId = historiqueDto.CCTId,
                DateAffectation = historiqueDto.DateAffectation,
                DateFinAffectation = historiqueDto.DateFinAffectation,
                MotifAffectation = historiqueDto.MotifAffectation,
                MotifFinAffectation = historiqueDto.MotifFinAffectation,
                IsActive = true,
                DateCreation = DateTime.UtcNow,
                AgentId = historiqueDto.AgentId,
                ChefCentreId = historiqueDto.ChefCentreId
            };

            _context.HistoriqueAffectations.Add(historique);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(historique.Id);
        }

        public async Task<HistoriqueAffectationDto> UpdateAsync(int id, HistoriqueAffectationDto historiqueDto)
        {
            var historique = await _context.HistoriqueAffectations.FindAsync(id);
            if (historique == null) return null;

            historique.EntiteId = historiqueDto.EntiteId;
            historique.TypeEntite = historiqueDto.TypeEntite;
            historique.CCTId = historiqueDto.CCTId;
            historique.DateAffectation = historiqueDto.DateAffectation;
            historique.DateFinAffectation = historiqueDto.DateFinAffectation;
            historique.MotifAffectation = historiqueDto.MotifAffectation;
            historique.MotifFinAffectation = historiqueDto.MotifFinAffectation;
            historique.IsActive = historiqueDto.IsActive;
            historique.AgentId = historiqueDto.AgentId;
            historique.ChefCentreId = historiqueDto.ChefCentreId;

            await _context.SaveChangesAsync();

            return await GetByIdAsync(id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var historique = await _context.HistoriqueAffectations.FindAsync(id);
            if (historique == null) return false;

            _context.HistoriqueAffectations.Remove(historique);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
