using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Statut
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nom { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        // Navigation properties - SUPPRIMÉE pour éviter les conflits de mapping
        // public virtual ICollection<Ligne> Lignes { get; set; } = new List<Ligne>();
    }
}






