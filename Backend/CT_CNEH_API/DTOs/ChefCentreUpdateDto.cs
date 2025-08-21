using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class ChefCentreUpdateDto
    {
        [Required]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nom { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Prenom { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string CIN { get; set; } = string.Empty; // Corrigé : CIN au lieu de Cin
        
        [Required]
        [StringLength(20)]
        public string Tel { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string? Mail { get; set; } // Corrigé : Mail au lieu de Email
        
        [Required]
        [StringLength(50)]
        public string CNSS { get; set; } = string.Empty;
        
        [Required]
        public bool Sexe { get; set; } // Corrigé : Sexe au lieu de Genre
        
        public DateTime? DateNaissance { get; set; }
        
        public int? NiveauFormationInitialId { get; set; }
        
        public DateTime? DateAffectationCCT { get; set; }
        
        [Required]
        public int AnneeAutorisation { get; set; }
        
        public string? ReferenceApprobationCNEH { get; set; }
        
        public DateTime? DateApprobationCNEH { get; set; }
        
        // CctId peut être null pour la désassociation
        public int? CCTId { get; set; }
    }
}
