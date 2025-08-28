import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  Divider,
  CircularProgress
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import SearchableSelect from '../Commun/SearchableSelect';
import dropdownsService from '../../services/dropdownsService';

export default function AgentSearchTest() {
  const [dropdowns, setDropdowns] = useState({});
  const [filters, setFilters] = useState({
    regionId: '',
    villeId: '',
    reseauId: '',
    cctId: '',
    statutAdministratifId: '',
    dateCAP: '',
    dateExpirationCAP: '',
    anneeAutorisation: ''
  });
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger les dropdowns
  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      setLoading(true);
      setTestResults(prev => [...prev, { type: 'info', message: 'Chargement des données...' }]);
      
      const [regions, villes, reseaux, ccts, statuts] = await Promise.all([
        dropdownsService.getRegions(),
        dropdownsService.getVilles(),
        dropdownsService.getReseaux(),
        dropdownsService.getCCTs(),
        dropdownsService.getStatutsAdministratifs()
      ]);

      setDropdowns({
        regions: regions.data || regions,
        villes: villes.data || villes,
        reseaux: reseaux.data || reseaux,
        ccts: ccts.data || ccts,
        statutsAdministratifs: statuts.data || statuts
      });

      setTestResults(prev => [...prev, { type: 'success', message: 'Données chargées avec succès' }]);
    } catch (error) {
      console.error('Erreur loadDropdowns:', error);
      setTestResults(prev => [...prev, { type: 'error', message: `Erreur: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setTestResults(prev => [...prev, { type: 'info', message: `${field}: ${value || 'vide'}` }]);
  };

  const applyFilters = () => {
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value !== '' && value !== null)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    
    setTestResults(prev => [...prev, { 
      type: 'success', 
      message: `Filtres appliqués: ${activeFilters || 'Aucun filtre actif'}` 
    }]);
  };

  const clearFilters = () => {
    setFilters({
      regionId: '',
      villeId: '',
      reseauId: '',
      cctId: '',
      statutAdministratifId: '',
      dateCAP: '',
      dateExpirationCAP: '',
      anneeAutorisation: ''
    });
    setTestResults(prev => [...prev, { type: 'success', message: 'Filtres réinitialisés' }]);
  };

  const testDropdowns = () => {
    setTestResults(prev => [...prev, { type: 'info', message: 'Test des dropdowns...' }]);
    
    if (dropdowns.regions?.length > 0) {
      setTestResults(prev => [...prev, { type: 'success', message: `✅ Régions: ${dropdowns.regions.length} éléments` }]);
    } else {
      setTestResults(prev => [...prev, { type: 'error', message: '❌ Aucune région' }]);
    }

    if (dropdowns.villes?.length > 0) {
      setTestResults(prev => [...prev, { type: 'success', message: `✅ Villes: ${dropdowns.villes.length} éléments` }]);
    } else {
      setTestResults(prev => [...prev, { type: 'error', message: '❌ Aucune ville' }]);
    }

    if (dropdowns.ccts?.length > 0) {
      setTestResults(prev => [...prev, { type: 'success', message: `✅ CCTs: ${dropdowns.ccts.length} éléments` }]);
    } else {
      setTestResults(prev => [...prev, { type: 'error', message: '❌ Aucun CCT' }]);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
        Test de la Partie Recherche - Module Agent
      </Typography>

      {/* Section de test des filtres */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
          Test des Filtres de Recherche
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SearchableSelect
              label="Région"
              value={filters.regionId}
              onChange={(value) => handleFilterChange('regionId', value)}
              options={dropdowns.regions || []}
              placeholder="Rechercher une région..."
              getOptionLabel={(option) => option.libelle}
              getOptionValue={(option) => option.id}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SearchableSelect
              label="Ville"
              value={filters.villeId}
              onChange={(value) => handleFilterChange('villeId', value)}
              options={dropdowns.villes || []}
              placeholder="Rechercher une ville..."
              getOptionLabel={(option) => option.nom}
              getOptionValue={(option) => option.id}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SearchableSelect
              label="Réseau de ralliement"
              value={filters.reseauId}
              onChange={(value) => handleFilterChange('reseauId', value)}
              options={dropdowns.reseaux || []}
              placeholder="Rechercher un réseau..."
              getOptionLabel={(option) => option.nom}
              getOptionValue={(option) => option.id}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SearchableSelect
              label="CCT"
              value={filters.cctId}
              onChange={(value) => handleFilterChange('cctId', value)}
              options={dropdowns.ccts || []}
              placeholder="Rechercher un CCT..."
              getOptionLabel={(option) => option.nom}
              getOptionValue={(option) => option.id}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SearchableSelect
              label="Statut administratif"
              value={filters.statutAdministratifId}
              onChange={(value) => handleFilterChange('statutAdministratifId', value)}
              options={dropdowns.statutsAdministratifs || []}
              placeholder="Rechercher un statut..."
              getOptionLabel={(option) => option.libelle}
              getOptionValue={(option) => option.id}
              isStatusField={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Date CAP"
              type="date"
              value={filters.dateCAP}
              onChange={(e) => handleFilterChange('dateCAP', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Date Expiration CAP"
              type="date"
              value={filters.dateExpirationCAP}
              onChange={(e) => handleFilterChange('dateExpirationCAP', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Année autorisation"
              type="number"
              value={filters.anneeAutorisation}
              onChange={(e) => handleFilterChange('anneeAutorisation', e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={applyFilters}
            sx={{ 
              minWidth: 120, 
              height: 40, 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Rechercher
          </Button>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            sx={{ 
              minWidth: 120, 
              height: 40, 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Annuler
          </Button>
          <Button
            variant="outlined"
            onClick={testDropdowns}
            sx={{ 
              minWidth: 120, 
              height: 40, 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Tester Dropdowns
          </Button>
        </Box>
      </Paper>

      {/* Section des résultats de test */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Résultats des Tests
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setTestResults([])}
          >
            Effacer
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {testResults.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Aucun test effectué. Utilisez les boutons ci-dessus pour tester les fonctionnalités.
          </Typography>
        ) : (
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {testResults.map((result, index) => (
              <Alert 
                key={index} 
                severity={result.type} 
                sx={{ mb: 1 }}
              >
                {result.message}
              </Alert>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
