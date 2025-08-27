// Couleurs cohérentes pour toutes les actions de l'application - Utilise la nouvelle palette du thème
export const ACTION_COLORS = {
  // Détails/Consulter - Vert-bleu principal
  DETAILS: {
    primary: '#3C6F71',
    hover: '#284D63',
    text: 'white'
  },
  
  // Modification/Édition - Bleu-gris accent
  EDIT: {
    primary: '#709CA7',
    hover: '#7A90A4',
    text: 'white'
  },
  
  // Suppression - Rouge sémantique
  DELETE: {
    primary: '#f44336',
    hover: '#d32f2f',
    text: 'white'
  },
  
  // Historique - Bleu très clair
  HISTORY: {
    primary: '#B8CBD0',
    hover: '#7A90A4',
    text: '#353535'
  },
  
  // Ajout - Bleu clair
  ADD: {
    primary: '#7A90A4',
    hover: '#709CA7',
    text: 'white'
  },
  
  // Validation - Vert-bleu principal
  VALIDATE: {
    primary: '#3C6F71',
    hover: '#284D63',
    text: 'white'
  },
  
  // Annulation - Gris foncé
  CANCEL: {
    primary: '#353535',
    hover: '#212E53',
    text: 'white'
  }
};

// Fonction utilitaire pour obtenir les styles d'un bouton d'action
export const getActionButtonStyles = (actionType) => {
  const colors = ACTION_COLORS[actionType.toUpperCase()];
  if (!colors) {
    console.warn(`Action type "${actionType}" not found in ACTION_COLORS`);
    return {};
  }
  
  return {
    color: colors.primary,
    '&:hover': { 
      color: colors.hover 
    },
    '&:disabled': {
      color: '#bdbdbd'
    }
  };
};

// Styles prêts à l'emploi pour chaque type d'action
export const ACTION_BUTTON_STYLES = {
  details: getActionButtonStyles('DETAILS'),
  edit: getActionButtonStyles('EDIT'),
  delete: getActionButtonStyles('DELETE'),
  history: getActionButtonStyles('HISTORY'),
  add: getActionButtonStyles('ADD'),
  validate: getActionButtonStyles('VALIDATE'),
  cancel: getActionButtonStyles('CANCEL')
};
