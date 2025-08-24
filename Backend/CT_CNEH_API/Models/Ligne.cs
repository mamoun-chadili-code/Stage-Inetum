using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    public class Ligne
    {
        public int Id { get; set; }
        
        [Required]
        [Display(Name = "Numéro de ligne")]
        public int NumeroLigne { get; set; }
        
        [Required]
        [Display(Name = "Catégorie")]
        public int CategorieId { get; set; }
        
        [Required]
        [Display(Name = "CCT")]
        public int CCTId { get; set; }
        
        [Required]
        [Display(Name = "Statut")]
        public int StatutId { get; set; }
        
        [Required]
        [Display(Name = "Date de statut")]
        public DateTime DateStatut { get; set; }
        
        public int? DecisionId { get; set; }
        
        public DateTime? DateDecision { get; set; }
        
        [Display(Name = "Année de démarrage")]
        [StringLength(10)]
        public string? AnneeDemarrage { get; set; }
        
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;
        
        public DateTime? DateModification { get; set; }
        
        // Navigation properties - SUPPRIMÉES pour éviter les conflits de mapping
        // public virtual CategorieLigne Categorie { get; set; } = null!;
        // public virtual CCT CCT { get; set; } = null!;
        // public virtual Statut Statut { get; set; } = null!;
        // public virtual Decision? Decision { get; set; }
    }
} 