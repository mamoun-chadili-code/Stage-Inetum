using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class NiveauFormation
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Libelle { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string Code { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string? Cible { get; set; }
        
        // Navigation properties
        public virtual ICollection<ChefCentre> ChefsCentres { get; set; } = new List<ChefCentre>();
    }
} 