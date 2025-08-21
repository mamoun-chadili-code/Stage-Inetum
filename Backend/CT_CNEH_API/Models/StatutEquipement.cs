using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class StatutEquipement
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Libelle { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual ICollection<Equipement> Equipements { get; set; } = new List<Equipement>();
    }
}
