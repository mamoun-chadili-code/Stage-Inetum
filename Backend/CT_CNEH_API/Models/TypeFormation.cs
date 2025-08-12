using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class TypeFormation
    {
        public int Id { get; set; }
        
        [Required]
        public string Libelle { get; set; } = string.Empty;
        
        // Navigation properties
        public virtual ICollection<Formation> Formations { get; set; } = new List<Formation>();
    }
} 