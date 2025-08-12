using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class LexiqueFormation
    {
        public int Id { get; set; }
        
        [Required]
        public string Libelle { get; set; } = string.Empty;
        
        [Required]
        public string Code { get; set; } = string.Empty;
        
        [Required]
        public int NombreHeures { get; set; }
        
        public int CibleFormationId { get; set; }
        
        // Navigation properties
        public virtual CibleFormation CibleFormation { get; set; } = null!;
        public virtual ICollection<Formation> Formations { get; set; } = new List<Formation>();
    }
} 