using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Services
{
    public interface IDecisionService
    {
        Task<(List<DecisionDto> Decisions, int TotalCount, int TotalPages)> SearchDecisionsAsync(DecisionSearchDto searchDto);
        Task<DecisionDto?> GetDecisionByIdAsync(int id);
        Task<DecisionDto> CreateDecisionAsync(Decision decision);
        Task<DecisionDto> UpdateDecisionAsync(int id, Decision decision);
        Task<bool> DeleteDecisionAsync(int id);
    }

    public class DecisionService : IDecisionService
    {
        private readonly ApplicationDbContext _context;

        public DecisionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(List<DecisionDto> Decisions, int TotalCount, int TotalPages)> SearchDecisionsAsync(DecisionSearchDto searchDto)
        {
            var query = _context.Decisions
                .Include(d => d.Reseau)
                .Include(d => d.CCT)
                .AsQueryable();

            // Appliquer les filtres
            if (searchDto.ReseauId.HasValue)
                query = query.Where(d => d.ReseauId == searchDto.ReseauId);

            if (searchDto.CCTId.HasValue)
                query = query.Where(d => d.CCTId == searchDto.CCTId);

            if (searchDto.TypeDecisionId.HasValue)
                query = query.Where(d => d.TypeDecisionId == searchDto.TypeDecisionId.Value);

            if (searchDto.EntiteTypeId.HasValue)
                query = query.Where(d => d.EntiteTypeId == searchDto.EntiteTypeId.Value);

            if (searchDto.EntiteId.HasValue)
                query = query.Where(d => d.EntiteId == searchDto.EntiteId);

            if (searchDto.DateReference.HasValue)
                query = query.Where(d => d.DateReference.Date == searchDto.DateReference.Value.Date);

            // Compter le total avant pagination
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / searchDto.PageSize);

            // Appliquer la pagination
            var decisionsData = await query
                .OrderByDescending(d => d.DateReference)
                .Skip((searchDto.Page - 1) * searchDto.PageSize)
                .Take(searchDto.PageSize)
                .ToListAsync();

            // Transformer les données avec les noms d'entités
            var decisions = new List<DecisionDto>();
            foreach (var d in decisionsData)
            {
                var entiteNom = await GetEntiteNomAsync(d.EntiteTypeId, d.EntiteId);
                var typeDecision = await _context.TypeDecisions.FindAsync(d.TypeDecisionId);
                var typeEntite = await _context.TypeEntites.FindAsync(d.EntiteTypeId);
                
                decisions.Add(new DecisionDto
                {
                    Id = d.Id,
                    TypeDecisionId = d.TypeDecisionId,
                    TypeDecisionLibelle = typeDecision?.Libelle,
                    EntiteTypeId = d.EntiteTypeId,
                    EntiteTypeLibelle = typeEntite?.Libelle,
                    EntiteId = d.EntiteId,
                    EntiteNom = entiteNom,
                    DateReference = d.DateReference,
                    DateDebut = d.DateDebut,
                    DateFin = d.DateFin,
                    LienDocumentUrl = d.LienDocumentUrl,
                    Montant = d.Montant,
                    Observation = d.Observation,
                    ReseauId = d.ReseauId,
                    ReseauNom = d.Reseau != null ? d.Reseau.Nom : null,
                    CCTId = d.CCTId,
                    CCTNom = d.CCT != null ? d.CCT.Nom : null,
                    CreatedAt = d.CreatedAt,
                    UpdatedAt = d.UpdatedAt
                });
            }

            return (decisions, totalCount, totalPages);
        }

        public async Task<DecisionDto?> GetDecisionByIdAsync(int id)
        {
            var decision = await _context.Decisions
                .Include(d => d.Reseau)
                .Include(d => d.CCT)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (decision == null) return null;

            var typeDecision = await _context.TypeDecisions.FindAsync(decision.TypeDecisionId);
            var typeEntite = await _context.TypeEntites.FindAsync(decision.EntiteTypeId);
            
            return new DecisionDto
            {
                Id = decision.Id,
                TypeDecisionId = decision.TypeDecisionId,
                TypeDecisionLibelle = typeDecision?.Libelle,
                EntiteTypeId = decision.EntiteTypeId,
                EntiteTypeLibelle = typeEntite?.Libelle,
                EntiteId = decision.EntiteId,
                EntiteNom = await GetEntiteNomAsync(decision.EntiteTypeId, decision.EntiteId),
                DateReference = decision.DateReference,
                DateDebut = decision.DateDebut,
                DateFin = decision.DateFin,
                LienDocumentUrl = decision.LienDocumentUrl,
                Montant = decision.Montant,
                Observation = decision.Observation,
                ReseauId = decision.ReseauId,
                ReseauNom = decision.Reseau != null ? decision.Reseau.Nom : null,
                CCTId = decision.CCTId,
                CCTNom = decision.CCT != null ? decision.CCT.Nom : null,
                CreatedAt = decision.CreatedAt,
                UpdatedAt = decision.UpdatedAt
            };
        }

        public async Task<DecisionDto> CreateDecisionAsync(Decision decision)
        {
            decision.CreatedAt = DateTime.Now;

            _context.Decisions.Add(decision);
            await _context.SaveChangesAsync();

            return await GetDecisionByIdAsync(decision.Id) ?? throw new InvalidOperationException("Erreur lors de la création de la décision");
        }

        public async Task<DecisionDto> UpdateDecisionAsync(int id, Decision decisionUpdate)
        {
            var existingDecision = await _context.Decisions.FindAsync(id);
            if (existingDecision == null)
                throw new InvalidOperationException("Décision non trouvée");

            // Mettre à jour les propriétés
            existingDecision.TypeDecisionId = decisionUpdate.TypeDecisionId;
            existingDecision.EntiteTypeId = decisionUpdate.EntiteTypeId;
            existingDecision.EntiteId = decisionUpdate.EntiteId;
            existingDecision.DateReference = decisionUpdate.DateReference;
            existingDecision.DateDebut = decisionUpdate.DateDebut;
            existingDecision.DateFin = decisionUpdate.DateFin;
            existingDecision.LienDocumentUrl = decisionUpdate.LienDocumentUrl;
            existingDecision.Montant = decisionUpdate.Montant;
            existingDecision.Observation = decisionUpdate.Observation;
            existingDecision.ReseauId = decisionUpdate.ReseauId;
            existingDecision.CCTId = decisionUpdate.CCTId;

            existingDecision.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return await GetDecisionByIdAsync(id) ?? throw new InvalidOperationException("Erreur lors de la mise à jour de la décision");
        }

        public async Task<bool> DeleteDecisionAsync(int id)
        {
            var decision = await _context.Decisions.FindAsync(id);
            if (decision == null) return false;

            _context.Decisions.Remove(decision);
            await _context.SaveChangesAsync();

            return true;
        }

        private async Task<string?> GetEntiteNomAsync(int entiteTypeId, int entiteId)
        {
            try
            {
                switch (entiteTypeId)
                {
                    case 1: // RESEAU
                        var reseau = await _context.Reseaux.FindAsync(entiteId);
                        return reseau?.Nom;
                    case 2: // CCT
                        var cct = await _context.CCTs.FindAsync(entiteId);
                        return cct?.Nom;
                    case 3: // AGENT
                        var agent = await _context.Agents.FindAsync(entiteId);
                        return agent != null ? $"{agent.Nom} {agent.Prenom}" : null;
                    case 4: // CHEF_CENTRE
                        var chef = await _context.ChefCentres.FindAsync(entiteId);
                        return chef != null ? $"{chef.Nom} {chef.Prenom}" : null;
                    case 5: // LIGNE
                        return $"Ligne {entiteId}";
                    case 6: // EQUIPEMENT
                        var equipement = await _context.Equipements.FindAsync(entiteId);
                        return equipement != null ? $"{equipement.Marque} {equipement.Modele}" : null;
                    case 7: // FORMATION
                        var formation = await _context.Formations.FindAsync(entiteId);
                        return formation?.Intitule;
                    case 8: // DECISION
                        return "Décision";
                    default:
                        return null;
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
