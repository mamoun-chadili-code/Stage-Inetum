using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace CT_CNEH_API.Models
{
    public class HistoriqueCCT
    {
        public int Id { get; set; }

        [Required]
        public int CCTId { get; set; }
        [ForeignKey("CCTId")]
        public virtual CCT CCT { get; set; } = null!;

        [Required]
        public int ReseauId { get; set; }
        [ForeignKey("ReseauId")]
        public virtual Reseau Reseau { get; set; } = null!;

        [Required]
        public DateTime DateDebut { get; set; }
        public DateTime? DateFin { get; set; }
    }
} 