using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CT_CNEH_API.Services
{
    public class LigneService
    {
        private readonly ApplicationDbContext _context;

        public LigneService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LigneDto>> GetAllLignesAsync()
        {
            var lignes = await _context.Lignes
                .Include(l => l.Categorie)
                .Include(l => l.CCT)
                .Include(l => l.Statut)
                .Select(l => new LigneDto
                {
                    Id = l.Id,
                    NumeroLigne = l.NumeroLigne,
                    CategorieId = l.CategorieId,
                    CCTId = l.CCTId,
                    StatutId = l.StatutId,
                    DateStatut = l.DateStatut,
                    DecisionId = l.DecisionId,
                    DateDecision = l.DateDecision,
                    AnneeDemarrage = l.AnneeDemarrage,
                    CategorieNom = l.Categorie.Nom,
                    CCTNom = l.CCT.Nom,
                    StatutNom = l.Statut.Nom,
                    DecisionNom = null
                })
                .ToListAsync();

            return lignes;
        }

        public async Task<LigneDto?> GetLigneByIdAsync(int id)
        {
            var ligne = await _context.Lignes
                .Include(l => l.Categorie)
                .Include(l => l.CCT)
                .Include(l => l.Statut)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (ligne == null)
                return null;

            return new LigneDto
            {
                Id = ligne.Id,
                NumeroLigne = ligne.NumeroLigne,
                CategorieId = ligne.CategorieId,
                CCTId = ligne.CCTId,
                StatutId = ligne.StatutId,
                DateStatut = ligne.DateStatut,
                DecisionId = ligne.DecisionId,
                DateDecision = ligne.DateDecision,
                AnneeDemarrage = ligne.AnneeDemarrage,
                CategorieNom = ligne.Categorie.Nom,
                CCTNom = ligne.CCT.Nom,
                StatutNom = ligne.Statut.Nom,
                DecisionNom = null
            };
        }

        public async Task<(IEnumerable<LigneDto> Lignes, int TotalCount)> SearchLignesAsync(LigneSearchDto searchDto)
        {
            // Validation des paramètres de recherche
            if (searchDto.Page < 1) searchDto.Page = 1;
            if (searchDto.PageSize < 1 || searchDto.PageSize > 100) searchDto.PageSize = 10;
            
            var query = _context.Lignes
                .Include(l => l.Categorie)
                .Include(l => l.CCT)
                .Include(l => l.Statut)
                .AsQueryable();

            // Filtres de recherche
            if (searchDto.RegionId.HasValue)
            {
                query = query.Where(l => l.CCT.RegionId == searchDto.RegionId.Value);
            }

            if (searchDto.VilleId.HasValue)
            {
                query = query.Where(l => l.CCT.VilleId == searchDto.VilleId.Value);
            }

            if (searchDto.ReseauId.HasValue)
            {
                query = query.Where(l => l.CCT.ReseauId == searchDto.ReseauId.Value);
            }

            if (searchDto.CCTId.HasValue)
            {
                query = query.Where(l => l.CCTId == searchDto.CCTId.Value);
            }

            if (searchDto.AnneeDemarrage.HasValue)
            {
                query = query.Where(l => l.AnneeDemarrage == searchDto.AnneeDemarrage.Value);
            }

            if (searchDto.CategorieId.HasValue)
            {
                query = query.Where(l => l.CategorieId == searchDto.CategorieId.Value);
            }

            if (searchDto.StatutId.HasValue)
            {
                query = query.Where(l => l.StatutId == searchDto.StatutId.Value);
            }

            // Recherche textuelle
            if (!string.IsNullOrEmpty(searchDto.SearchTerm))
            {
                var searchTerm = searchDto.SearchTerm.ToLower();
                query = query.Where(l => 
                    l.NumeroLigne.ToString().Contains(searchTerm) ||
                    l.Categorie.Nom.ToLower().Contains(searchTerm) ||
                    l.CCT.Nom.ToLower().Contains(searchTerm) ||
                    l.Statut.Nom.ToLower().Contains(searchTerm)
                );
            }

            // Compter le total avant pagination
            var totalCount = await query.CountAsync();

            // Pagination
            var lignes = await query
                .Skip((searchDto.Page - 1) * searchDto.PageSize)
                .Take(searchDto.PageSize)
                .Select(l => new LigneDto
                {
                    Id = l.Id,
                    NumeroLigne = l.NumeroLigne,
                    CategorieId = l.CategorieId,
                    CCTId = l.CCTId,
                    StatutId = l.StatutId,
                    DateStatut = l.DateStatut,
                    DecisionId = l.DecisionId,
                    DateDecision = l.DateDecision,
                    AnneeDemarrage = l.AnneeDemarrage,
                    CategorieNom = l.Categorie.Nom,
                    CCTNom = l.CCT.Nom,
                    StatutNom = l.Statut.Nom,
                    DecisionNom = null
                })
                .ToListAsync();

            return (lignes, totalCount);
        }

        public async Task<Ligne> CreateLigneAsync(LigneCreateDto dto)
        {
            var ligne = new Ligne
            {
                NumeroLigne = dto.NumeroLigne,
                CategorieId = dto.CategorieId,
                CCTId = dto.CCTId,
                StatutId = dto.StatutId,
                DateStatut = dto.DateStatut,
                DecisionId = dto.DecisionId,
                DateDecision = dto.DateDecision,
                AnneeDemarrage = dto.AnneeDemarrage,
                DateCreation = DateTime.Now
            };

            _context.Lignes.Add(ligne);
            await _context.SaveChangesAsync();
            return ligne;
        }

        public async Task<bool> UpdateLigneAsync(int id, LigneUpdateDto dto)
        {
            var ligne = await _context.Lignes.FindAsync(id);
            
            if (ligne == null)
                return false;

            ligne.NumeroLigne = dto.NumeroLigne;
            ligne.CategorieId = dto.CategorieId;
            ligne.CCTId = dto.CCTId;
            ligne.StatutId = dto.StatutId;
            ligne.DateStatut = dto.DateStatut;
            ligne.DecisionId = dto.DecisionId;
            ligne.DateDecision = dto.DateDecision;
            ligne.AnneeDemarrage = dto.AnneeDemarrage;
            ligne.DateModification = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteLigneAsync(int id)
        {
            var ligne = await _context.Lignes.FindAsync(id);
            
            if (ligne == null)
                return false;

            // Suppression physique
            _context.Lignes.Remove(ligne);

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<LigneDto>> GetLignesByCCTAsync(int cctId)
        {
            var lignes = await _context.Lignes
                .Include(l => l.Categorie)
                .Include(l => l.CCT)
                .Include(l => l.Statut)
                .Where(l => l.CCTId == cctId)
                .Select(l => new LigneDto
                {
                    Id = l.Id,
                    NumeroLigne = l.NumeroLigne,
                    CategorieId = l.CategorieId,
                    CCTId = l.CCTId,
                    StatutId = l.StatutId,
                    DateStatut = l.DateStatut,
                    DecisionId = l.DecisionId,
                    DateDecision = l.DateDecision,
                    AnneeDemarrage = l.AnneeDemarrage,
                    CategorieNom = l.Categorie.Nom,
                    CCTNom = l.CCT.Nom,
                    StatutNom = l.Statut.Nom,
                    DecisionNom = null
                })
                .ToListAsync();

            return lignes;
        }

        public async Task<bool> LigneExistsAsync(int numeroLigne, int cctId, int? excludeId = null)
        {
            var query = _context.Lignes
                .Where(l => l.NumeroLigne == numeroLigne && l.CCTId == cctId);

            if (excludeId.HasValue)
            {
                query = query.Where(l => l.Id != excludeId.Value);
            }

            return await query.AnyAsync();
        }
    }
}
