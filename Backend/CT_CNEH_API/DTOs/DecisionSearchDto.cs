using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class DecisionSearchDto
    {
        // Paramètres de pagination
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5; // Changé de 10 à 5

        // Critères de recherche
        public int? ReseauId { get; set; }
        public int? CCTId { get; set; }
        public int? ChefCentreId { get; set; }
        public int? LigneId { get; set; }
        public int? AgentId { get; set; }
        public int? TypeDecisionId { get; set; }
        public int? EntiteTypeId { get; set; }
        public int? EntiteId { get; set; }
        public DateTime? DateReference { get; set; }

        // Validation
        public bool IsValid()
        {
            if (Page < 1) return false;
            if (PageSize < 1 || PageSize > 100) return false;
            if (TypeDecisionId.HasValue && TypeDecisionId.Value < 1) return false;
            if (EntiteTypeId.HasValue && EntiteTypeId.Value < 1) return false;

            return true;
        }

        public List<string> GetValidationErrors()
        {
            var errors = new List<string>();

            if (Page < 1) errors.Add("Page invalide");
            if (PageSize < 1 || PageSize > 100) errors.Add("Taille de page invalide");
            if (TypeDecisionId.HasValue && TypeDecisionId.Value < 1) errors.Add("ID de type de décision invalide");
            if (EntiteTypeId.HasValue && EntiteTypeId.Value < 1) errors.Add("ID de type d'entité invalide");

            return errors;
        }
    }
}
