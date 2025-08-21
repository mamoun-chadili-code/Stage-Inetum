# Données de Test - CT_CNEH_API

Ce dossier contient les scripts pour insérer des données de test complètes dans la base de données du projet CT_CNEH_API.

## 📁 Fichiers disponibles

- **`InsertTestData.sql`** - Script SQL Server principal avec toutes les données de test
- **`ExecuteTestData.ps1`** - Script PowerShell pour exécuter automatiquement le script SQL
- **`README_TEST_DATA.md`** - Ce fichier d'instructions

## 🚀 Comment utiliser

### Option 1: Exécution automatique avec PowerShell (Recommandé)

1. Ouvrez PowerShell en tant qu'administrateur
2. Naviguez vers ce dossier : `cd "C:\Users\[VotreNom]\Desktop\Stage  Inetum\Backend\CT_CNEH_API\Scripts"`
3. Exécutez le script PowerShell :
   ```powershell
   .\ExecuteTestData.ps1
   ```

### Option 2: Exécution manuelle avec SQL Server Management Studio

1. Ouvrez SQL Server Management Studio
2. Connectez-vous à votre instance SQL Server
3. Sélectionnez la base de données `CT_CNEH_DB`
4. Ouvrez le fichier `InsertTestData.sql`
5. Exécutez le script (F5)

### Option 3: Exécution avec sqlcmd

```cmd
sqlcmd -S localhost -d CT_CNEH_DB -i InsertTestData.sql
```

## 📊 Données incluses

Le script insère des données de test complètes pour tous les modules :

### 🌍 Géographie
- **5 Régions** : Casablanca-Settat, Rabat-Salé-Kénitra, Fès-Meknès, Marrakech-Safi, Tanger-Tétouan-Al Hoceima
- **10 Provinces** : Casablanca, Settat, Rabat, Salé, Fès, Meknès, Marrakech, Safi, Tanger, Tétouan
- **10 Villes** : Correspondant aux provinces

### 🏢 Réseaux
- **3 Réseaux** : Transport Plus, Express Maroc, Logistique Pro
- **4 Cadres d'autorisation** : National, Régional, Provincial, Local
- **4 Statuts RC** : Actif, Inactif, En attente, Suspendu

### 🏭 Centres de Contrôle Technique (CCT)
- **3 CCTs** : Casablanca Centre, Rabat Central, Fès Médina
- **4 Catégories CCT** : Principal, Secondaire, Proximité, Spécialisé
- **4 Types CCT** : VL, PL, Mixte, Spécialisé

### 👥 Personnel
- **3 Chefs de Centre** : Ahmed Benali, Fatima Zahra, Karim Mansouri
- **3 Agents** : Mohammed Alaoui, Amina Bennani, Hassan Cherkaoui
- **4 Niveaux de Formation** : Bac, Bac+2, Bac+3, Bac+5
- **5 Statuts Administratifs** : Actif, Inactif, En formation, Suspendu, Retraité

### 📚 Formations
- **4 Types de Formation** : Initiale, Continue, Spécialisée, Sécurité
- **3 Formations** : Contrôle VL, Sécurité routière, Contrôle PL

### 🛤️ Lignes
- **4 Catégories** : Principale, Secondaire, Desserte, Connexion
- **4 Statuts** : En exploitation, En construction, Hors service, En maintenance
- **4 Types de Décision** : Approbation, Rejet, Suspension, Annulation
- **3 Décisions** : Approbation Casablanca-Rabat, Suspension Fès-Meknès, Approbation Tanger-Tétouan
- **3 Lignes** : L001, L002, L003

### 🖥️ Équipements
- **4 Types d'Équipements** : Informatique, Bureau, Technique, Sécurité
- **4 Statuts d'Équipements** : En service, En maintenance, Hors service, En réparation
- **5 Équipements** : Ordinateur portable, Imprimante, Scanner, Caméra, Serveur

### 🔐 Authentification
- **4 Comptes utilisateur** :
  - `admin` / `admin123` - Administrateur principal
  - `chef.casablanca` / `admin123` - Chef de centre Casablanca
  - `chef.rabat` / `admin123` - Chef de centre Rabat
  - `agent.casablanca` / `admin123` - Agent Casablanca

## ⚠️ Précautions

1. **Sauvegarde** : Faites une sauvegarde de votre base de données avant d'exécuter le script
2. **Base vide** : Le script est conçu pour une base de données vide ou avec des tables vides
3. **Permissions** : Assurez-vous d'avoir les droits d'insertion sur toutes les tables
4. **Contraintes** : Le script respecte les contraintes de clés étrangères

## 🔧 Personnalisation

Vous pouvez modifier le script `InsertTestData.sql` pour :
- Ajouter plus de données
- Modifier les valeurs existantes
- Adapter aux besoins spécifiques de votre projet

## 📈 Vérification

Après exécution, le script affiche le nombre d'enregistrements dans chaque table pour vérifier que toutes les données ont été insérées correctement.

## 🚀 Prochaines étapes

Une fois les données de test insérées :

1. **Lancer le backend** : `dotnet run`
2. **Tester les API** : Utiliser Postman ou un autre outil pour tester les endpoints
3. **Tester le frontend** : Lancer l'application React et naviguer dans les différents modules
4. **Vérifier les fonctionnalités** : CRUD, recherche, pagination, etc.

## 🆘 Dépannage

### Erreur de connexion SQL Server
- Vérifiez que SQL Server est démarré
- Vérifiez le nom de l'instance
- Vérifiez les droits d'accès

### Erreur de contrainte de clé étrangère
- Vérifiez que toutes les tables existent
- Vérifiez que les tables sont vides avant l'insertion
- Vérifiez l'ordre d'insertion dans le script

### Erreur de base de données inexistante
- Créez la base de données `CT_CNEH_DB`
- Ou modifiez le nom dans le script PowerShell

## 📞 Support

En cas de problème, vérifiez :
1. Les logs SQL Server
2. Les messages d'erreur du script PowerShell
3. La structure de votre base de données
4. Les permissions utilisateur
