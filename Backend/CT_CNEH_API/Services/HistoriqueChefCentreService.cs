using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Services
{
    public interface IHistoriqueChefCentreService
    {
        Task<IEnumerable<HistoriqueChefCentreDto>> GetByChefCentreAsync(int chefCentreId);
        Task<HistoriqueChefCentreDto> CreateAsync(HistoriqueChefCentre historique);
        Task<bool> DeleteAsync(int id);
    }

    public class HistoriqueChefCentreService : IHistoriqueChefCentreService
    {
        private readonly ApplicationDbContext _context;

        public HistoriqueChefCentreService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HistoriqueChefCentreDto>> GetByChefCentreAsync(int chefCentreId)
        {
            var historiques = await _context.HistoriqueChefCentre
                .Include(h => h.ChefCentre)
                .Include(h => h.CCT)
                .Where(h => h.ChefCentreId == chefCentreId && h.IsActive)
                .OrderByDescending(h => h.DateMiseAJour)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueChefCentreDto
            {
                Id = h.Id,
                ChefCentreId = h.ChefCentreId,
                ChefCentreNom = h.ChefCentre?.Nom ?? string.Empty,
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom ?? string.Empty,
                DateDebutAffectation = h.DateDebutAffectation,
                DateFinAffectation = h.DateFinAffectation,
                DateMiseAJour = h.DateMiseAJour,
                DateCreation = h.DateCreation
            });
        }

        public async Task<HistoriqueChefCentreDto> CreateAsync(HistoriqueChefCentre historique)
        {
            _context.HistoriqueChefCentre.Add(historique);
            await _context.SaveChangesAsync();

            return new HistoriqueChefCentreDto
            {
                Id = historique.Id,
                ChefCentreId = historique.ChefCentreId,
                ChefCentreNom = historique.ChefCentre?.Nom ?? string.Empty,
                CCTId = historique.CCTId,
                CCTNom = historique.CCT?.Nom ?? string.Empty,
                DateDebutAffectation = historique.DateDebutAffectation,
                DateFinAffectation = historique.DateFinAffectation,
                DateMiseAJour = historique.DateMiseAJour,
                DateCreation = historique.DateCreation
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var historique = await _context.HistoriqueChefCentre.FindAsync(id);
            if (historique == null)
                return false;

            historique.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

