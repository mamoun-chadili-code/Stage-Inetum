using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Tables principales
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Region> Regions { get; set; } = null!;
        public DbSet<Province> Provinces { get; set; } = null!;
        public DbSet<Ville> Villes { get; set; } = null!;
        public DbSet<StatutRC> StatutRCs { get; set; } = null!;
        public DbSet<CadreAutorisation> CadreAutorisations { get; set; } = null!;
        public DbSet<Reseau> Reseaux { get; set; } = null!;
        public DbSet<CategorieCCT> CategorieCCTs { get; set; } = null!;
        public DbSet<TypeCTT> TypeCTTs { get; set; } = null!;
        public DbSet<StatutAdministratif> StatutAdministratifs { get; set; } = null!;
        public DbSet<CCT> CCTs { get; set; } = null!;
        public DbSet<Agent> Agents { get; set; } = null!;
        public DbSet<ChefCentre> ChefCentres { get; set; } = null!;
        public DbSet<NiveauFormation> NiveauFormations { get; set; } = null!;
        public DbSet<StatutLigne> StatutLignes { get; set; } = null!;
        public DbSet<CategorieLigne> CategorieLignes { get; set; } = null!;
        public DbSet<Ligne> Lignes { get; set; } = null!;
        public DbSet<CibleFormation> CibleFormations { get; set; } = null!;
        // public DbSet<LexiqueFormation> LexiqueFormations { get; set; } = null!;
        public DbSet<Formation> Formations { get; set; } = null!;
        public DbSet<TypeFormation> TypesFormation { get; set; } = null!;
        public DbSet<TypeEquipement> TypeEquipements { get; set; } = null!;
        public DbSet<Equipement> Equipements { get; set; } = null!;
        public DbSet<TypeDecision> TypeDecisions { get; set; } = null!;
        public DbSet<TypeEntite> TypeEntites { get; set; } = null!;
        public DbSet<Descision> Decisions { get; set; } = null!;
        public DbSet<HistoriqueCCT> HistoriqueCCTs { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuration des relations de base avec DeleteBehavior.Restrict pour éviter les cycles
            modelBuilder.Entity<Province>()
                .HasOne(p => p.Region)
                .WithMany(r => r.Provinces)
                .HasForeignKey(p => p.RegionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ville>()
                .HasOne(v => v.Region)
                .WithMany(r => r.Villes)
                .HasForeignKey(v => v.RegionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CCT>()
                .HasOne(c => c.Reseau)
                .WithMany(r => r.CCTs)
                .HasForeignKey(c => c.ReseauId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Agent>()
                .HasOne(a => a.CCT)
                .WithMany(c => c.Agents)
                .HasForeignKey(a => a.CCTId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChefCentre>()
                .HasOne(cc => cc.CCT)
                .WithMany(c => c.ChefsCentres)
                .HasForeignKey(cc => cc.CCTId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ligne>()
                .HasOne(l => l.CCT)
                .WithMany(c => c.Lignes)
                .HasForeignKey(l => l.CCTId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ligne>()
                .HasOne(l => l.TypeLigne)
                .WithMany(cl => cl.Lignes)
                .HasForeignKey(l => l.TypeLigneId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ligne>()
                .HasOne(l => l.Statut)
                .WithMany(sl => sl.Lignes)
                .HasForeignKey(l => l.StatutId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Formation>()
                .HasOne(f => f.Agent)
                .WithMany(a => a.Formations)
                .HasForeignKey(f => f.AgentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Formation>()
                .HasOne(f => f.TypeFormation)
                .WithMany(tf => tf.Formations)
                .HasForeignKey(f => f.TypeFormationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Formation>()
                .HasOne(f => f.ChefCentre)
                .WithMany(cc => cc.Formations)
                .HasForeignKey(f => f.ChefCentreId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Equipement>()
                .HasOne(e => e.Type)
                .WithMany(t => t.Equipements)
                .HasForeignKey(e => e.TypeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Descision>()
                .HasOne(d => d.Type)
                .WithMany(t => t.Decisions)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Descision>()
                .HasOne(d => d.TypeEntite)
                .WithMany(te => te.Decisions)
                .HasForeignKey(d => d.TypeEntiteId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Descision>()
                .HasOne(d => d.CCT)
                .WithMany(c => c.Decisions)
                .HasForeignKey(d => d.CCTId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Descision>()
                .HasOne(d => d.Agent)
                .WithMany(a => a.Decisions)
                .HasForeignKey(d => d.AgentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Descision>()
                .HasOne(d => d.ChefCentre)
                .WithMany(cc => cc.Decisions)
                .HasForeignKey(d => d.ChefCentreId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Descision>()
                .HasOne(d => d.Reseau)
                .WithMany(r => r.Decisions)
                .HasForeignKey(d => d.ReseauId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Descision>()
                .HasOne(d => d.Ligne)
                .WithMany(l => l.Decisions)
                .HasForeignKey(d => d.LigneId)
                .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.Entity<LexiqueFormation>()
            //     .HasOne(lf => lf.CibleFormation)
            //     .WithMany(cf => cf.LexiqueFormations)
            //     .HasForeignKey(lf => lf.CibleFormationId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // Relations pour Reseau
            modelBuilder.Entity<Reseau>()
                .HasOne(r => r.Statut)
                .WithMany()
                .HasForeignKey(r => r.StatutId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reseau>()
                .HasOne(r => r.Ville)
                .WithMany(v => v.Reseaux)
                .HasForeignKey(r => r.VilleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuration des propriétés requises
            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<User>()
                .Property(u => u.PasswordHash)
                .IsRequired();

            modelBuilder.Entity<Reseau>()
                .Property(r => r.Nom)
                .IsRequired()
                .HasMaxLength(100);
            modelBuilder.Entity<CCT>()
                .Property(c => c.Nom)
                .IsRequired()
                .HasMaxLength(100);
            modelBuilder.Entity<Agent>()
                .Property(a => a.Nom)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<ChefCentre>()
                .Property(cc => cc.Nom)
                .IsRequired()
                .HasMaxLength(50);

            // Configuration pour éviter les cycles de clés étrangères
            modelBuilder.Entity<HistoriqueCCT>()
                .HasOne(h => h.CCT)
                .WithMany()
                .HasForeignKey(h => h.CCTId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<HistoriqueCCT>()
                .HasOne(h => h.Reseau)
                .WithMany()
                .HasForeignKey(h => h.ReseauId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
} 