# 🧪 TEST DE LA RECHERCHE TEXTUELLE DANS LE MODULE ÉQUIPEMENTS

## **✅ NOUVELLES FONCTIONNALITÉS AJOUTÉES :**

### **1. Recherche textuelle par CCT**
- ✅ **Champ de saisie** sous le dropdown CCT
- ✅ **Placeholder** : "Tapez pour rechercher un CCT..."
- ✅ **Logique** : Recherche par nom de CCT (contient le texte saisi)
- ✅ **Priorité** : Si dropdown sélectionné, ignore le texte

### **2. Recherche textuelle par Ligne**
- ✅ **Champ de saisie** sous le dropdown Ligne
- ✅ **Placeholder** : "Tapez pour rechercher une ligne..."
- ✅ **Logique** : Recherche par numéro de ligne (contient le texte saisi)
- ✅ **Priorité** : Si dropdown sélectionné, ignore le texte

### **3. Interface utilisateur améliorée**
- ✅ **Layout responsive** : Grille adaptative
- ✅ **Indicateurs visuels** : "Ou tapez :" sous chaque dropdown
- ✅ **Synchronisation** : Saisie texte réinitialise le dropdown correspondant

## **🔍 POINTS À VÉRIFIER :**

### **A. Interface utilisateur :**
- [ ] Les champs de saisie textuelle sont visibles sous les dropdowns
- [ ] Les placeholders sont corrects et informatifs
- [ ] L'indicateur "Ou tapez :" est présent
- [ ] Le layout s'adapte correctement à différentes tailles d'écran

### **B. Fonctionnement de la recherche :**
- [ ] **Recherche CCT par texte** : Tapez "Casablanca" → trouve les équipements du CCT Casablanca
- [ ] **Recherche Ligne par texte** : Tapez "5" → trouve les équipements de la ligne 5
- [ ] **Priorité dropdown** : Si CCT sélectionné, le texte CCT est ignoré
- [ ] **Priorité dropdown** : Si Ligne sélectionnée, le texte Ligne est ignoré

### **C. Synchronisation des champs :**
- [ ] Saisir du texte dans CCT → dropdown CCT se vide
- [ ] Saisir du texte dans Ligne → dropdown Ligne se vide
- [ ] Sélectionner un CCT → texte CCT se vide
- [ ] Sélectionner une Ligne → texte Ligne se vide

### **D. API et backend :**
- [ ] Les paramètres `cctText` et `ligneText` sont envoyés à l'API
- [ ] Le backend traite correctement la recherche textuelle
- [ ] Les résultats sont filtrés selon les critères textuels
- [ ] La pagination fonctionne avec la recherche textuelle

## **🚀 COMMENT TESTER :**

### **1. Test de base :**
```bash
# Démarrer le frontend
cd frontend
npm start

# Démarrer le backend  
cd Backend/CT_CNEH_API
dotnet run
```

### **2. Test de la recherche CCT textuelle :**
- [ ] Aller sur le module **Équipements**
- [ ] Dans le champ "Ou tapez :" sous CCT, saisir "Casablanca"
- [ ] Cliquer sur **Rechercher**
- [ ] Vérifier que seuls les équipements du CCT Casablanca s'affichent

### **3. Test de la recherche Ligne textuelle :**
- [ ] Dans le champ "Ou tapez :" sous Ligne, saisir "5"
- [ ] Cliquer sur **Rechercher**
- [ ] Vérifier que seuls les équipements de la ligne 5 s'affichent

### **4. Test de la priorité dropdown :**
- [ ] Sélectionner un CCT dans le dropdown
- [ ] Saisir du texte dans le champ CCT
- [ ] Vérifier que la recherche utilise le dropdown (pas le texte)

### **5. Test de la synchronisation :**
- [ ] Saisir du texte dans un champ
- [ ] Vérifier que le dropdown correspondant se vide
- [ ] Sélectionner une valeur dans le dropdown
- [ ] Vérifier que le champ texte correspondant se vide

## **🐛 PROBLÈMES POTENTIELS :**

### **A. Conflit de recherche :**
- **Symptôme** : Les deux types de recherche (dropdown + texte) s'appliquent en même temps
- **Solution** : Vérifier la logique de priorité dans `loadEquipements()`

### **B. Performance de recherche :**
- **Symptôme** : Recherche lente avec beaucoup de données
- **Solution** : Vérifier les index de base de données sur `CCTs.Nom` et `Lignes.NumeroLigne`

### **C. Sensibilité à la casse :**
- **Symptôme** : "Casablanca" ne trouve pas "casablanca"
- **Solution** : Utiliser `.ToLower()` dans le backend si nécessaire

### **D. Caractères spéciaux :**
- **Symptôme** : Problèmes avec accents, tirets, etc.
- **Solution** : Tester avec différents types de caractères

## **✅ RÉSULTAT ATTENDU :**

Après implémentation, l'utilisateur doit pouvoir :
- ✅ **Rechercher par nom de CCT** en tapant directement (ex: "Casablanca", "Rabat")
- ✅ **Rechercher par numéro de ligne** en tapant directement (ex: "5", "10")
- ✅ **Combiner** recherche textuelle et autres filtres
- ✅ **Bénéficier** d'une interface intuitive avec dropdowns ET champs de saisie

---

**🎯 Objectif** : Offrir une expérience de recherche flexible et intuitive, permettant aux utilisateurs de trouver rapidement les équipements qu'ils cherchent, que ce soit par sélection dans des listes ou par saisie directe de texte.
