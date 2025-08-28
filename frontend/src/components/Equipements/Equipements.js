import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Select, MenuItem, InputLabel, FormControl, Pagination, CircularProgress,
  Typography, Divider, Box, Chip, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { toast } from 'react-toastify';
import equipementService from '../../services/equipementService';
import SectionTitle from '../Commun/SectionTitle';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const REQUIRED_FIELDS = ['marque', 'modele', 'typeEquipement', 'protocole', 'referenceHomologation'];

const emptyForm = {
  marque: '',
  modele: '',
  typeEquipement: '',
  protocole: '',
  referenceHomologation: '',
  dateHomologation: '',
  dateMiseService: '',
  ligne: '',
  dateEtalonnage: '',
  dateExpirationEtalonnage: '',
  cct: ''
};

export default function Equipements() {
  // États pour les données
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdowns, setDropdowns] = useState({ types: [], ccts: [], statuts: [], lignes: [] });
  const [dropdownsLoading, setDropdownsLoading] = useState(true);

  // États pour la pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 5,
    totalCount: 0,
    pageCount: 0
  });

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

  // Charger les équipements quand la page, rowsPerPage ou search changent
  useEffect(() => {
    if (dropdowns.types.length > 0) {
      loadEquipements();
    }
  }, [pagination.currentPage, pagination.pageSize, search]);

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
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        cct: search.cct || undefined,
        ligne: search.ligne || undefined,
        type: search.type || undefined,
        dateEtalonnage: search.dateEtalonnage || undefined
      });
      
      // Vérifier que la réponse contient des données
      if (response && response.data && Array.isArray(response.data)) {
        setEquipements(response.data);
        
        // Récupérer le total depuis les headers de réponse
        // Le backend envoie X-Total-Count et X-Page-Count dans les headers
        const totalCount = parseInt(response.headers?.['x-total-count'] || '0');
        const pageCount = parseInt(response.headers?.['x-page-count'] || '1');
        
        if (totalCount > 0) {
        setPagination(prev => ({ ...prev, totalCount: totalCount, pageCount: pageCount }));
        } else {
          // Fallback si les headers ne sont pas disponibles
          setPagination(prev => ({ ...prev, totalCount: response.data.length, pageCount: Math.ceil(response.data.length / pagination.pageSize) }));
        }
      } else {
        console.warn('Réponse invalide du service équipements:', response);
        setEquipements([]);
        setPagination(prev => ({ ...prev, totalCount: 0, pageCount: 1 }));
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

      const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      const paginatedEquipements = mockEquipements.slice(startIndex, endIndex);

      setEquipements(paginatedEquipements);
      setPagination(prev => ({ ...prev, totalCount: mockEquipements.length, pageCount: Math.ceil(mockEquipements.length / pagination.pageSize) }));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    // loadEquipements() sera automatiquement appelé par useEffect
  };

  const handleResetSearch = () => {
    setSearch({
      cct: '',
      ligne: '',
      type: '',
      dateEtalonnage: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    // loadEquipements() sera automatiquement appelé par useEffect
  };

  const handleOpenForm = (equipement = null) => {
    if (equipement) {
      console.log('🔍 Équipement sélectionné pour modification:', equipement);
      setForm({
        marque: equipement.marque || '',
        modele: equipement.modele || '',
        typeEquipement: equipement.typeEquipementId?.toString() || '',
        protocole: equipement.protocole || '',
        referenceHomologation: equipement.refHomologation || '',
        dateHomologation: equipement.dateHomologation ? new Date(equipement.dateHomologation).toISOString().split('T')[0] : '',
        dateMiseService: equipement.dateMiseService ? new Date(equipement.dateMiseService).toISOString().split('T')[0] : '',
        ligne: equipement.ligneId?.toString() || '',
        dateEtalonnage: equipement.dateEtalonnage ? new Date(equipement.dateEtalonnage).toISOString().split('T')[0] : '',
        dateExpirationEtalonnage: equipement.dateExpirationEtalonnage ? new Date(equipement.dateExpirationEtalonnage).toISOString().split('T')[0] : '',
        cct: '' // Le CCT n'est pas géré dans le modèle backend actuel
      });
      console.log('🔍 Formulaire rempli:', form);
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
        marque: form.marque,
        modele: form.modele,
        typeEquipementId: parseInt(form.typeEquipement),
        protocole: form.protocole,
        refHomologation: form.referenceHomologation,
        dateHomologation: form.dateHomologation ? new Date(form.dateHomologation) : null,
        dateMiseService: form.dateMiseService ? new Date(form.dateMiseService) : null,
        ligneId: parseInt(form.ligne) || 1, // Valeur par défaut si pas de ligne
        dateEtalonnage: form.dateEtalonnage ? new Date(form.dateEtalonnage) : null,
        dateExpirationEtalonnage: form.dateExpirationEtalonnage ? new Date(form.dateExpirationEtalonnage) : null
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
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'équipement "${equipement.marque} ${equipement.modele}" ?`)) {
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
      {/* Titre principal centré */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        pt: 1,
        pb: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50px'
      }}>
        <SectionTitle 
          title="GESTION DES ÉQUIPEMENTS" 
          variant="section"
        />
      </Box>
      
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

      {/* Section d'en-tête avec sélecteur et bouton d'ajout */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          ÉQUIPEMENTS
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Sélecteur d'éléments par page */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Éléments par page :
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={pagination.pageSize}
                onChange={(e) => setPagination(prev => ({ ...prev, pageSize: e.target.value, currentPage: 1 }))}
                label="Éléments par page"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Ajouter un équipement
        </Button>
        </Box>
      </Box>

      {/* Table des équipements */}
      <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
              <Table sx={{ border: '2px solid #e0e0e0', borderRadius: 1 }}>
        <TableHead>
            <TableRow sx={{ backgroundColor: '#F2F2F5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Marque</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Modèle</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ligne</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type d'équipement</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Protocole</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Référence homologation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Détails</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : equipements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Aucun équipement trouvé
                </TableCell>
              </TableRow>
            ) : (
              equipements.map((equipement) => (
                <TableRow key={equipement.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {equipement.marque || equipement.fabricant || 'Non spécifiée'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {equipement.modele || 'Non spécifié'}
                    </Typography>
                  </TableCell>
                                            <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {equipement.ligneNom ? `Ligne ${equipement.ligneNom}` : 'Non assignée'}
                            </Typography>
                          </TableCell>
                                            <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  backgroundColor: getTypeEquipementColor(equipement.typeEquipementId),
                                  flexShrink: 0,
                                  border: '1px solid rgba(0,0,0,0.1)',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                }}
                              />
                              <Box display="flex" flexDirection="column">
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {equipement.typeEquipementLibelle || `Type ${equipement.typeEquipementId || 'N/A'}`}
                                </Typography>
                                {equipement.typeEquipementDescription && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                    {equipement.typeEquipementDescription}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {equipement.protocole || 'Non spécifié'}
                    </Typography>
                  </TableCell>
                                            <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {equipement.refHomologation || 'Non spécifiée'}
                            </Typography>
                          </TableCell>
              <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDetails(equipement)}
                      title="Voir les détails"
                      sx={{
                        '&:hover': {
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      <PrivacyTipIcon sx={{ color: '#22780F' }} />
                    </IconButton>
              </TableCell>
            </TableRow>
              ))
            )}
        </TableBody>
      </Table>
      </Box>

      {/* Pagination avec style personnalisé */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        mt: 3,
        p: 2,
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0'
      }}>


        {/* Navigation de pagination personnalisée centrée */}
        {pagination.pageCount > 1 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {/* Bouton première page */}
            <IconButton
              onClick={() => setPagination(prev => ({ ...prev, currentPage: 1 }))}
              disabled={pagination.currentPage === 1}
              sx={{
                color: pagination.currentPage === 1 ? '#bdbdbd' : '#008080',
                '&:hover': {
                  backgroundColor: pagination.currentPage === 1 ? 'transparent' : 'rgba(0, 128, 128, 0.1)'
                }
              }}
            >
              <FirstPageIcon />
            </IconButton>

            {/* Bouton page précédente */}
            <IconButton
              onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.max(1, pagination.currentPage - 1) }))}
              disabled={pagination.currentPage === 1}
              sx={{
                color: pagination.currentPage === 1 ? '#bdbdbd' : '#008080',
                '&:hover': {
                  backgroundColor: pagination.currentPage === 1 ? 'transparent' : 'rgba(0, 128, 128, 0.1)'
                }
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            {/* Numéros de page */}
            {Array.from({ length: Math.min(3, pagination.pageCount) }, (_, i) => {
              let pageNum;
              if (pagination.pageCount <= 3) {
                pageNum = i + 1;
              } else if (pagination.currentPage <= 2) {
                pageNum = i + 1;
              } else if (pagination.currentPage >= pagination.pageCount - 1) {
                pageNum = pagination.pageCount - 2 + i;
              } else {
                pageNum = pagination.currentPage - 1 + i;
              }

              if (pageNum > 0 && pageNum <= pagination.pageCount) {
                return (
                  <IconButton
                    key={pageNum}
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: pageNum }))}
                    sx={{
                      backgroundColor: pagination.currentPage === pageNum ? '#008080' : 'transparent',
                      color: pagination.currentPage === pageNum ? 'white' : '#424242',
                      minWidth: 36,
                      height: 36,
                      fontSize: '0.875rem',
                      '&:hover': {
                        backgroundColor: pagination.currentPage === pageNum ? '#008080' : 'rgba(0, 128, 128, 0.1)'
                      }
                    }}
                  >
                    {pageNum}
                  </IconButton>
                );
              }
              return null;
            })}

            {/* Bouton page suivante */}
            <IconButton
              onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.min(pagination.pageCount, pagination.currentPage + 1) }))}
              disabled={pagination.currentPage >= pagination.pageCount}
              sx={{
                color: pagination.currentPage >= pagination.pageCount ? '#bdbdbd' : '#008080',
                '&:hover': {
                  backgroundColor: pagination.currentPage >= pagination.pageCount ? 'transparent' : 'rgba(0, 128, 128, 0.1)'
                }
              }}
            >
              <ChevronRightIcon />
            </IconButton>

            {/* Bouton dernière page */}
            <IconButton
              onClick={() => setPagination(prev => ({ ...prev, currentPage: pagination.pageCount }))}
              disabled={pagination.currentPage >= pagination.pageCount}
              sx={{
                color: pagination.currentPage >= pagination.pageCount ? '#bdbdbd' : '#008080',
                '&:hover': {
                  backgroundColor: pagination.currentPage >= pagination.pageCount ? 'transparent' : 'rgba(0, 128, 128, 0.1)'
                }
              }}
            >
              <LastPageIcon />
            </IconButton>
        </Box>
      )}

        {/* Informations d'affichage en dessous */}
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Affichage de {((pagination.currentPage - 1) * pagination.pageSize) + 1} à {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} sur {pagination.totalCount} équipements
        </Typography>
      </Box>

      {/* Modal de formulaire */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEdit ? 'Modifier l\'équipement' : 'Ajouter un équipement'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 1 }}>
            <TextField
              label="Marque *"
              value={form.marque}
              onChange={(e) => handleFormChange('marque', e.target.value)}
              fullWidth
              required
              placeholder="ex: AACTIA MULLER, ACIA MULLER"
            />
            <TextField
              label="Modèle *"
              value={form.modele}
              onChange={(e) => handleFormChange('modele', e.target.value)}
              fullWidth
              required
              placeholder="ex: 495, 43300"
            />
            <FormControl fullWidth required>
              <InputLabel>Type d'équipement *</InputLabel>
              <Select
                value={form.typeEquipement}
                onChange={(e) => handleFormChange('typeEquipement', e.target.value)}
                label="Type d'équipement *"
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
            <TextField
              label="Protocole *"
              value={form.protocole}
              onChange={(e) => handleFormChange('protocole', e.target.value)}
              fullWidth
              required
              placeholder="ex: Gieglane, X"
            />
            <TextField
              label="Référence homologation *"
              value={form.referenceHomologation}
              onChange={(e) => handleFormChange('referenceHomologation', e.target.value)}
              fullWidth
              required
              placeholder="ex: 0000, FR 05-54 A VL"
            />

            <TextField
              label="Date homologation"
              type="date"
              value={form.dateHomologation}
              onChange={(e) => handleFormChange('dateHomologation', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date mise service"
              type="date"
              value={form.dateMiseService}
              onChange={(e) => handleFormChange('dateMiseService', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Ligne</InputLabel>
              <Select
                value={form.ligne}
                onChange={(e) => handleFormChange('ligne', e.target.value)}
                label="Ligne"
              >
                <MenuItem value="">Aucune ligne assignée</MenuItem>
                {dropdowns.lignes.map(ligne => (
                  <MenuItem key={ligne.id} value={ligne.id}>{`Ligne ${ligne.numeroLigne || 'N/A'}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Date étalonnage"
              type="date"
              value={form.dateEtalonnage}
              onChange={(e) => handleFormChange('dateEtalonnage', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date expiration étalonnage"
              type="date"
              value={form.dateExpirationEtalonnage}
              onChange={(e) => handleFormChange('dateExpirationEtalonnage', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
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
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PrivacyTipIcon sx={{ color: '#22780F' }} />
              <Typography variant="h6">DÉTAILS D'ÉQUIPEMENT</Typography>
            </Box>
            <Button 
              variant="text" 
              onClick={() => setOpenDetails(false)}
              sx={{ color: 'primary.main' }}
            >
              GESTION DES ÉQUIPEMENTS
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selected && (
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Marque:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{selected.marque || selected.fabricant || 'Non spécifiée'}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Modèle:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{selected.modele || 'Non spécifié'}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Type d'Équipement:</Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: getTypeEquipementColor(selected.typeEquipementId),
                        flexShrink: 0,
                        border: '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selected.typeEquipementLibelle || `Type ${selected.typeEquipementId || 'N/A'}`}
                    </Typography>
                  </Box>
                  {selected.typeEquipementDescription && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary', 
                        fontStyle: 'italic',
                        ml: 3,
                        lineHeight: 1.4,
                        backgroundColor: 'grey.50',
                        p: 1,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'grey.200'
                      }}
                    >
                      {selected.typeEquipementDescription}
                    </Typography>
                  )}
                </Box>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Protocole:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{selected.protocole || 'Non spécifié'}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Référence homologation:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{selected.refHomologation || 'Non spécifiée'}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Date homologation:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selected.dateHomologation ? new Date(selected.dateHomologation).toLocaleDateString('fr-FR') : 'Non spécifiée'}
                </Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Date mise service:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selected.dateMiseService ? new Date(selected.dateMiseService).toLocaleDateString('fr-FR') : 'Non spécifiée'}
                </Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>N° de ligne:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selected.ligneNom ? `Ligne ${selected.ligneNom}` : 'Non assignée'}
                </Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Date étalonnage:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selected.dateEtalonnage ? new Date(selected.dateEtalonnage).toLocaleDateString('fr-FR') : 'Non spécifiée'}
                </Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Date expiration étalonnage:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selected.dateExpirationEtalonnage ? new Date(selected.dateExpirationEtalonnage).toLocaleDateString('fr-FR') : 'Non spécifiée'}
              </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Box display="flex" gap={1} width="100%" justifyContent="space-between">
            <Box>
              <Button 
                variant="contained" 
                color="error"
                                        startIcon={<AutoDeleteIcon sx={{ color: 'white' }} />}
                onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
                    handleDelete(selected);
                    setOpenDetails(false);
                  }
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: 'error.dark',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Supprimer
              </Button>
            </Box>
            <Box display="flex" gap={1}>
              <Button 
                variant="contained" 
                startIcon={<EditIcon sx={{ color: 'white' }} />}
                onClick={() => {
                  setOpenDetails(false);
                  handleOpenForm(selected);
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: 'info.dark',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Modifier
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => setOpenDetails(false)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Fermer
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 