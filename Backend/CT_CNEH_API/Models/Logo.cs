using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Logo
    {
        public int Id { get; set; }
        
        [Required]
        public int ReseauId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string NomFichier { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string TypeMime { get; set; } = string.Empty;
        
        [Required]
        public long TailleFichier { get; set; }
        
        [StringLength(500)]
        public string? CheminStockage { get; set; }
        
        [StringLength(100)]
        public string? AltText { get; set; }
        
        public DateTime DateUpload { get; set; } = DateTime.UtcNow;
        
        public bool IsActive { get; set; } = true;
        
        // Navigation properties
        public virtual Reseau Reseau { get; set; } = null!;
    }
}
