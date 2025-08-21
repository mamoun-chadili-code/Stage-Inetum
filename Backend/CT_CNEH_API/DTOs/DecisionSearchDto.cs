using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class DecisionSearchDto
    {
        // Paramètres de pagination
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        // Critères de recherche
        public int? ReseauId { get; set; }
        public int? CCTId { get; set; }
        public string? TypeDecision { get; set; }
        public string? EntiteType { get; set; }
        public int? EntiteId { get; set; }
        public DateTime? DateDecision { get; set; }

        // Validation
        public bool IsValid()
        {
            if (Page < 1) return false;
            if (PageSize < 1 || PageSize > 100) return false;
            if (TypeDecision != null && TypeDecision.Length < 2) return false;
            if (EntiteType != null && EntiteType.Length < 2) return false;

            return true;
        }

        public List<string> GetValidationErrors()
        {
            var errors = new List<string>();

            if (Page < 1) errors.Add("Page invalide");
            if (PageSize < 1 || PageSize > 100) errors.Add("Taille de page invalide");
            if (TypeDecision != null && TypeDecision.Length < 2) errors.Add("Type de décision trop court");
            if (EntiteType != null && EntiteType.Length < 2) errors.Add("Type d'entité trop court");

            return errors;
        }
    }
}
