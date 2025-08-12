using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class CibleFormation
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Libelle { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string Code { get; set; } = string.Empty;
        
        // Navigation properties
        public virtual ICollection<LexiqueFormation> LexiqueFormations { get; set; } = new List<LexiqueFormation>();
    }
} 