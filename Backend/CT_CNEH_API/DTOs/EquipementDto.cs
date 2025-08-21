using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class EquipementDto
    {
        public int Id { get; set; }
        
        [Required]
        public string Marque { get; set; } = string.Empty;
        
        [Required]
        public string Modele { get; set; } = string.Empty;
        
        [Required]
        public int LigneId { get; set; }
        
        [Required]
        public int TypeEquipementId { get; set; }
        
        public string? Protocole { get; set; }
        
        public string? RefHomologation { get; set; }
        
        public DateTime? DateHomologation { get; set; }
        
        public DateTime? DateMiseService { get; set; }
        
        public DateTime? DateEtalonnage { get; set; }
        
        public DateTime? DateExpirationEtalonnage { get; set; }
        
        // Informations de la ligne
        public string? LigneNom { get; set; }
        public string? LigneCode { get; set; }
        
        // Informations du type d'équipement
        public string? TypeEquipementLibelle { get; set; }
        public string? TypeEquipementDescription { get; set; }
        
        // Informations du statut (si applicable)
        public string? StatutLibelle { get; set; }
        public string? StatutDescription { get; set; }
        
        // Propriétés d'audit
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
