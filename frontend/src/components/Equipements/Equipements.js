import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Select, MenuItem, InputLabel, FormControl, Pagination, CircularProgress,
  Typography, Divider, Box, Chip, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { toast } from 'react-toastify';
import equipementService from '../../services/equipementService';

const REQUIRED_FIELDS = ['nom', 'type', 'cct', 'dateAcquisition', 'statut'];

const emptyForm = {
  nom: '',
  description: '',
  type: '',
  cct: '',
  dateAcquisition: '',
  dateMaintenance: '',
  statut: '',
  numeroSerie: '',
  fabricant: '',
  modele: '',
  coutAcquisition: '',
  localisation: ''
};

export default function Equipements() {
  // États pour les données
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdowns, setDropdowns] = useState({ types: [], ccts: [], statuts: [], lignes: [] });
  const [dropdownsLoading, setDropdownsLoading] = useState(true);

  // États pour la pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // États pour la recherche
  const [search, setSearch] = useState({
    cct: '',
    ligne: '',
    type: '',
    dateEtalonnage: ''
  });

  // États pour les modals
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formLoading, setFormLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Charger les dropdowns au montage du composant
  useEffect(() => {
    loadDropdowns();
    loadEquipements();
  }, []);

  // Charger les équipements quand la page ou rowsPerPage changent
  useEffect(() => {
    if (dropdowns.types.length > 0) {
      loadEquipements();
    }
  }, [page, rowsPerPage]);

  const loadDropdowns = async () => {
    try {
      setDropdownsLoading(true);
      
      // Charger les types d'équipements
      const types = await equipementService.getTypesEquipement();
      console.log('🔍 Types récupérés:', types);
      
      // Charger les CCTs
      const ccts = await equipementService.getCCTs();
      console.log('🔍 CCTs récupérés:', ccts);
      
      // Charger les statuts d'équipement
      const statuts = await equipementService.getStatutsEquipement();
      console.log('🔍 Statuts récupérés:', statuts);
      
      // Charger les lignes
      const lignes = await equipementService.getLignes();
      console.log('🔍 Lignes récupérées:', lignes);
      
      const mappedDropdowns = {
        types: types.map(t => ({ 
          id: t.id || t.Id, 
          libelle: t.libelle || t.Libelle,
          description: t.description || t.Description 
        })),
        ccts: ccts.map(c => ({ id: c.id || c.Id, nom: c.nom || c.Nom })),
        statuts: statuts.map(s => ({ id: s.id || s.Id, libelle: s.libelle || s.Libelle })),
        lignes: lignes.map(l => ({ id: l.id || l.Id, numeroLigne: l.numeroLigne || l.NumeroLigne }))
      };
      
      console.log('🔍 Dropdowns mappés:', mappedDropdowns);
      
      setDropdowns(mappedDropdowns);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des dropdowns:', error);
      toast.error('Erreur lors du chargement des données de référence');
      
      // Fallback vers des données mockées en cas d'erreur
      setDropdowns({
        types: [
          { id: 1, libelle: 'Informatique', description: 'Équipements informatiques et logiciels' },
          { id: 2, libelle: 'Bureau', description: 'Matériel de bureau et accessoires' },
          { id: 3, libelle: 'Technique', description: 'Équipements techniques spécialisés' },
          { id: 4, libelle: 'Sécurité', description: 'Systèmes de sécurité et protection' }
        ],
        ccts: [
          { id: 1, nom: 'CCT Casablanca' },
          { id: 2, nom: 'CCT Rabat' },
          { id: 3, nom: 'CCT Fès' }
        ],
        statuts: [
          { id: 1, libelle: 'En service' },
          { id: 2, libelle: 'En maintenance' },
          { id: 3, libelle: 'Hors service' },
          { id: 4, libelle: 'En réparation' }
        ],
        lignes: [
          { id: 1, numeroLigne: 101 },
          { id: 2, numeroLigne: 102 },
          { id: 3, numeroLigne: 103 },
          { id: 4, numeroLigne: 104 }
        ]
      });
    } finally {
      setDropdownsLoading(false);
    }
  };

  const loadEquipements = async () => {
    try {
      setLoading(true);
      
      // Charger les équipements avec pagination et filtres
      const response = await equipementService.getEquipements({
        page,
        pageSize: rowsPerPage,
        cct: search.cct || undefined,
        ligne: search.ligne || undefined,
        type: search.type || undefined,
        dateEtalonnage: search.dateEtalonnage || undefined
      });
      
      // Vérifier que la réponse contient des données
      if (response && Array.isArray(response)) {
        setEquipements(response);
        
        // Récupérer le total depuis les headers de réponse si disponibles
        const totalCount = parseInt(response.headers?.['x-total-count'] || '0');
        const pageCount = parseInt(response.headers?.['x-page-count'] || '1');
        
        setTotalCount(totalCount);
        setPageCount(pageCount);
      } else {
        console.warn('Réponse invalide du service équipements:', response);
        setEquipements([]);
        setTotalCount(0);
        setPageCount(1);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des équipements:', error);
      toast.error('Erreur lors du chargement des équipements');
      
      // Fallback vers des données mockées en cas d'erreur
      const mockEquipements = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        nom: `Équipement ${i + 1}`,
        description: `Description de l'équipement ${i + 1}`,
        type: { id: (i % 4) + 1, libelle: ['Informatique', 'Bureau', 'Technique', 'Sécurité'][i % 4] },
        cct: { id: (i % 3) + 1, nom: ['CCT Casablanca', 'CCT Rabat', 'CCT Fès'][i % 3] },
        dateAcquisition: new Date(2023, i % 12, (i % 28) + 1).toISOString().split('T')[0],
        dateMaintenance: new Date(2024, i % 12, (i % 28) + 1).toISOString().split('T')[0],
        statutId: (i % 4) + 1,
        numeroSerie: `SER${String(i + 1).padStart(3, '0')}`,
        fabricant: `Fabricant ${i + 1}`,
        modele: `Modèle ${i + 1}`,
        coutAcquisition: (Math.random() * 10000 + 1000).toFixed(2),
        localisation: `Localisation ${i + 1}`
      }));

      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const paginatedEquipements = mockEquipements.slice(startIndex, endIndex);

      setEquipements(paginatedEquipements);
      setTotalCount(mockEquipements.length);
      setPageCount(Math.ceil(mockEquipements.length / rowsPerPage));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadEquipements();
  };

  const handleResetSearch = () => {
    setSearch({
      cct: '',
      ligne: '',
      type: '',
      dateEtalonnage: ''
    });
    setPage(1);
    loadEquipements();
  };

  const handleOpenForm = (equipement = null) => {
    if (equipement) {
      setForm({
        nom: equipement.nom,
        description: equipement.description,
        type: equipement.type.id.toString(),
        cct: equipement.cct.id.toString(),
        dateAcquisition: equipement.dateAcquisition,
        dateMaintenance: equipement.dateMaintenance,
        statut: equipement.statutId?.toString() || equipement.statut?.id?.toString() || '',
        numeroSerie: equipement.numeroSerie,
        fabricant: equipement.fabricant,
        modele: equipement.modele,
        coutAcquisition: equipement.coutAcquisition,
        localisation: equipement.localisation
      });
      setIsEdit(true);
      setSelected(equipement);
    } else {
      setForm(emptyForm);
      setIsEdit(false);
      setSelected(null);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setForm(emptyForm);
    setIsEdit(false);
    setSelected(null);
  };

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validation des champs requis
    const missingFields = REQUIRED_FIELDS.filter(field => !form[field]);
    if (missingFields.length > 0) {
      toast.error(`Champs requis manquants : ${missingFields.join(', ')}`);
      return;
    }

    try {
      setFormLoading(true);
      
      const equipementData = {
        nom: form.nom,
        description: form.description,
        typeId: parseInt(form.type),
        cctId: parseInt(form.cct),
        dateAcquisition: form.dateAcquisition ? new Date(form.dateAcquisition) : null,
        dateMaintenance: form.dateMaintenance ? new Date(form.dateMaintenance) : null,
        statutId: parseInt(form.statut),
        numeroSerie: form.numeroSerie,
        fabricant: form.fabricant,
        modele: form.modele,
        coutAcquisition: form.coutAcquisition ? parseFloat(form.coutAcquisition) : null,
        localisation: form.localisation
      };
      
      if (isEdit) {
        await equipementService.updateEquipement(selected.id, equipementData);
        toast.success('Équipement modifié avec succès');
      } else {
        await equipementService.createEquipement(equipementData);
        toast.success('Équipement créé avec succès');
      }
      
      handleCloseForm();
      loadEquipements();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (equipement) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'équipement "${equipement.nom}" ?`)) {
      try {
        await equipementService.deleteEquipement(equipement.id);
        toast.success('Équipement supprimé avec succès');
        loadEquipements();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleOpenDetails = (equipement) => {
    setSelected(equipement);
    setOpenDetails(true);
  };

  const getStatutStyle = (statutLibelle) => {
    switch (statutLibelle?.toLowerCase()) {
      case 'en service':
        return { backgroundColor: '#4caf50', color: 'white' };
      case 'en maintenance':
        return { backgroundColor: '#ff9800', color: 'white' };
      case 'hors service':
        return { backgroundColor: '#f44336', color: 'white' };
      case 'en réparation':
        return { backgroundColor: '#2196f3', color: 'white' };
      default:
        return { backgroundColor: '#e0e0e0', color: '#333' };
    }
  };

  // Fonction pour générer des couleurs uniques pour chaque type d'équipement
  const getTypeEquipementColor = (typeId) => {
    const colors = [
      '#FF6B6B', // Rouge vif
      '#4ECDC4', // Turquoise
      '#45B7D1', // Bleu clair
      '#96CEB4', // Vert clair
      '#FFEAA7', // Jaune clair
      '#DDA0DD', // Prune
      '#98D8C8', // Vert menthe
      '#F7DC6F', // Jaune doré
      '#BB8FCE', // Violet clair
      '#85C1E9', // Bleu ciel
      '#F8C471', // Orange clair
      '#82E0AA', // Vert pomme
      '#F1948A', // Rose saumon
      '#5DADE2', // Bleu azur (différent du précédent)
      '#D7BDE2', // Lavande
      '#F9E79F', // Jaune pâle
      '#A9DFBF', // Vert pâle
      '#FAD7A0', // Orange pâle
      '#D5A6BD', // Rose pâle
      '#A3E4D7', // Vert bleu pâle
      '#E74C3C', // Rouge foncé
      '#3498DB', // Bleu royal
      '#2ECC71', // Vert émeraude
      '#F39C12', // Orange foncé
      '#9B59B6', // Violet foncé
      '#1ABC9C', // Vert turquoise
      '#E67E22', // Orange rouge
      '#34495E', // Bleu gris foncé
      '#16A085', // Vert océan
      '#8E44AD'  // Violet profond
    ];
    
    // Pour éviter la répétition, on utilise l'ID directement
    // Si l'ID dépasse le nombre de couleurs, on génère une couleur unique
    if (typeId <= colors.length) {
      return colors[typeId - 1];
    } else {
      // Générer une couleur unique basée sur l'ID
      const hue = (typeId * 137.508) % 360; // Nombre d'or pour la distribution
      const saturation = 70 + (typeId % 20); // 70-90%
      const lightness = 50 + (typeId % 20);  // 50-70%
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
  };

  // Vérifier que les dropdowns sont chargés et non vides
  if (dropdownsLoading || !dropdowns.types || !dropdowns.ccts || !dropdowns.statuts || !dropdowns.lignes) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Chargement des données...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Équipements
      </Typography>
      
      {/* Section Recherche */}
      <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Section Recherche
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
          <FormControl size="small">
            <InputLabel>CCT</InputLabel>
            <Select
              value={search.cct}
              onChange={(e) => setSearch(prev => ({ ...prev, cct: e.target.value }))}
              label="CCT"
            >
              <MenuItem value="">Tous les CCTs</MenuItem>
              {dropdowns.ccts?.map(cct => (
                <MenuItem key={cct?.id} value={cct?.id}>{cct?.nom || 'CCT inconnu'}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Ligne</InputLabel>
            <Select
              value={search.ligne}
              onChange={(e) => setSearch(prev => ({ ...prev, ligne: e.target.value }))}
              label="Ligne"
            >
              <MenuItem value="">Toutes les lignes</MenuItem>
              {dropdowns.lignes?.map(ligne => (
                <MenuItem key={ligne?.id} value={ligne?.id}>{`Ligne ${ligne?.numeroLigne || 'N/A'}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Type d'équipement</InputLabel>
            <Select
              value={search.type}
              onChange={(e) => setSearch(prev => ({ ...prev, type: e.target.value }))}
              label="Type d'équipement"
            >
              <MenuItem value="">Tous les types</MenuItem>
              {dropdowns.types?.map(type => {
                const typeColor = getTypeEquipementColor(type?.id);
                return (
                  <MenuItem key={type?.id} value={type?.id} sx={{ py: 1 }}>
                    <Box display="flex" flexDirection="column" width="100%">
                      {/* Ligne 1 : Point coloré + Nom du type */}
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: typeColor,
                            flexShrink: 0,
                            border: '1px solid rgba(0,0,0,0.1)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary'
                          }}
                        >
                          {type?.libelle || 'Type inconnu'}
                        </Typography>
                      </Box>
                      {/* Ligne 2 : Description en italique */}
                      {type?.description && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontStyle: 'italic',
                            ml: 3,
                            lineHeight: 1.2
                          }}
                        >
                          {type.description}
                        </Typography>
                      )}
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="Date d'étalonnage"
            type="date"
            value={search.dateEtalonnage}
            onChange={(e) => setSearch(prev => ({ ...prev, dateEtalonnage: e.target.value }))}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={handleSearch}>
            Rechercher
          </Button>
          <Button variant="outlined" onClick={handleResetSearch}>
            Annuler
          </Button>
        </Box>
      </Box>

      {/* Bouton d'ajout */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Ajouter un équipement
        </Button>
      </Box>

      {/* Table des équipements */}
      <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
      <Table>
        <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>CCT</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Date d'acquisition</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : equipements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Aucun équipement trouvé
                </TableCell>
              </TableRow>
            ) : (
              equipements.map((equipement) => (
                <TableRow key={equipement.id} hover>
                  <TableCell>{equipement.nom}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: getTypeEquipementColor(equipement.type?.id || equipement.typeId),
                          flexShrink: 0,
                          border: '1px solid rgba(0,0,0,0.1)',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                      />
                      <Typography variant="body2">
                        {equipement.type?.libelle || `Type ${equipement.typeId || 'N/A'}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{equipement.cct?.nom || `CCT ${equipement.cctId || 'N/A'}`}</TableCell>
                  <TableCell>
                    <Chip
                      label={equipement.statut?.libelle || `Statut ${equipement.statutId}`}
                      size="small"
                      sx={getStatutStyle(equipement.statut?.libelle)}
                    />
                  </TableCell>
                  <TableCell>{equipement.dateAcquisition}</TableCell>
              <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDetails(equipement)}
                      title="Voir les détails"
                    >
                      <InfoIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenForm(equipement)}
                      title="Modifier"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(equipement)}
                      title="Supprimer"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
              </TableCell>
            </TableRow>
              ))
            )}
        </TableBody>
      </Table>
      </Box>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
          />
        </Box>
      )}

      {/* Modal de formulaire */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEdit ? 'Modifier l\'équipement' : 'Ajouter un équipement'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 1 }}>
            <TextField
              label="Nom *"
              value={form.nom}
              onChange={(e) => handleFormChange('nom', e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Type *</InputLabel>
              <Select
                value={form.type}
                onChange={(e) => handleFormChange('type', e.target.value)}
                label="Type *"
              >
                {dropdowns.types.map(type => {
                  const typeColor = getTypeEquipementColor(type.id);
                  return (
                    <MenuItem key={type.id} value={type.id} sx={{ py: 1 }}>
                      <Box display="flex" flexDirection="column" width="100%">
                        {/* Ligne 1 : Point coloré + Nom du type */}
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: typeColor,
                              flexShrink: 0,
                              border: '1px solid rgba(0,0,0,0.1)',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary'
                            }}
                          >
                            {type.libelle}
                          </Typography>
                        </Box>
                        {/* Ligne 2 : Description en italique */}
                        {type.description && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              fontStyle: 'italic',
                              ml: 3,
                              lineHeight: 1.2
                            }}
                          >
                            {type.description}
                          </Typography>
                        )}
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>CCT *</InputLabel>
              <Select
                value={form.cct}
                onChange={(e) => handleFormChange('cct', e.target.value)}
                label="CCT *"
              >
                {dropdowns.ccts.map(cct => (
                  <MenuItem key={cct.id} value={cct.id}>{cct.nom}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Numéro de série"
              value={form.numeroSerie}
              onChange={(e) => handleFormChange('numeroSerie', e.target.value)}
              fullWidth
            />
            <TextField
              label="Fabricant"
              value={form.fabricant}
              onChange={(e) => handleFormChange('fabricant', e.target.value)}
              fullWidth
            />
            <TextField
              label="Modèle"
              value={form.modele}
              onChange={(e) => handleFormChange('modele', e.target.value)}
              fullWidth
            />
            <TextField
              label="Date d'acquisition *"
              type="date"
              value={form.dateAcquisition}
              onChange={(e) => handleFormChange('dateAcquisition', e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date de maintenance"
              type="date"
              value={form.dateMaintenance}
              onChange={(e) => handleFormChange('dateMaintenance', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth required>
              <InputLabel>Statut *</InputLabel>
              <Select
                value={form.statut}
                onChange={(e) => handleFormChange('statut', e.target.value)}
                label="Statut *"
              >
                {dropdowns.statuts.map(statut => (
                  <MenuItem key={statut.id} value={statut.id}>{statut.libelle}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Coût d'acquisition"
              value={form.coutAcquisition}
              onChange={(e) => handleFormChange('coutAcquisition', e.target.value)}
              fullWidth
              type="number"
            />
            <TextField
              label="Localisation"
              value={form.localisation}
              onChange={(e) => handleFormChange('localisation', e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={form.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Annuler</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={formLoading}
          >
            {formLoading ? <CircularProgress size={20} /> : (isEdit ? 'Modifier' : 'Créer')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de détails */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="md" fullWidth>
        <DialogTitle>Détails de l'équipement</DialogTitle>
        <DialogContent>
          {selected && (
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Nom:</Typography>
                <Typography>{selected.nom}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Type:</Typography>
                <Typography>{selected.type.libelle}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">CCT:</Typography>
                <Typography>{selected.cct.nom}</Typography>
                
                                 <Typography variant="subtitle2" color="textSecondary">Statut:</Typography>
                 <Chip
                   label={selected.statut?.libelle || `Statut ${selected.statutId}`}
                   size="small"
                   sx={getStatutStyle(selected.statut?.libelle)}
                 />
                
                <Typography variant="subtitle2" color="textSecondary">Numéro de série:</Typography>
                <Typography>{selected.numeroSerie}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Fabricant:</Typography>
                <Typography>{selected.fabricant}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Modèle:</Typography>
                <Typography>{selected.modele}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Date d'acquisition:</Typography>
                <Typography>{selected.dateAcquisition}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Date de maintenance:</Typography>
                <Typography>{selected.dateMaintenance || 'Non définie'}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Coût d'acquisition:</Typography>
                <Typography>{selected.coutAcquisition} DH</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Localisation:</Typography>
                <Typography>{selected.localisation}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Description:
              </Typography>
              <Typography>{selected.description}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 