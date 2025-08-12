using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class CategorieLigne
    {
        public int Id { get; set; }
        
        [StringLength(100)]
        public string? Libelle { get; set; }
        
        [StringLength(20)]
        public string? Code { get; set; }
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        // Navigation properties
        public virtual ICollection<Ligne> Lignes { get; set; } = new List<Ligne>();
    }
}

