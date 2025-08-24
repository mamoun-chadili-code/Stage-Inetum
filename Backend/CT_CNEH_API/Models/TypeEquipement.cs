using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class TypeEquipement
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Code { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string Libelle { get; set; } = string.Empty;
        
        [Required]
        public bool Etalonnable { get; set; }
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        // Navigation properties
        public virtual ICollection<Equipement> Equipements { get; set; } = new List<Equipement>();
    }
} 