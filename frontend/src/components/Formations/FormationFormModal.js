import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Box
} from '@mui/material';

export default function FormationFormModal({ open, onClose, onSubmit, initialValues = null, dropdowns = {} }) {
  const [form, setForm] = useState({
    intitule: '',
    cctId: '',
    agentId: '',
    chefCentreId: '',
    typeFormationId: '',
    matiere: '',
    dateDebut: '',
    dateFin: '',
    valideParFormateur: false,
    premierAnimateur: '',
    deuxiemeAnimateur: '',
    valideCHEH: false,
    valideLe: ''
  });

  useEffect(() => {
    if (initialValues && initialValues.id) {
      setForm({
        intitule: initialValues.intitule || '',
        cctId: initialValues.cctId?.toString() || '',
        agentId: initialValues.agentId?.toString() || '',
        chefCentreId: initialValues.chefCentreId?.toString() || '',
        typeFormationId: initialValues.typeFormationId?.toString() || '',
        matiere: initialValues.matiere || '',
        dateDebut: initialValues.dateDebut ? initialValues.dateDebut.split('T')[0] : '',
        dateFin: initialValues.dateFin ? initialValues.dateFin.split('T')[0] : '',
        valideParFormateur: initialValues.valideParFormateur || false,
        premierAnimateur: initialValues.premierAnimateur || '',
        deuxiemeAnimateur: initialValues.deuxiemeAnimateur || '',
        valideCHEH: initialValues.valideCHEH || false,
        valideLe: initialValues.valideLe ? initialValues.valideLe.split('T')[0] : ''
      });
    } else {
      setForm({
        intitule: '',
        cctId: '',
        agentId: '',
        chefCentreId: '',
        typeFormationId: '',
        matiere: '',
        dateDebut: '',
        dateFin: '',
        valideParFormateur: false,
        premierAnimateur: '',
        deuxiemeAnimateur: '',
        valideCHEH: false,
        valideLe: ''
      });
    }
  }, [initialValues, open]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialValues?.id ? 'Modifier Formation' : 'Ajouter Formation'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 2 }}>
            {/* Section Informations principales */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Informations principales
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                '& > *': { minWidth: '250px', flex: '1 1 250px' }
              }}>
                <TextField
                  label="Intitulé*"
                  value={form.intitule}
                  onChange={(e) => handleChange('intitule', e.target.value)}
                  fullWidth
                  required
                  margin="dense"
                  sx={{ minHeight: '56px' }}
                />
                
                <FormControl fullWidth margin="dense" sx={{ minHeight: '56px' }}>
                  <InputLabel>CCT</InputLabel>
                  <Select
                    value={form.cctId}
                    onChange={(e) => handleChange('cctId', e.target.value)}
                    label="CCT"
                  >
                    <MenuItem value="">Sélectionnez</MenuItem>
                    {Array.isArray(dropdowns.ccts) && dropdowns.ccts.map(cct => (
                      <MenuItem key={cct.id} value={cct.id}>{cct.nom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
            
                <FormControl fullWidth margin="dense" sx={{ minHeight: '56px' }}>
                  <InputLabel>Agent</InputLabel>
                  <Select
                    value={form.agentId}
                    onChange={(e) => handleChange('agentId', e.target.value)}
                    label="Agent"
                  >
                    <MenuItem value="">Sélectionnez</MenuItem>
                    {Array.isArray(dropdowns.agents) && dropdowns.agents.map(agent => (
                      <MenuItem key={agent.id} value={agent.id}>
                        {agent.nom} {agent.prenom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="dense" sx={{ minHeight: '56px' }}>
                  <InputLabel>Chef centre</InputLabel>
                  <Select
                    value={form.chefCentreId}
                    onChange={(e) => handleChange('chefCentreId', e.target.value)}
                    label="Chef centre"
                  >
                    <MenuItem value="">Sélectionnez</MenuItem>
                    {Array.isArray(dropdowns.chefsCentre) && dropdowns.chefsCentre.map(chef => (
                      <MenuItem key={chef.id} value={chef.id}>
                        {chef.nom} {chef.prenom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            
            {/* Section Matière */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Matière
              </Typography>
              <TextField
                label="Matière*"
                value={form.matiere}
                onChange={(e) => handleChange('matiere', e.target.value)}
                fullWidth
                required
                margin="dense"
                multiline
                rows={3}
                sx={{ minHeight: '80px' }}
              />
            </Box>
            
            {/* Section Dates */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Période de formation
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                '& > *': { minWidth: '250px', flex: '1 1 250px' }
              }}>
                <TextField
                  label="Début*"
                  type="datetime-local"
                  value={form.dateDebut}
                  onChange={(e) => handleChange('dateDebut', e.target.value)}
                  fullWidth
                  required
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  sx={{ minHeight: '56px' }}
                />
                
                <TextField
                  label="Fin*"
                  type="datetime-local"
                  value={form.dateFin}
                  onChange={(e) => handleChange('dateFin', e.target.value)}
                  fullWidth
                  required
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  sx={{ minHeight: '56px' }}
                />
              </Box>
            </Box>
            
            {/* Section Validation */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Validation
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3,
                '& > *': { minWidth: '200px' }
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.valideParFormateur}
                      onChange={(e) => handleChange('valideParFormateur', e.target.checked)}
                    />
                  }
                  label="Validé par formateur(s)"
                  sx={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.valideCHEH}
                      onChange={(e) => handleChange('valideCHEH', e.target.checked)}
                    />
                  }
                  label="Validé CHEH"
                  sx={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}
                />
              </Box>
            </Box>
            
            {/* Section Animateurs */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Animateurs
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                '& > *': { minWidth: '250px', flex: '1 1 250px' }
              }}>
                <TextField
                  label="1er Animateur"
                  value={form.premierAnimateur}
                  onChange={(e) => handleChange('premierAnimateur', e.target.value)}
                  fullWidth
                  margin="dense"
                  sx={{ minHeight: '56px' }}
                />
                
                <TextField
                  label="2ème Animateur"
                  value={form.deuxiemeAnimateur}
                  onChange={(e) => handleChange('deuxiemeAnimateur', e.target.value)}
                  fullWidth
                  margin="dense"
                  sx={{ minHeight: '56px' }}
                />
                
                <TextField
                  label="Validé le"
                  type="date"
                  value={form.valideLe}
                  onChange={(e) => handleChange('valideLe', e.target.value)}
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  sx={{ minHeight: '56px' }}
                />
              </Box>
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 