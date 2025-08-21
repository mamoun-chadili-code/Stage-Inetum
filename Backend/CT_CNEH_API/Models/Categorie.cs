using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Categorie
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nom { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        // Navigation properties
        public virtual ICollection<Ligne> Lignes { get; set; } = new List<Ligne>();
    }
}




