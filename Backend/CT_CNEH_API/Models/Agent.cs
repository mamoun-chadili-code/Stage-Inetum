using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Agent
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Nom { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string Prenom { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string CIN { get; set; } = string.Empty;
        
        [Required]
        public string Tel { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string? Mail { get; set; }
        
        [StringLength(50)]
        public string? CNSS { get; set; }
        
        public int? CCTId { get; set; }
        
        [Required]
        [StringLength(50)]
        public string NumeroCAP { get; set; } = string.Empty;
        
        public DateTime? DateCAP { get; set; }
        
        public DateTime? DateExpirationCAP { get; set; }
        
        public int? CategorieCAPId { get; set; }
        
        public int StatutAdministratifId { get; set; }
        
        [Required]
        public int AnneeAutorisation { get; set; }
        
        public DateTime? DateAffectationCCT { get; set; }
        
        public string? NumDecisionRenouv { get; set; }
        
        public DateTime? DateDecisionRenouv { get; set; }
        
        [StringLength(50)]
        public string? Adresse { get; set; }
        
        // Navigation properties
        public virtual CCT? CCT { get; set; }
        public virtual CategorieCCT? CategorieCAP { get; set; }
        public virtual StatutAdministratif StatutAdministratif { get; set; } = null!;
        public virtual ICollection<Formation> Formations { get; set; } = new List<Formation>();
        public virtual ICollection<Descision> Decisions { get; set; } = new List<Descision>();
    }
} 