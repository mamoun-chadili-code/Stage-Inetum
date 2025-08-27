// Couleurs cohérentes pour toutes les actions de l'application
export const ACTION_COLORS = {
  // Détails/Consulter - Vert
  DETAILS: {
    primary: '#22780F',
    hover: '#1a5f0c',
    text: 'white'
  },
  
  // Modification/Édition - Orange
  EDIT: {
    primary: '#DF6D14',
    hover: '#c55a0f',
    text: 'white'
  },
  
  // Suppression - Rouge
  DELETE: {
    primary: '#EB0000',
    hover: '#c40000',
    text: 'white'
  },
  
  // Historique - Bleu
  HISTORY: {
    primary: '#0F9DE8',
    hover: '#0d7bc7',
    text: 'white'
  },
  
  // Ajout - Vert clair
  ADD: {
    primary: '#4CAF50',
    hover: '#45a049',
    text: 'white'
  },
  
  // Validation - Vert foncé
  VALIDATE: {
    primary: '#2E7D32',
    hover: '#1b5e20',
    text: 'white'
  },
  
  // Annulation - Gris
  CANCEL: {
    primary: '#757575',
    hover: '#616161',
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
