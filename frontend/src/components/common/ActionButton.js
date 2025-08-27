import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ACTION_BUTTON_STYLES } from '../../constants/actionColors';

/**
 * Composant réutilisable pour les boutons d'action avec couleurs cohérentes sur les icônes
 * @param {string} actionType - Type d'action (details, edit, delete, history, add, validate, cancel)
 * @param {string} title - Titre du tooltip
 * @param {function} onClick - Fonction de clic
 * @param {ReactNode} icon - Icône à afficher
 * @param {object} sx - Styles supplémentaires
 * @param {boolean} disabled - Si le bouton est désactivé
 * @param {string} size - Taille du bouton (small, medium, large)
 */
const ActionButton = ({ 
  actionType, 
  title, 
  onClick, 
  icon, 
  sx = {}, 
  disabled = false,
  size = 'small',
  ...props 
}) => {
  const baseStyles = ACTION_BUTTON_STYLES[actionType] || {};
  
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        size={size}
        sx={{
          ...baseStyles,
          ...sx
        }}
        {...props}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ActionButton;
