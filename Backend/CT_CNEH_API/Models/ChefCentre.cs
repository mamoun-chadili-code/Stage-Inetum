using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class ChefCentre
    {
        public int Id { get; set; }
        
        [Required]
        public string Nom { get; set; } = string.Empty;
        
        [Required]
        public string Prenom { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string CIN { get; set; } = string.Empty;
        
        public int? CCTId { get; set; }
        
        public string? ReferenceApprobationCNEH { get; set; }
        
        public DateTime? DateApprobationCNEH { get; set; }
        
        [Required]
        public string Tel { get; set; } = string.Empty;
        
        public string? Mail { get; set; }
        
        [Required]
        public string CNSS { get; set; } = string.Empty;
        
        [Required]
        public bool Sexe { get; set; }
        
        public DateTime? DateNaissance { get; set; }
        
        public int? NiveauFormationInitialId { get; set; }
        
        public DateTime? DateAffectationCCT { get; set; }
        
        [Required]
        public int AnneeAutorisation { get; set; }
        
        // Navigation properties
        public virtual CCT? CCT { get; set; }
        public virtual NiveauFormation? NiveauFormationInitial { get; set; }
        public virtual ICollection<Formation> Formations { get; set; } = new List<Formation>();
        public virtual ICollection<HistoriqueAffectation> HistoriqueAffectations { get; set; } = new List<HistoriqueAffectation>();

    }
} 