import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  TextField,
  Box,
  Autocomplete,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';

export default function SearchableSelect({
  label,
  value,
  onChange,
  options = [],
  required = false,
  fullWidth = true,
  margin = "dense",
  placeholder = "Rechercher...",
  getOptionLabel = (option) => option.libelle || option.nom || option.toString(),
  getOptionValue = (option) => option.id || option.value || option,
  disabled = false,
  isStatusField = false,
  showDescriptions = false,
  isCategorieField = false
}) {
  // S'assurer que la valeur n'est jamais undefined, mais permettre 0 comme valeur valide
  const controlledValue = value !== undefined && value !== null ? value : '';

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (statusText) => {
    const text = statusText.toLowerCase();
    
    // Couleurs spécifiques pour les statuts CAP
    if (text.includes('cap valide')) {
      return '#4caf50'; // Vert pour valide
    } else if (text.includes('cap en cours')) {
      return '#2196f3'; // Bleu pour en cours
    } else if (text.includes('cap en attente')) {
      return '#ff9800'; // Orange pour en attente
    } else if (text.includes('cap non valide')) {
      return '#f44336'; // Rouge pour non valide
    } else if (text.includes('cap expiré')) {
      return '#9c27b0'; // Violet pour expiré
    } else if (text.includes('cap renouvelé')) {
      return '#00bcd4'; // Cyan pour renouvelé
    } else if (text.includes('cap suspendu')) {
      return '#ff5722'; // Rouge-orange pour suspendu
    } else if (text.includes('cap annulé')) {
      return '#795548'; // Marron pour annulé
    }
    
    // Couleurs spécifiques pour les statuts CCT
    if (text.includes('activité') || text.includes('active')) {
      return '#4caf50'; // Vert
    } else if (text.includes('suspendu')) {
      return '#ff9800'; // Orange
    } else if (text.includes('cours d\'ouverture') || text.includes('ouverture') || text.includes('cours')) {
      return '#87ceeb'; // Bleu ciel
    } else if (text.includes('fermé') || text.includes('definitivement')) {
      return '#f44336'; // Rouge
    } else if (text.includes('attente') || text.includes('agrément')) {
      return '#9e9e9e'; // Gris
    }
    
    return null;
  };

  // Fonction pour obtenir la couleur des catégories
  const getCategorieColor = (categorieText) => {
    const text = (categorieText || '').toLowerCase();
    
    if (text.includes('véhicules légers') || text.includes('vl')) {
      return '#84D189'; // Vert personnalisé pour véhicules légers
    } else if (text.includes('poids lourds') || text.includes('pl')) {
      return '#ED6345'; // Rouge personnalisé pour poids lourds
    } else if (text.includes('motocycles') || text.includes('moto')) {
      return '#90C6DE'; // Bleu personnalisé pour motocycles
    } else if (text.includes('toute catégorie') || text.includes('polyvalente')) {
      return '#ED934E'; // Orange personnalisé pour toute catégorie
    }
    return '#9c27b0'; // Violet par défaut
  };

  const handleChange = (event, newValue) => {
    // Gérer explicitement le cas où aucune option n'est sélectionnée
    if (!newValue) {
      onChange('');
      return;
    }
    
    // Gérer le cas de l'option "Sélectionnez un élément" avec id vide
    if (newValue.id === '') {
      onChange('');
      return;
    }
    
    const value = getOptionValue(newValue);
    console.log('SearchableSelect - Changement de valeur:', { field: label, value, type: typeof value });
    onChange(value);
  };

  // Trouver l'option sélectionnée pour l'affichage
  const selectedOption = options.find(option => getOptionValue(option) === controlledValue);

  return (
    <FormControl fullWidth={fullWidth} required={required} margin={margin} sx={{ width: '100%', minWidth: '100%' }}>
      <Autocomplete
        value={selectedOption || null}
        onChange={handleChange}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option, value) => {
          // Gérer le cas spécial de l'option vide
          if (option.id === '' && value === '') {
            return true;
          }
          // value est la valeur actuelle, pas une option
          return getOptionValue(option) === value;
        }}
        disabled={disabled}
        placeholder={placeholder}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            required={required}
            margin={margin}
          />
        )}
        renderOption={(props, option) => {
          const statusText = getOptionLabel(option);
          const statusColor = isStatusField ? getStatusColor(statusText) : null;
          const categorieColor = isCategorieField ? getCategorieColor(statusText) : null;
          const displayColor = statusColor || categorieColor;
          const hasDescription = option.description && (isStatusField || showDescriptions || isCategorieField);

          return (
            <Box component="li" {...props} key={`${getOptionValue(option)}-${statusText}`}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                gap: 0.5,
                width: '100%',
                minHeight: 'auto',
                padding: '8px 0'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 1,
                  width: '100%'
                }}>
                  {displayColor && (
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: displayColor,
                        flexShrink: 0,
                        mt: 0.5,
                        border: '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}
                    />
                  )}
                  <Box sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '0.95rem',
                    lineHeight: 1.4,
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    flex: 1
                  }}>
                    {statusText}
                  </Box>
                </Box>
                {hasDescription && (
                  <Box sx={{ 
                    fontSize: '0.8rem', 
                    color: 'text.secondary',
                    ml: displayColor ? 3 : 0,
                    fontStyle: 'italic',
                    lineHeight: 1.3,
                    wordBreak: 'break-word',
                    whiteSpace: 'normal'
                  }}>
                    {option.description}
                  </Box>
                )}
              </Box>
            </Box>
          );
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const statusText = getOptionLabel(option);
            const statusColor = isStatusField ? getStatusColor(statusText) : null;
            const categorieColor = isCategorieField ? getCategorieColor(statusText) : null;
            const displayColor = statusColor || categorieColor;
            
            return (
              <Chip
                {...getTagProps({ index })}
                key={getOptionValue(option)}
                label={statusText}
                icon={displayColor ? (
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: displayColor,
                      flexShrink: 0
                    }}
                  />
                ) : undefined}
                sx={{
                  '& .MuiChip-icon': {
                    marginLeft: 1,
                    marginRight: 0
                  }
                }}
              />
            );
          })
        }
        noOptionsText="Aucun résultat trouvé"
        loadingText="Chargement..."
        clearText="Effacer"
        openText="Ouvrir"
        closeText="Fermer"
        sx={{
          width: '100%',
          minWidth: '100%',
          '& .MuiAutocomplete-input': {
            cursor: 'text'
          },
          '& .MuiAutocomplete-popper': {
            '& .MuiPaper-root': {
              minWidth: '800px !important',
              maxWidth: '98vw !important',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12) !important'
            }
          },
          '& .MuiAutocomplete-listbox': {
            '& .MuiAutocomplete-option': {
              whiteSpace: 'normal !important',
              wordBreak: 'break-word !important',
              padding: '12px 16px !important',
              minHeight: 'auto !important',
              borderBottom: '1px solid #f0f0f0'
            },
            '& .MuiAutocomplete-option:hover': {
              backgroundColor: '#f5f5f5'
            }
          },
          '& .MuiOutlinedInput-root': {
            '& .MuiAutocomplete-input': {
              fontSize: '14px',
              lineHeight: 1.5
            }
          }
        }}
      />
    </FormControl>
  );
}
