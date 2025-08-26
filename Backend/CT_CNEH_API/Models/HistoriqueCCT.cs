using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    [Table("HistoriqueCCTs")]
    public class HistoriqueCCT
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CCTId { get; set; }

        [Required]
        public int ReseauId { get; set; }

        [Required]
        public DateTime DateDebut { get; set; }

        public DateTime? DateFin { get; set; }

        // Navigation properties
        [ForeignKey("CCTId")]
        public virtual CCT CCT { get; set; }

        [ForeignKey("ReseauId")]
        public virtual Reseau Reseau { get; set; }
    }
} 