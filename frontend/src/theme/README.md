# 🎨 Guide d'Utilisation du Thème Personnalisé

## 📋 Vue d'ensemble

Ce projet utilise un thème Material-UI personnalisé avec une palette de couleurs cohérente et professionnelle. Le thème est appliqué automatiquement à tous les composants Material-UI et peut être étendu avec des classes CSS personnalisées.

## 🎯 Palette de Couleurs

### Couleurs Principales
- **Primary**: `#3C6F71` - Vert-bleu principal (boutons, liens, éléments importants)
- **Secondary**: `#284D63` - Bleu foncé secondaire (éléments secondaires, hover)
- **Accent**: `#709CA7` - Bleu-gris accent (éléments d'accent, boutons secondaires)

### Couleurs Neutres
- **Dark**: `#353535` - Gris très foncé (texte principal)
- **Dark Blue**: `#212E53` - Bleu très foncé (titres, en-têtes)
- **Medium Blue**: `#344D59` - Bleu moyen (sous-titres, texte secondaire)
- **Light Blue**: `#7A90A4` - Bleu clair (bordures, arrière-plans)
- **Very Light Blue**: `#B8CBD0` - Bleu très clair (arrière-plans, hover)
- **Light Gray**: `#D9D9D9` - Gris clair (bordures, séparateurs)
- **White**: `#FFFFFF` - Blanc (arrière-plans, texte sur fond sombre)

### Couleurs Sémantiques
- **Success**: `#4caf50` - Vert (succès, validation)
- **Warning**: `#ff9800` - Orange (avertissement, attention)
- **Error**: `#f44336` - Rouge (erreur, suppression)
- **Info**: `#2196f3` - Bleu (information, détails)

## 🚀 Utilisation

### 1. Composants Material-UI
Le thème est automatiquement appliqué à tous les composants Material-UI :

```jsx
import { Button, TextField, Card } from '@mui/material';

// Utilise automatiquement les couleurs du thème
<Button variant="contained">Bouton Principal</Button>
<TextField label="Champ de texte" />
<Card>Contenu de la carte</Card>
```

### 2. Classes CSS Personnalisées
Utilisez les classes CSS personnalisées pour des éléments spécifiques :

```jsx
// Boutons personnalisés
<button className="custom-button-primary">Bouton Principal</button>
<button className="custom-button-secondary">Bouton Secondaire</button>

// Cartes personnalisées
<div className="custom-card">Contenu personnalisé</div>

// Titres de section
<h2 className="custom-section-title">Titre de Section</h2>
<h3 className="custom-module-title">Titre de Module</h3>
<h4 className="custom-subsection-title">Sous-titre</h4>

// En-tête de page
<div className="custom-page-header">
  <h1>Titre Principal</h1>
  <p>Description de la page</p>
</div>

// Badges personnalisés
<span className="custom-badge custom-badge-success">Succès</span>
<span className="custom-badge custom-badge-warning">Attention</span>
```

### 3. Composant SectionTitle
Utilisez le composant `SectionTitle` pour des titres stylisés automatiquement :

```jsx
import SectionTitle from '../components/Common/SectionTitle';

// Titre de section principal
<SectionTitle title="GESTION DES RÉSEAUX" variant="section" />

// Titre de module
<SectionTitle title="Gestion des Agents" variant="module" />

// Sous-titre
<SectionTitle title="Recherche avancée" variant="subsection" />

// En-tête de page avec fond dégradé
<SectionTitle title="Tableau de Bord" variant="page" />

// Avec couleur personnalisée
<SectionTitle title="Titre Personnalisé" color="#709CA7" />
```

### 3. Variables CSS
Utilisez les variables CSS dans vos composants personnalisés :

```css
.my-component {
  background-color: var(--primary-color);
  color: var(--white);
  border: 1px solid var(--light-gray);
}
```

### 4. Couleurs d'Action
Utilisez les constantes pour les boutons d'action :

```jsx
import { ACTION_COLORS, getActionButtonStyles } from '../constants/actionColors';

// Utilisation directe
<IconButton sx={getActionButtonStyles('DETAILS')}>
  <PrivacyTipIcon />
</IconButton>

// Ou avec les couleurs spécifiques
<IconButton sx={{ color: ACTION_COLORS.EDIT.primary }}>
  <EditIcon />
</IconButton>
```

## 📱 Composants Stylisés

### Titres
- **H1**: Titre principal, couleur primaire, centré
- **H2**: Titre de section, couleur primaire
- **H3**: Titre de module, couleur secondaire
- **H4**: Sous-titre, couleur bleu moyen
- **H5**: Titre mineur, couleur bleu moyen
- **H6**: Titre de détail, couleur primaire

### Boutons
- **Primary**: Fond vert-bleu, texte blanc
- **Secondary**: Fond bleu-gris, texte blanc
- **Outlined**: Bordure colorée, texte coloré
- **Text**: Texte coloré, pas de fond

### Champs de Formulaire
- **Bordure**: Gris clair par défaut
- **Focus**: Bordure verte-bleue avec ombre
- **Hover**: Bordure bleue claire

### Tableaux
- **En-tête**: Fond bleu très clair, texte bleu foncé
- **Lignes**: Fond blanc, bordure grise
- **Hover**: Fond bleu très clair

### Modales
- **En-tête**: Dégradé vert-bleu vers bleu foncé
- **Contenu**: Fond blanc, coins arrondis

### Classes CSS Personnalisées
- **`.custom-section-title`**: Titre de section principal
- **`.custom-module-title`**: Titre de module
- **`.custom-subsection-title`**: Sous-titre
- **`.custom-page-header`**: En-tête de page avec dégradé

## 🎨 Personnalisation

### Ajouter de Nouvelles Couleurs
1. Modifiez le fichier `customTheme.js`
2. Ajoutez la couleur dans l'objet `colors`
3. Appliquez-la dans la palette appropriée

### Créer de Nouvelles Classes CSS
1. Ajoutez la classe dans `globalStyles.css`
2. Utilisez les variables CSS existantes
3. Documentez l'utilisation

### Modifier le Thème
1. Éditez `customTheme.js`
2. Modifiez les composants Material-UI
3. Testez les changements

## 🔧 Bonnes Pratiques

1. **Cohérence**: Utilisez toujours les couleurs du thème
2. **Contraste**: Vérifiez la lisibilité du texte
3. **Accessibilité**: Respectez les standards WCAG
4. **Responsive**: Testez sur différentes tailles d'écran
5. **Performance**: Évitez les styles inline complexes

## 📚 Ressources

- [Documentation Material-UI](https://mui.com/material-ui/customization/theme-components/)
- [Guide des Couleurs](https://mui.com/material-ui/customization/color/)
- [Variables CSS](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties)

## 🐛 Dépannage

### Problèmes Courants
1. **Couleurs non appliquées**: Vérifiez l'import du thème
2. **Styles CSS non chargés**: Vérifiez l'import de `globalStyles.css`
3. **Thème non mis à jour**: Redémarrez l'application

### Vérifications
- [ ] Le thème est importé dans `App.js`
- [ ] `globalStyles.css` est importé
- [ ] Les composants utilisent les bonnes props
- [ ] Les classes CSS sont correctement appliquées
