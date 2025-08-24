using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class CategorieLigne
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        [Display(Name = "Libellé")]
        public string Libelle { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        [Display(Name = "Code")]
        public string Code { get; set; } = string.Empty;
        
        [StringLength(500)]
        [Display(Name = "Description")]
        public string? Description { get; set; }
        
        [Display(Name = "Date de création")]
        public DateTime DateCreation { get; set; } = DateTime.Now;
        
        [Display(Name = "Date de modification")]
        public DateTime DateModification { get; set; } = DateTime.Now;
        
        [Display(Name = "Actif")]
        public bool EstActif { get; set; } = true;
        
        // Navigation properties - SUPPRIMÉE pour éviter les conflits de mapping
        // public virtual ICollection<Ligne> Lignes { get; set; } = new List<Ligne>();
    }
}

