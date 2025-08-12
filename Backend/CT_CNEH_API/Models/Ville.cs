using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Ville
    {
        public int Id { get; set; }
        
        [StringLength(50)]
        public string? Nom { get; set; }
        
        [StringLength(50)]
        public string? Code { get; set; }
        
        public int? RegionId { get; set; }
        
        // Navigation properties
        public virtual Region? Region { get; set; }
        public virtual ICollection<Reseau> Reseaux { get; set; } = new List<Reseau>();
        public virtual ICollection<CCT> CCTs { get; set; } = new List<CCT>();
    }
} 