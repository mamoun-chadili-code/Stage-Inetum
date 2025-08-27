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

        public DbSet<CadreAutorisation> CadreAutorisations { get; set; } = null!;
        public DbSet<Reseau> Reseaux { get; set; } = null!;
        public DbSet<CategorieCCT> CategorieCCTs { get; set; } = null!;
        public DbSet<TypeCTT> TypeCTTs { get; set; } = null!;
        public DbSet<StatutCCT> StatutCCTs { get; set; } = null!;
        public DbSet<StatutAdministratif> StatutAdministratifs { get; set; } = null!;
        public DbSet<CCT> CCTs { get; set; } = null!;
        public DbSet<Agent> Agents { get; set; } = null!;
        public DbSet<ChefCentre> ChefCentres { get; set; } = null!;
        public DbSet<NiveauFormation> NiveauFormations { get; set; } = null!;
        public DbSet<StatutLigne> StatutLignes { get; set; } = null!;
        public DbSet<CategorieLigne> CategorieLignes { get; set; } = null!;
        public DbSet<Categorie> Categories { get; set; } = null!;
        public DbSet<Statut> Statuts { get; set; } = null!;
        public DbSet<Ligne> Lignes { get; set; } = null!;
        public DbSet<CibleFormation> CibleFormations { get; set; } = null!;
        public DbSet<Formation> Formations { get; set; } = null!;
        public DbSet<TypesFormation> TypesFormation { get; set; } = null!;
        public DbSet<TypeEquipement> TypeEquipements { get; set; } = null!;
        public DbSet<StatutEquipement> StatutsEquipement { get; set; } = null!;
        public DbSet<Equipement> Equipements { get; set; } = null!;
        public DbSet<TypeDecision> TypeDecisions { get; set; } = null!;
        public DbSet<TypeEntite> TypeEntites { get; set; } = null!;
        public DbSet<Decision> Decisions { get; set; } = null!;
        public DbSet<HistoriqueCCT> HistoriqueCCTs { get; set; } = null!;
        public DbSet<HistoriqueAffectation> HistoriqueAffectations { get; set; } = null!;
        public DbSet<HistoriqueAgent> HistoriqueAgents { get; set; } = null!;
        public DbSet<HistoriqueChefCentre> HistoriqueChefCentres { get; set; } = null!;
        public DbSet<Logo> Logos { get; set; } = null!;

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

            // Aucune configuration pour Ligne - laisser EF détecter automatiquement

            // Configuration des nouveaux modèles refactorisés
            modelBuilder.Entity<Equipement>()
                .HasOne(e => e.Ligne)
                .WithMany()
                .HasForeignKey(e => e.LigneId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Equipement>()
                .HasOne(e => e.TypeEquipement)
                .WithMany()
                .HasForeignKey(e => e.TypeEquipementId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Formation>()
                .HasOne(f => f.Agent)
                .WithMany(a => a.Formations)
                .HasForeignKey(f => f.AgentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Formation>()
                .HasOne(f => f.TypesFormation)
                .WithMany(tf => tf.Formations)
                .HasForeignKey(f => f.TypeFormationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Formation>()
                .HasOne(f => f.ChefCentre)
                .WithMany(cc => cc.Formations)
                .HasForeignKey(f => f.ChefCentreId)
                .OnDelete(DeleteBehavior.Restrict);

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

            // CONTRAINTES D'UNICITÉ CRITIQUES
            modelBuilder.Entity<Reseau>()
                .HasIndex(r => r.Agrement)
                .IsUnique();

            modelBuilder.Entity<CCT>()
                .HasIndex(c => new { c.Nom, c.VilleId })
                .IsUnique();

            modelBuilder.Entity<Ligne>()
                .HasIndex(l => new { l.CCTId, l.NumeroLigne })
                .IsUnique();

            modelBuilder.Entity<Agent>()
                .HasIndex(a => a.CIN)
                .IsUnique();

            modelBuilder.Entity<ChefCentre>()
                .HasIndex(cc => cc.CIN)
                .IsUnique();

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

            // Configuration pour HistoriqueAffectation
            modelBuilder.Entity<HistoriqueAffectation>()
                .HasOne(h => h.CCT)
                .WithMany()
                .HasForeignKey(h => h.CCTId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuration pour HistoriqueAgent
            modelBuilder.Entity<HistoriqueAgent>()
                .HasOne(h => h.Agent)
                .WithMany()
                .HasForeignKey(h => h.AgentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HistoriqueAgent>()
                .HasOne(h => h.CCT)
                .WithMany()
                .HasForeignKey(h => h.CCTId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HistoriqueChefCentre>()
                .HasOne(h => h.ChefCentre)
                .WithMany()
                .HasForeignKey(h => h.ChefCentreId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HistoriqueChefCentre>()
                .HasOne(h => h.CCT)
                .WithMany()
                .HasForeignKey(h => h.CCTId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuration pour Logo
            modelBuilder.Entity<Logo>()
                .HasOne(l => l.Reseau)
                .WithMany(r => r.Logos)
                .HasForeignKey(l => l.ReseauId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
} 