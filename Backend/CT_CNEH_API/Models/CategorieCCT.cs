using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class CategorieCCT
    {
        public int Id { get; set; }
        
        [StringLength(50)]
        public string? Libelle { get; set; }
        
        [StringLength(50)]
        public string? Code { get; set; }
        
        // Navigation properties
        public virtual ICollection<CCT> CCTs { get; set; } = new List<CCT>();
        public virtual ICollection<Ligne> Lignes { get; set; } = new List<Ligne>();
        public virtual ICollection<Agent> Agents { get; set; } = new List<Agent>();
    }
} 