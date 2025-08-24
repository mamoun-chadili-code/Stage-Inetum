# 📁 SCRIPTS DE SAUVEGARDE DE LA BASE DE DONNÉES CT_CNEH_DB

## 🎯 Objectif
Ces scripts permettent de sauvegarder complètement votre base de données CT_CNEH_DB avec toutes ses tables et données.

## 📋 Fichiers disponibles

### 1. `SAUVEGARDE_SIMPLE_BACKUP.sql` ⭐ **RECOMMANDÉ**
- **Type** : Sauvegarde complète en fichier .bak
- **Avantages** : Simple, rapide, fichier unique
- **Utilisation** : Sauvegarde de sécurité, restauration complète
- **Format** : Fichier .bak (format natif SQL Server)

### 2. `SAUVEGARDE_COMPLETE_BASE_DONNEES.sql`
- **Type** : Sauvegarde complète + génération de scripts
- **Avantages** : Sauvegarde + scripts INSERT
- **Utilisation** : Sauvegarde complète avec possibilité de recréer les données
- **Format** : Fichier .bak + scripts SQL

### 3. `GENERER_SCRIPTS_INSERT_COMPLETS.sql`
- **Type** : Génération de scripts INSERT uniquement
- **Avantages** : Scripts réutilisables, portables
- **Utilisation** : Migration, partage de données, sauvegarde de données
- **Format** : Scripts SQL INSERT

## 🚀 Comment utiliser

### Option 1 : Sauvegarde simple (RECOMMANDÉE)
```sql
-- Exécuter dans SQL Server Management Studio
-- Ou via sqlcmd
sqlcmd -S localhost -d master -i "SAUVEGARDE_SIMPLE_BACKUP.sql"
```

**Résultat** : Fichier .bak dans `C:\Backup\`

### Option 2 : Sauvegarde complète
```sql
-- Exécuter dans SQL Server Management Studio
-- Ou via sqlcmd
sqlcmd -S localhost -d master -i "SAUVEGARDE_COMPLETE_BASE_DONNEES.sql"
```

**Résultat** : Fichier .bak + scripts INSERT

### Option 3 : Scripts INSERT uniquement
```sql
-- Exécuter dans SQL Server Management Studio
-- Ou via sqlcmd
sqlcmd -S localhost -d CT_CNEH_DB -i "GENERER_SCRIPTS_INSERT_COMPLETS.sql"
```

**Résultat** : Scripts INSERT pour toutes les tables

## 🔄 Comment restaurer

### Restauration depuis un fichier .bak
1. Ouvrir SQL Server Management Studio
2. Clic droit sur "Databases" → "Restore Database"
3. Sélectionner "Device" et choisir le fichier .bak
4. Cliquer sur "OK" pour restaurer

### Restauration depuis des scripts INSERT
1. Créer une nouvelle base de données
2. Exécuter les scripts de création des tables
3. Exécuter les scripts INSERT générés

## 📊 Informations de sauvegarde

### Contenu sauvegardé
- ✅ Toutes les tables de la base
- ✅ Toutes les données (INSERT statements)
- ✅ Structure de la base
- ✅ Index et contraintes
- ✅ Procédures stockées
- ✅ Fonctions
- ✅ Vues

### Tables principales
- **Agents** : Personnel technique
- **ChefCentres** : Responsables des centres
- **CCTs** : Centres de Contrôle Technique
- **Formations** : Sessions de formation
- **Reseaux** : Réseaux de télécommunication
- **Villes** : Villes et localisations
- **Regions** : Régions géographiques
- **Et toutes les autres tables...**

## ⚠️ Précautions

### Avant la sauvegarde
- Vérifier l'espace disque disponible
- S'assurer que la base est accessible
- Vérifier les permissions d'écriture

### Pendant la sauvegarde
- Ne pas interrompre le processus
- Attendre la confirmation de succès
- Vérifier la taille du fichier créé

### Après la sauvegarde
- Tester la restauration sur un serveur de test
- Vérifier l'intégrité des données
- Stocker le fichier de sauvegarde en lieu sûr

## 🕒 Fréquence recommandée

- **Sauvegarde quotidienne** : Pour les bases en production
- **Sauvegarde hebdomadaire** : Pour les bases de développement
- **Sauvegarde avant mise à jour** : Avant toute modification majeure
- **Sauvegarde avant migration** : Avant déplacement de serveur

## 📞 Support

En cas de problème avec la sauvegarde :
1. Vérifier les logs d'erreur SQL Server
2. Contrôler les permissions d'accès
3. Vérifier l'espace disque disponible
4. Consulter la documentation SQL Server

## 🎉 Résultat attendu

Après exécution réussie, vous devriez avoir :
- ✅ Un fichier .bak dans `C:\Backup\`
- ✅ Une confirmation de sauvegarde
- ✅ La taille du fichier créé
- ✅ Les instructions de restauration

---

**Date de création** : $(Get-Date)  
**Version** : 1.0  
**Base de données** : CT_CNEH_DB  
**SQL Server** : 2019+
