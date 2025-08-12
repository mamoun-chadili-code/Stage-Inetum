using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class TypeEntite
    {
        public int Id { get; set; }
        
        [StringLength(50)]
        public string? Code { get; set; }
        
        [StringLength(50)]
        public string? Libelle { get; set; }
        
        // Navigation properties
        public virtual ICollection<Descision> Decisions { get; set; } = new List<Descision>();
    }
} 