# 🏗️ ARCHITECTURE DES TYPE ENTITÉS - SYSTÈME CT_CNEH

## **🎯 OBJECTIF DE LA TABLE `[TypeEntites]`**

La table `[TypeEntites]` sert de **référence centralisée** pour tous les modules du système et permet de gérer l'**historique des actions** dans chaque module.

## **🔗 STRUCTURE DE LA TABLE**

### **Modèle C# :**
```csharp
public class TypeEntite
{
    public int Id { get; set; }
    public string? Code { get; set; }        // Code unique de l'entité
    public string? Libelle { get; set; }     // Nom affiché de l'entité
}
```

### **Données de base :**
| Code | Libelle | Description |
|------|---------|-------------|
| `RESEAU` | Réseau | Module de gestion des réseaux |
| `CCT` | CCT | Module de gestion des centres de contrôle du trafic |
| `AGENT` | Agent | Module de gestion des agents |
| `CHEF_CENTRE` | Chef de centre | Module de gestion des chefs de centre |
| `LIGNE` | Ligne | Module de gestion des lignes |
| `EQUIPEMENT` | Équipement | Module de gestion des équipements |
| `FORMATION` | Formation | Module de gestion des formations |
| `DECISION` | Décision | Module de gestion des décisions |

## **🔄 UTILISATION DANS LE SYSTÈME**

### **1. Module Décisions :**
- **Dropdown "Entité concernée"** : Permet de sélectionner le type d'entité sur laquelle porte la décision
- **Historique** : Enregistre quelle entité a été modifiée

### **2. Historique des Modules :**
Chaque module utilisera cette table pour :
- **Identifier le type d'entité** concernée par une action
- **Tracer les modifications** effectuées
- **Générer des rapports** par type d'entité

### **3. Relations Futures :**
```sql
-- Exemple de table d'historique future
CREATE TABLE [HistoriqueActions] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [TypeEntiteId] INT FOREIGN KEY REFERENCES [TypeEntites]([Id]),
    [EntiteId] INT,                    -- ID de l'entité spécifique
    [Action] NVARCHAR(100),            -- Type d'action (Création, Modification, Suppression)
    [DateAction] DATETIME2 DEFAULT GETDATE(),
    [UtilisateurId] INT,               -- Utilisateur qui a effectué l'action
    [Details] NVARCHAR(MAX)            -- Détails de l'action
)
```

## **🚀 ENDPOINTS API**

### **TypeEntitesController :**
- **GET** `/TypeEntites` : Récupère tous les types d'entités
- **GET** `/TypeEntites/{id}` : Récupère un type d'entité par ID

### **Utilisation Frontend :**
```javascript
// Dans decisionService.js
async getEntiteTypes() {
  const response = await api.get('/TypeEntites');
  return response.data; // Retourne [{id, code, libelle}, ...]
}

// Dans le composant Decisions.js
// dropdowns.typesEntite contient maintenant les vraies données
```

## **📊 AVANTAGES DE CETTE ARCHITECTURE**

### **✅ Centralisation :**
- **Une seule source de vérité** pour les types d'entités
- **Cohérence** dans tout le système
- **Maintenance simplifiée**

### **✅ Extensibilité :**
- **Ajout facile** de nouveaux types d'entités
- **Pas de modification** du code existant
- **Évolutivité** du système

### **✅ Traçabilité :**
- **Historique complet** des actions par type d'entité
- **Audit trail** pour la conformité
- **Rapports détaillés** par module

## **🔧 IMPLÉMENTATION ACTUELLE**

### **✅ Backend :**
- ✅ Modèle `TypeEntite` créé
- ✅ Contrôleur `TypeEntitesController` créé
- ✅ Endpoint `/TypeEntites` fonctionnel

### **✅ Frontend :**
- ✅ Service `getEntiteTypes()` corrigé
- ✅ Endpoint `/TypeEntites` utilisé
- ⚠️ Propriété `typesEntite` à ajouter dans `Decisions.js`

### **✅ Base de données :**
- ✅ Script SQL d'insertion créé
- ⚠️ Données à insérer dans la table

## **🎯 PROCHAINES ÉTAPES**

### **1. Exécuter le script SQL :**
```sql
-- Exécuter le script Insert_TypeEntites.sql
-- pour peupler la table avec les données de base
```

### **2. Finaliser le composant Decisions.js :**
```javascript
// Ajouter typesEntite dans l'état et loadDropdowns()
```

### **3. Tester la fonctionnalité :**
- Vérifier que le dropdown "Entité concernée" se charge
- Confirmer que les données s'affichent correctement
- Tester la sélection et la mise à jour des filtres

## **🏆 RÉSULTAT ATTENDU**

Avec cette architecture, le système aura :
- **100% des dropdowns fonctionnels** dans le module Décisions
- **Une base solide** pour l'historique des actions
- **Une architecture extensible** pour les futurs modules
- **Une traçabilité complète** des modifications dans le système

**L'architecture TypeEntites est maintenant en place et prête pour l'historique des modules !** 🚀
