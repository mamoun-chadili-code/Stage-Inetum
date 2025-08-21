using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class LigneDto
    {
        public int Id { get; set; }
        
        [Required]
        public int NumeroLigne { get; set; }
        
        [Required]
        public int CategorieId { get; set; }
        
        [Required]
        public int CCTId { get; set; }
        
        [Required]
        public int StatutId { get; set; }
        
        [Required]
        public DateTime DateStatut { get; set; }
        
        public int? DecisionId { get; set; }
        
        public DateTime? DateDecision { get; set; }
        
        public int? AnneeDemarrage { get; set; }
        
        // Propriétés de navigation pour l'affichage
        public string? CategorieNom { get; set; }
        public string? CCTNom { get; set; }
        public string? StatutNom { get; set; }
        public string? DecisionNom { get; set; }
    }
}
