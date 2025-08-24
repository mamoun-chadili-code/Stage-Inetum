using CT_CNEH_API.Data;
using CT_CNEH_API.DTOs;
using CT_CNEH_API.Models;
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
                .OrderBy(l => l.NumeroLigne)
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
                    CategorieNom = _context.CategorieLignes
                        .Where(c => c.Id == l.CategorieId)
                        .Select(c => c.Libelle)
                        .FirstOrDefault() ?? "N/A",
                    CCTNom = _context.CCTs
                        .Where(c => c.Id == l.CCTId)
                        .Select(c => c.Nom)
                        .FirstOrDefault() ?? "N/A",
                    StatutNom = _context.StatutLignes
                        .Where(s => s.Id == l.StatutId)
                        .Select(s => s.Libelle)
                        .FirstOrDefault() ?? "N/A",
                    DecisionNom = null
                })
                .ToListAsync();

            return lignes;
        }

        public async Task<LigneDto?> GetLigneByIdAsync(int id)
        {
            var ligne = await _context.Lignes
                .FirstOrDefaultAsync(l => l.Id == id);

            if (ligne == null)
                return null;

            var categorie = await _context.CategorieLignes
                .FirstOrDefaultAsync(c => c.Id == ligne.CategorieId);
            var cct = await _context.CCTs
                .FirstOrDefaultAsync(c => c.Id == ligne.CCTId);
            var statut = await _context.StatutLignes
                .FirstOrDefaultAsync(s => s.Id == ligne.StatutId);

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
                CategorieNom = categorie?.Libelle ?? "N/A",
                CCTNom = cct?.Nom ?? "N/A",
                StatutNom = statut?.Libelle ?? "N/A",
                DecisionNom = null
            };
        }

        public async Task<(IEnumerable<LigneDto> Lignes, int TotalCount)> SearchLignesAsync(LigneSearchDto searchDto)
        {
            // Validation des paramètres de recherche
            if (searchDto.Page < 1) searchDto.Page = 1;
            if (searchDto.PageSize < 1 || searchDto.PageSize > 100) searchDto.PageSize = 10;
            
            var query = _context.Lignes.AsQueryable();

            // Filtres de recherche
            if (searchDto.RegionId.HasValue)
            {
                query = query.Where(l => _context.CCTs
                    .Where(c => c.Id == l.CCTId && c.RegionId == searchDto.RegionId.Value)
                    .Any());
            }

            if (searchDto.VilleId.HasValue)
            {
                query = query.Where(l => _context.CCTs
                    .Where(c => c.Id == l.CCTId && c.VilleId == searchDto.VilleId.Value)
                    .Any());
            }

            if (searchDto.ReseauId.HasValue)
            {
                query = query.Where(l => _context.CCTs
                    .Where(c => c.Id == l.CCTId && c.ReseauId == searchDto.ReseauId.Value)
                    .Any());
            }

            if (searchDto.CCTId.HasValue)
            {
                query = query.Where(l => l.CCTId == searchDto.CCTId.Value);
            }

            if (!string.IsNullOrEmpty(searchDto.AnneeDemarrage))
            {
                query = query.Where(l => l.AnneeDemarrage == searchDto.AnneeDemarrage);
            }

            if (searchDto.CategorieId.HasValue)
            {
                query = query.Where(l => l.CategorieId == searchDto.CategorieId.Value);
            }

            if (searchDto.StatutId.HasValue)
            {
                query = query.Where(l => l.StatutId == searchDto.StatutId.Value);
            }

            if (!string.IsNullOrEmpty(searchDto.SearchTerm))
            {
                var searchTerm = searchDto.SearchTerm.ToLower();
                query = query.Where(l => 
                    l.NumeroLigne.ToString().Contains(searchTerm) ||
                    _context.CCTs
                        .Where(c => c.Id == l.CCTId && c.Nom.ToLower().Contains(searchTerm))
                        .Any() ||
                    _context.CategorieLignes
                        .Where(c => c.Id == l.CategorieId && c.Libelle.ToLower().Contains(searchTerm))
                        .Any()
                );
            }

            var totalCount = await query.CountAsync();

            var lignes = await query
                .OrderBy(l => l.NumeroLigne)
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
                    CategorieNom = _context.CategorieLignes
                        .Where(c => c.Id == l.CategorieId)
                        .Select(c => c.Libelle)
                        .FirstOrDefault() ?? "N/A",
                    CCTNom = _context.CCTs
                        .Where(c => c.Id == l.CCTId)
                        .Select(c => c.Nom)
                        .FirstOrDefault() ?? "N/A",
                    StatutNom = _context.StatutLignes
                        .Where(s => s.Id == l.StatutId)
                        .Select(s => s.Libelle)
                        .FirstOrDefault() ?? "N/A",
                    DecisionNom = null
                })
                .ToListAsync();

            return (lignes, totalCount);
        }

        public async Task<IEnumerable<LigneDto>> GetLignesByCCTAsync(int cctId)
        {
            var lignes = await _context.Lignes
                .Where(l => l.CCTId == cctId)
                .OrderBy(l => l.NumeroLigne)
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
                    CategorieNom = _context.CategorieLignes
                        .Where(c => c.Id == l.CategorieId)
                        .Select(c => c.Libelle)
                        .FirstOrDefault() ?? "N/A",
                    CCTNom = _context.CCTs
                        .Where(c => c.Id == l.CCTId)
                        .Select(c => c.Nom)
                        .FirstOrDefault() ?? "N/A",
                    StatutNom = _context.StatutLignes
                        .Where(s => s.Id == l.StatutId)
                        .Select(s => s.Libelle)
                        .FirstOrDefault() ?? "N/A",
                    DecisionNom = null
                })
                .ToListAsync();

            return lignes;
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
                DateCreation = DateTime.UtcNow,
                // Valeurs de compatibilité fixes
                CategorieCCTId = 1,
                StatutLigneId = 1
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
            ligne.DateModification = DateTime.UtcNow;
            // Valeurs de compatibilité fixes
            ligne.CategorieCCTId = 1;
            ligne.StatutLigneId = 1;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteLigneAsync(int id)
        {
            var ligne = await _context.Lignes.FindAsync(id);
            if (ligne == null)
                return false;

            _context.Lignes.Remove(ligne);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LigneExistsAsync(int numeroLigne, int cctId, int? excludeId = null)
        {
            if (excludeId.HasValue)
            {
                return await _context.Lignes
                    .AnyAsync(l => l.NumeroLigne == numeroLigne && 
                                   l.CCTId == cctId && 
                                   l.Id != excludeId.Value);
            }

            return await _context.Lignes
                .AnyAsync(l => l.NumeroLigne == numeroLigne && l.CCTId == cctId);
        }
    }
}
