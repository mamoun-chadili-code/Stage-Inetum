using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class StatutLigne
    {
        public int Id { get; set; }
        
        [StringLength(50)]
        public string? Libelle { get; set; }
        
        [StringLength(50)]
        public string? Code { get; set; }
        
        // Navigation properties
        public virtual ICollection<Ligne> Lignes { get; set; } = new List<Ligne>();
    }
} 