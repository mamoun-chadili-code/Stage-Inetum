using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class EquipementUpdateDto
    {
        [Required]
        [StringLength(100)]
        public string Marque { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Modele { get; set; } = string.Empty;
        
        [Required]
        public int LigneId { get; set; }
        
        [Required]
        public int TypeEquipementId { get; set; }
        
        [StringLength(200)]
        public string? Protocole { get; set; }
        
        [StringLength(200)]
        public string? RefHomologation { get; set; }
        
        public DateTime? DateHomologation { get; set; }
        
        public DateTime? DateMiseService { get; set; }
        
        public DateTime? DateEtalonnage { get; set; }
        
        public DateTime? DateExpirationEtalonnage { get; set; }
    }
}
