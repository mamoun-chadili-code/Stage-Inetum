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
  showDescriptions = false
}) {
  // S'assurer que la valeur n'est jamais undefined
  const controlledValue = value || '';

  // Fonction pour obtenir la couleur du statut CAP
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
    
    // Couleurs par défaut pour les autres statuts
    if (text.includes('activité') || text.includes('active')) {
      return '#4caf50';
    } else if (text.includes('inactif')) {
      return '#f44336';
    } else if (text.includes('suspendu')) {
      return '#ff9800';
    } else if (text.includes('fermer') || text.includes('fermé')) {
      return '#9e9e9e';
    }
    return null;
  };

  const handleChange = (event, newValue) => {
    const value = newValue ? getOptionValue(newValue) : '';
    console.log('SearchableSelect - Changement de valeur:', { field: label, value, type: typeof value });
    onChange(value);
  };

  // Trouver l'option sélectionnée pour l'affichage
  const selectedOption = options.find(option => getOptionValue(option) === controlledValue);

  return (
    <FormControl fullWidth={fullWidth} required={required} margin={margin}>
      <Autocomplete
        value={selectedOption || null}
        onChange={handleChange}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option, value) => getOptionValue(option) === getOptionValue(value)}
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
          const hasDescription = option.description && (isStatusField || showDescriptions);

          return (
            <Box component="li" {...props} key={`${getOptionValue(option)}-${statusText}`}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                gap: 0.5,
                width: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {statusColor && (
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: statusColor,
                        flexShrink: 0
                      }}
                    />
                  )}
                  <Box sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {statusText}
                  </Box>
                </Box>
                {hasDescription && (
                  <Box sx={{ 
                    fontSize: '0.75rem', 
                    color: 'text.secondary',
                    ml: 3,
                    fontStyle: 'italic'
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
            
            return (
              <Chip
                {...getTagProps({ index })}
                key={getOptionValue(option)}
                label={statusText}
                icon={statusColor ? (
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: statusColor,
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
          '& .MuiAutocomplete-input': {
            cursor: 'text'
          }
        }}
      />
    </FormControl>
  );
}
