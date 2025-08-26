using System;

namespace CT_CNEH_API.DTOs
{
    public class HistoriqueCCTDto
    {
        public int Id { get; set; }
        public int CCTId { get; set; }
        public string CCTNom { get; set; }
        public int ReseauId { get; set; }
        public string ReseauNom { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime? DateFin { get; set; }
    }
}
