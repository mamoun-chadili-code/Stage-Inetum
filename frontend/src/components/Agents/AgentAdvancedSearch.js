import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Collapse,
  IconButton,
  FormControlLabel,
  Switch,
  Slider,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterIcon,
  Save as SaveIcon,
  RestoreFromTrash as RestoreIcon
} from '@mui/icons-material';

export default function AgentAdvancedSearch({ 
  filters, 
  onFilterChange, 
  onApplyFilters, 
  onClearFilters, 
  dropdowns,
  onSaveSearch,
  onRestoreSearch,
  savedSearches = []
}) {
  const [expanded, setExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [searchName, setSearchName] = useState('');

  const handleLocalFilterChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onApplyFilters();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      regionId: '',
      villeId: '',
      reseauId: '',
      cctId: '',
      statutAdministratifId: '',
      dateCAP: '',
      dateExpirationCAP: '',
      anneeAutorisation: '',
      categorieCAPId: '',
      dateAffectationCCT: '',
      dateDecisionRenouv: '',
      hasEmail: '',
      hasPhone: '',
      ageRange: [18, 65],
      experienceYears: [0, 30]
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
    onClearFilters();
  };

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      onSaveSearch(searchName, localFilters);
      setSearchName('');
    }
  };

  const handleRestoreSearch = (savedSearch) => {
    setLocalFilters(savedSearch.filters);
    onFilterChange(savedSearch.filters);
  };

  const getFilterCount = () => {
    return Object.values(localFilters).filter(value => 
      value !== '' && value !== null && value !== undefined && 
      !(Array.isArray(value) && value.every(v => v === 0))
    ).length;
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon />
          Recherche Avancée
          {getFilterCount() > 0 && (
            <Chip 
              label={`${getFilterCount()} filtre(s) actif(s)`} 
              color="primary" 
              size="small" 
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{ color: '#1976d2' }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Filtres de base toujours visibles */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Région</InputLabel>
            <Select
              value={localFilters.regionId}
              onChange={(e) => handleLocalFilterChange('regionId', e.target.value)}
              label="Région"
            >
              <MenuItem value="">Toutes les régions</MenuItem>
              {dropdowns.regions?.map(region => (
                <MenuItem key={region.id} value={region.id}>
                  {region.libelle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Ville</InputLabel>
            <Select
              value={localFilters.villeId}
              onChange={(e) => handleLocalFilterChange('villeId', e.target.value)}
              label="Ville"
            >
              <MenuItem value="">Toutes les villes</MenuItem>
              {dropdowns.villes?.map(ville => (
                <MenuItem key={ville.id} value={ville.id}>
                  {ville.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Réseau</InputLabel>
            <Select
              value={localFilters.reseauId}
              onChange={(e) => handleLocalFilterChange('reseauId', e.target.value)}
              label="Réseau"
            >
              <MenuItem value="">Tous les réseaux</MenuItem>
              {dropdowns.reseaux?.map(reseau => (
                <MenuItem key={reseau.id} value={reseau.id}>
                  {reseau.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>CCT</InputLabel>
            <Select
              value={localFilters.cctId}
              onChange={(e) => handleLocalFilterChange('cctId', e.target.value)}
              label="CCT"
            >
              <MenuItem value="">Tous les CCTs</MenuItem>
              {dropdowns.ccts?.map(cct => (
                <MenuItem key={cct.id} value={cct.id}>
                  {cct.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Filtres avancés */}
      <Collapse in={expanded}>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Statut Administratif</InputLabel>
              <Select
                value={localFilters.statutAdministratifId}
                onChange={(e) => handleLocalFilterChange('statutAdministratifId', e.target.value)}
                label="Statut Administratif"
              >
                <MenuItem value="">Tous les statuts</MenuItem>
                {dropdowns.statutsAdministratifs?.map(statut => (
                  <MenuItem key={statut.id} value={statut.id}>
                    {statut.libelle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Catégorie CAP</InputLabel>
              <Select
                value={localFilters.categorieCAPId}
                onChange={(e) => handleLocalFilterChange('categorieCAPId', e.target.value)}
                label="Catégorie CAP"
              >
                <MenuItem value="">Toutes les catégories</MenuItem>
                {dropdowns.categoriesCAP?.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Année Autorisation"
              type="number"
              value={localFilters.anneeAutorisation}
              onChange={(e) => handleLocalFilterChange('anneeAutorisation', e.target.value)}
              placeholder="Ex: 2020"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Date CAP</InputLabel>
              <Select
                value={localFilters.dateCAP}
                onChange={(e) => handleLocalFilterChange('dateCAP', e.target.value)}
                label="Date CAP"
              >
                <MenuItem value="">Toutes les dates</MenuItem>
                <MenuItem value="recent">CAP récent (1 an)</MenuItem>
                <MenuItem value="moyen">CAP moyen (1-3 ans)</MenuItem>
                <MenuItem value="ancien">CAP ancien (3+ ans)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Date Expiration CAP"
              type="date"
              value={localFilters.dateExpirationCAP}
              onChange={(e) => handleLocalFilterChange('dateExpirationCAP', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Date Affectation CCT"
              type="date"
              value={localFilters.dateAffectationCCT}
              onChange={(e) => handleLocalFilterChange('dateAffectationCCT', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Date Décision Renouvellement"
              type="date"
              value={localFilters.dateDecisionRenouv}
              onChange={(e) => handleLocalFilterChange('dateDecisionRenouv', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Présence Email</InputLabel>
              <Select
                value={localFilters.hasEmail}
                onChange={(e) => handleLocalFilterChange('hasEmail', e.target.value)}
                label="Présence Email"
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="true">Avec email</MenuItem>
                <MenuItem value="false">Sans email</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Filtres par plages */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Plage d'âge
            </Typography>
            <Slider
              value={localFilters.ageRange}
              onChange={(e, newValue) => handleLocalFilterChange('ageRange', newValue)}
              valueLabelDisplay="auto"
              min={18}
              max={65}
              marks={[
                { value: 18, label: '18' },
                { value: 65, label: '65' }
              ]}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="textSecondary">
                {localFilters.ageRange[0]} ans
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {localFilters.ageRange[1]} ans
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Années d'expérience
            </Typography>
            <Slider
              value={localFilters.experienceYears}
              onChange={(e, newValue) => handleLocalFilterChange('experienceYears', newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={30}
              marks={[
                { value: 0, label: '0' },
                { value: 30, label: '30' }
              ]}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="textSecondary">
                {localFilters.experienceYears[0]} ans
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {localFilters.experienceYears[1]} ans
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Recherches sauvegardées */}
        {savedSearches.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Recherches sauvegardées
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {savedSearches.map((search, index) => (
                <Chip
                  key={index}
                  label={search.name}
                  onClick={() => handleRestoreSearch(search)}
                  variant="outlined"
                  color="primary"
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Sauvegarder la recherche actuelle */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            size="small"
            label="Nom de la recherche"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Ex: Agents actifs région Casablanca"
            sx={{ minWidth: 300 }}
          />
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleSaveSearch}
            disabled={!searchName.trim()}
          >
            Sauvegarder
          </Button>
        </Box>
      </Collapse>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<RestoreIcon />}
          onClick={handleClearFilters}
          sx={{ borderRadius: 2 }}
        >
          Réinitialiser
        </Button>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleApplyFilters}
          sx={{ borderRadius: 2 }}
        >
          Rechercher
        </Button>
      </Box>
    </Paper>
  );
}
