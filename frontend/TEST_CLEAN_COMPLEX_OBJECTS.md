# 🧪 Test de la Fonction cleanComplexObjects

## 🎯 **Objectif du test**

Vérifier que la fonction `cleanComplexObjects` transforme correctement les objets complexes en IDs simples avant l'envoi au backend.

## 🔍 **Test à effectuer**

### **1. Ouvrir la console du navigateur**
- Appuyer sur `F12` ou clic droit → "Inspecter"
- Aller dans l'onglet "Console"

### **2. Modifier un CCT**
- Ouvrir le formulaire de modification d'un CCT
- Cliquer sur "Enregistrer"
- Observer les logs dans la console

### **3. Logs attendus**

#### **Test de la fonction :**
```
=== TEST DE LA FONCTION CLEAN ===
Test cleanComplexObjects: { categorieId: 1, statutId: 2 }
```

#### **Nettoyage des objets complexes :**
```
=== NETTOYAGE DES OBJETS COMPLEXES ===
Données avant nettoyage: { categorie: { id: 1, libelle: "Catégorie A" }, ... }
Type des données: object
Clés des données: ["nom", "agrement", "categorie", "statut", ...]
Champs à traiter: ["categorie", "statut", "reseau", "region", ...]

--- Traitement du champ: categorie ---
Valeur actuelle: { id: 1, libelle: "Catégorie A", code: "CAT_A", ... }
Type: object
Est un objet: true
Est un tableau: false
  ✅ categorie → categorieId: 1

--- Traitement du champ: statut ---
Valeur actuelle: { id: 1, libelle: "Actif", code: "ACT", ... }
Type: object
Est un objet: true
Est un tableau: false
  ✅ statut → statutId: 1

=== DONNÉES APRÈS NETTOYAGE ===
Données nettoyées: { categorieId: 1, statutId: 1, ... }
Clés après nettoyage: ["nom", "agrement", "categorieId", "statutId", ...]
```

## ❌ **Si les logs n'apparaissent pas**

### **Problème possible :**
1. **Fonction non appelée** : La fonction `cleanComplexObjects` n'est pas exécutée
2. **Erreur JavaScript** : Une erreur empêche l'exécution
3. **Données déjà nettoyées** : Les données envoyées ne contiennent pas d'objets complexes

### **Vérifications :**
1. **Vérifier que la fonction est définie :**
   ```javascript
   // Dans la console, taper :
   typeof cleanComplexObjects
   // Doit retourner : "function"
   ```

2. **Vérifier que la fonction est appelée :**
   - Les logs de test doivent apparaître
   - Si non, il y a un problème d'import/export

3. **Vérifier les données envoyées :**
   - Les logs doivent montrer des objets complexes
   - Si non, le problème est ailleurs

## 🔧 **Correction si nécessaire**

### **Si la fonction n'est pas définie :**
- Vérifier l'import dans `cctService.js`
- Vérifier que la fonction est exportée

### **Si la fonction est appelée mais ne fonctionne pas :**
- Vérifier la structure des données
- Vérifier que les objets ont bien une propriété `id`

### **Si les données sont déjà nettoyées :**
- Le problème vient du formulaire
- Vérifier `CCTFormModal.js`

## 📊 **Résultats attendus**

### **Avant nettoyage :**
```javascript
{
  nom: "kaka",
  categorie: { id: 1, libelle: "Catégorie A", ... },
  statut: { id: 1, libelle: "Actif", ... }
}
```

### **Après nettoyage :**
```javascript
{
  nom: "kaka",
  categorieId: 1,
  statutId: 1
}
```

## ✅ **Validation du test**

Le test est réussi si :
1. ✅ Les logs de test apparaissent
2. ✅ Les objets complexes sont transformés en IDs
3. ✅ L'erreur 400 ne se produit plus
4. ✅ La modification du CCT fonctionne

---

*Dernière mise à jour : $(Get-Date)*
