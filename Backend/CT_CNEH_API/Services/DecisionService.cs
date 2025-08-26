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
                .Include(d => d.ChefCentre)
                .Include(d => d.Ligne)
                .Include(d => d.Agent)
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

            if (searchDto.ChefCentreId.HasValue)
                query = query.Where(d => d.ChefCentreId == searchDto.ChefCentreId);

            if (searchDto.LigneId.HasValue)
                query = query.Where(d => d.LigneId == searchDto.LigneId);

            if (searchDto.AgentId.HasValue)
                query = query.Where(d => d.AgentId == searchDto.AgentId);

            if (searchDto.DateReference.HasValue)
            {
                var searchDate = searchDto.DateReference.Value.Date;
                var nextDay = searchDate.AddDays(1);
                query = query.Where(d => d.DateReference >= searchDate && d.DateReference < nextDay);
                
                // Log pour déboguer
                Console.WriteLine($"🔍 Filtrage par date - Date recherchée: {searchDate:yyyy-MM-dd}");
                Console.WriteLine($"🔍 Filtrage par date - Plage: {searchDate:yyyy-MM-dd} à {nextDay:yyyy-MM-dd}");
            }

            // Log pour déboguer - Afficher les dates des décisions existantes
            var allDecisions = await _context.Decisions.ToListAsync();
            Console.WriteLine($"🔍 Décisions existantes dans la base:");
            foreach (var d in allDecisions)
            {
                Console.WriteLine($"  - ID: {d.Id}, DateReference: {d.DateReference:yyyy-MM-dd HH:mm:ss}");
            }
            
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
                    ChefCentreId = d.ChefCentreId,
                    ChefCentreNom = d.ChefCentre != null ? $"{d.ChefCentre.Nom} {d.ChefCentre.Prenom}" : null,
                    LigneId = d.LigneId,
                    LigneNumero = d.Ligne != null ? d.Ligne.NumeroLigne.ToString() : null,
                    AgentId = d.AgentId,
                    AgentNom = d.Agent != null ? $"{d.Agent.Nom} {d.Agent.Prenom}" : null,
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
                .Include(d => d.ChefCentre)
                .Include(d => d.Ligne)
                .Include(d => d.Agent)
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
                ChefCentreId = decision.ChefCentreId,
                ChefCentreNom = decision.ChefCentre != null ? $"{decision.ChefCentre.Nom} {decision.ChefCentre.Prenom}" : null,
                LigneId = decision.LigneId,
                LigneNumero = decision.Ligne != null ? decision.Ligne.NumeroLigne.ToString() : null,
                AgentId = decision.AgentId,
                                    AgentNom = decision.Agent != null ? $"{decision.Agent.Nom} {decision.Agent.Prenom}" : null,
                CreatedAt = decision.CreatedAt,
                UpdatedAt = decision.UpdatedAt
            };
        }

        public async Task<DecisionDto> CreateDecisionAsync(Decision decision)
        {
            // Log pour déboguer
            Console.WriteLine($"🔍 CreateDecisionAsync - AgentId: {decision.AgentId}");
            Console.WriteLine($"🔍 CreateDecisionAsync - ChefCentreId: {decision.ChefCentreId}");
            Console.WriteLine($"🔍 CreateDecisionAsync - LigneId: {decision.LigneId}");
            Console.WriteLine($"🔍 CreateDecisionAsync - EntiteTypeId: {decision.EntiteTypeId}");
            Console.WriteLine($"🔍 CreateDecisionAsync - EntiteId: {decision.EntiteId}");
            
            // Synchroniser les nouvelles colonnes avec entiteId selon le type
            if (decision.EntiteTypeId == 3 && decision.EntiteId > 0) // AGENT
            {
                decision.AgentId = decision.EntiteId;
                Console.WriteLine($"🔍 Synchronisation - AgentId mis à jour: {decision.AgentId}");
            }
            else if (decision.EntiteTypeId == 4 && decision.EntiteId > 0) // CHEF_CENTRE
            {
                decision.ChefCentreId = decision.EntiteId;
                Console.WriteLine($"🔍 Synchronisation - ChefCentreId mis à jour: {decision.ChefCentreId}");
            }
            else if (decision.EntiteTypeId == 5 && decision.EntiteId > 0) // LIGNE
            {
                decision.LigneId = decision.EntiteId;
                Console.WriteLine($"🔍 Synchronisation - LigneId mis à jour: {decision.LigneId}");
            }
            
            decision.CreatedAt = DateTime.Now;

            _context.Decisions.Add(decision);
            await _context.SaveChangesAsync();

            // Log après sauvegarde
            Console.WriteLine($"🔍 Après sauvegarde - AgentId: {decision.AgentId}");
            Console.WriteLine($"🔍 Après sauvegarde - ChefCentreId: {decision.ChefCentreId}");
            Console.WriteLine($"🔍 Après sauvegarde - LigneId: {decision.LigneId}");

            var result = await GetDecisionByIdAsync(decision.Id) ?? throw new InvalidOperationException("Erreur lors de la création de la décision");
            
            // Log du résultat
            Console.WriteLine($"🔍 Résultat GetDecisionByIdAsync - AgentId: {result.AgentId}");
            Console.WriteLine($"🔍 Résultat GetDecisionByIdAsync - AgentNom: {result.AgentNom}");
            
            return result;
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
            existingDecision.ChefCentreId = decisionUpdate.ChefCentreId;
            existingDecision.LigneId = decisionUpdate.LigneId;
            existingDecision.AgentId = decisionUpdate.AgentId;

            // Synchroniser les nouvelles colonnes avec entiteId selon le type
            if (decisionUpdate.EntiteTypeId == 3 && decisionUpdate.EntiteId > 0) // AGENT
            {
                existingDecision.AgentId = decisionUpdate.EntiteId;
            }
            else if (decisionUpdate.EntiteTypeId == 4 && decisionUpdate.EntiteId > 0) // CHEF_CENTRE
            {
                existingDecision.ChefCentreId = decisionUpdate.EntiteId;
            }
            else if (decisionUpdate.EntiteTypeId == 5 && decisionUpdate.EntiteId > 0) // LIGNE
            {
                existingDecision.LigneId = decisionUpdate.EntiteId;
            }

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
