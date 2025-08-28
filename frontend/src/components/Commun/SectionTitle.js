import React from 'react';
import { Typography, Box } from '@mui/material';

/**
 * Composant de titre de section avec styles personnalisés
 * @param {string} title - Le titre à afficher
 * @param {string} variant - Le type de titre (section, module, subsection)
 * @param {string} color - Couleur personnalisée (optionnel)
 * @param {object} sx - Styles supplémentaires (optionnel)
 * @param {string} className - Classe CSS personnalisée (optionnel)
 */
const SectionTitle = ({ 
  title, 
  variant = 'section', 
  color, 
  sx = {}, 
  className = '',
  ...props 
}) => {
  // Définition des styles selon le variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'section':
        return {
          color: '#003366',
          fontWeight: 700,
          fontSize: '1.5rem',
          textAlign: 'center',
          marginBottom: '0.5rem',
          paddingBottom: '0.25rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '40px',
        };
      case 'module':
        return {
          color: '#003366',
          fontWeight: 600,
          fontSize: '1.25rem',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
        };
      case 'subsection':
        return {
          color: 'secondary.main',
          fontWeight: 500,
          fontSize: '1.125rem',
          marginBottom: '0.75rem',
          paddingBottom: '0.25rem',
        };
      case 'page':
        return {
          color: 'white',
          fontWeight: 700,
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        };
      default:
        return {
          color: '#003366',
          fontWeight: 600,
          fontSize: '1.25rem',
          marginBottom: '1rem',
        };
    }
  };

  // Styles de base
  const baseStyles = {
    ...getVariantStyles(),
    ...sx,
  };

  // Si une couleur personnalisée est fournie, l'appliquer
  if (color) {
    baseStyles.color = color;
    if (baseStyles.borderBottom && baseStyles.borderBottom !== 'none') {
      baseStyles.borderColor = color;
    }
  }

  // Rendu du titre
  if (variant === 'page') {
    return (
      <Box
        sx={{
          background: 'linear-gradient(135deg, primary.main 0%, secondary.main 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(60, 111, 113, 0.3)',
        }}
      >
        <Typography
          variant="h1"
          sx={baseStyles}
          className={`section-title-page ${className}`}
          {...props}
        >
          {title}
        </Typography>
      </Box>
    );
  }

  return (
    <Typography
      variant={variant === 'section' ? 'h2' : variant === 'module' ? 'h3' : 'h4'}
      sx={baseStyles}
      className={`section-title-${variant} ${className}`}
      {...props}
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;


