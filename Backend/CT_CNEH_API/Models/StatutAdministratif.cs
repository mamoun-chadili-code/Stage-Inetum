using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class StatutAdministratif
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Libelle { get; set; } = string.Empty;
        
        [Required]
        [StringLength(10)]
        public string Code { get; set; } = string.Empty;
        
        public DateTime DateCreation { get; set; } = DateTime.Now;
        
        public DateTime DateModification { get; set; } = DateTime.Now;
        
        // Navigation properties
        public virtual ICollection<Agent> Agents { get; set; } = new List<Agent>();
    }
} 