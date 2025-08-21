import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Divider,
  Pagination,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  School as SchoolIcon,
  DateRange as DateRangeIcon,
  Person as PersonIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import formationService from '../../services/formationService';
import { dropdownsService } from '../../services/dropdownsService';
import FormationFormModal from './FormationFormModal';
import FormationDetailsModal from './FormationDetailsModal';

export default function Formations() {
  // États principaux
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageCount: 0,
    currentPage: 1,
    pageSize: 5
  });

  // États des modals
  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);

  // États des filtres
  const [filters, setFilters] = useState({
    reseauId: '',
    cctId: '',
    chefCentreId: '',
    agentId: '',
    typeFormationId: '',
    dateDebut: '',
    dateFin: '',
    valideParFormateur: false
  });
  const [searchTerm, setSearchTerm] = useState('');

  // États des dropdowns
  const [dropdowns, setDropdowns] = useState({
    reseaux: [],
    ccts: [],
    chefsCentre: [],
    agents: [],
    typesFormation: []
  });

  // Charger les données initiales
  useEffect(() => {
    loadDropdowns();
    loadFormations();
  }, []);

  // Recharger les formations quand la pagination change
  useEffect(() => {
    loadFormations();
  }, [pagination.currentPage, pagination.pageSize]);

  // Surveiller les changements de filtres pour le débogage
  useEffect(() => {
    console.log('useEffect - Filtres ont changé:', JSON.stringify(filters, null, 2));
  }, [filters]);

  // Charger les formations
  const loadFormations = async () => {
    try {
      setLoading(true);
      console.log('=== loadFormations - DÉBUT ===');
      console.log('loadFormations - Filtres envoyés au backend:', JSON.stringify(filters, null, 2));
      console.log('loadFormations - valideParFormateur spécifiquement:', filters.valideParFormateur);
      console.log('loadFormations - Page:', pagination.currentPage, 'PageSize:', pagination.pageSize);
      
      const response = await formationService.getFormations(filters, pagination.currentPage, pagination.pageSize);
      
      console.log('loadFormations - Réponse reçue:', response);
      console.log('loadFormations - Nombre de formations reçues:', response.data.length);
      console.log('loadFormations - Total count:', response.pagination.totalCount);
      console.log('=== loadFormations - FIN ===');
      
      setFormations(response.data);
      setPagination(prev => ({
        ...prev,
        totalCount: response.pagination.totalCount,
        pageCount: response.pagination.pageCount,
        currentPage: response.pagination.currentPage,
        pageSize: response.pagination.pageSize
      }));
    } catch (error) {
      toast.error('Erreur lors du chargement des formations');
      console.error('Erreur loadFormations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les dropdowns
  const loadDropdowns = async () => {
    try {
      const [
        reseaux,
        ccts,
        chefsCentre,
        agents,
        typesFormation
      ] = await Promise.all([
        dropdownsService.getReseaux(),
        dropdownsService.getCCTs(),
        dropdownsService.getChefsCentre(),
        dropdownsService.getAgents(),
        dropdownsService.getTypesFormation()
      ]);

      setDropdowns({
        reseaux,
        ccts,
        chefsCentre,
        agents,
        typesFormation
      });
    } catch (error) {
      console.error('Erreur loadDropdowns:', error);
    }
  };

  // Gérer les changements de page
  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  // Gérer les changements de filtres
  const handleFilterChange = (field, value) => {
    console.log('=== handleFilterChange - DÉBUT ===');
    console.log('handleFilterChange - Champ:', field, 'Valeur:', value);
    console.log('handleFilterChange - Filtres avant changement:', JSON.stringify(filters, null, 2));
    
    setFilters(prev => {
      const newFilters = { ...prev, [field]: value };
      console.log('handleFilterChange - Nouveaux filtres après setState:', newFilters);
      return newFilters;
    });
    
    // Si c'est le filtre "Validé (Formateur + CHEH)", recharger immédiatement
    if (field === 'valideParFormateur') {
      console.log('handleFilterChange - Filtre validation changé, rechargement immédiat');
      console.log('handleFilterChange - Valeur du filtre:', value);
      console.log('handleFilterChange - Type de la valeur:', typeof value);
      
      // Remettre la pagination à la première page
      setPagination(prev => ({ ...prev, currentPage: 1 }));
      
      // Recharger immédiatement les formations
      setTimeout(() => {
        console.log('handleFilterChange - Exécution du rechargement après timeout');
        loadFormations();
      }, 100); // Petit délai pour laisser le state se mettre à jour
    }
    
    console.log('=== handleFilterChange - FIN ===');
  };

  // Appliquer les filtres
  const applyFilters = () => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadFormations();
  };

  // Réinitialiser les filtres
  const clearFilters = () => {
    console.log('clearFilters - Réinitialisation des filtres');
    
    // Réinitialiser tous les filtres
    const resetFilters = {
      reseauId: '',
      cctId: '',
      chefCentreId: '',
      agentId: '',
      typeFormationId: '',
      dateDebut: '',
      dateFin: '',
      valideParFormateur: false
    };
    
    console.log('clearFilters - Nouveaux filtres:', resetFilters);
    
    // Réinitialiser le terme de recherche
    setSearchTerm('');
    
    // Remettre la pagination à la première page
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    
    // Réinitialiser tous les filtres ET recharger immédiatement
    setFilters(resetFilters);
    
    // Recharger toutes les formations sans filtres - utiliser les filtres reset directement
    const loadFormationsWithoutFilters = async () => {
      try {
        setLoading(true);
        console.log('clearFilters - Rechargement avec filtres reset:', JSON.stringify(resetFilters, null, 2));
        
        const response = await formationService.getFormations(resetFilters, 1, pagination.pageSize);
        
        console.log('clearFilters - Réponse reçue:', response);
        console.log('clearFilters - Nombre de formations reçues:', response.data.length);
        
        setFormations(response.data);
        setPagination(prev => ({
          ...prev,
          totalCount: response.pagination.totalCount,
          pageCount: response.pagination.pageCount,
          currentPage: 1,
          pageSize: response.pagination.pageSize
        }));
      } catch (error) {
        toast.error('Erreur lors du rechargement des formations');
        console.error('Erreur clearFilters:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Exécuter immédiatement
    loadFormationsWithoutFilters();
    
    console.log('clearFilters - Filtres réinitialisés, toutes les formations rechargées');
  };

  // Ouvrir modal d'ajout
  const handleAdd = () => {
    setEditingFormation(null);
    setOpenModal(true);
  };

  // Ouvrir modal de modification
  const handleEdit = async (formation) => {
    try {
      const response = await formationService.getFormation(formation.id);
      console.log('Formations.js - handleEdit - Données reçues du backend:', response.data);
      console.log('Formations.js - handleEdit - valideLe reçu:', response.data.valideLe);
      console.log('Formations.js - handleEdit - Type de valideLe:', typeof response.data.valideLe);
      setEditingFormation(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error('Erreur lors de la récupération de la formation:', error);
      toast.error('Erreur lors de la récupération de la formation');
    }
  };

  // Ouvrir modal de détails
  const handleDetails = (formation) => {
    setSelectedFormation(formation);
    setOpenDetailsModal(true);
  };

  // Supprimer une formation
  const handleDelete = async (formation) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la formation "${formation.intitule}" ?`)) {
      try {
        await formationService.deleteFormation(formation.id);
        toast.success('Formation supprimée avec succès');
        loadFormations();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de la formation');
      }
    }
  };

  // Filtrer les formations selon le terme de recherche
  const filteredFormations = formations.filter(formation => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (formation.intitule && formation.intitule.toLowerCase().includes(searchLower)) ||
      (formation.matiere && formation.matiere.toLowerCase().includes(searchLower)) ||
      (formation.premierAnimateur && formation.premierAnimateur.toLowerCase().includes(searchLower)) ||
      (formation.deuxiemeAnimateur && formation.deuxiemeAnimateur.toLowerCase().includes(searchLower)) ||
      (formation.typeFormation && formation.typeFormation.toLowerCase().includes(searchLower)) ||
      (formation.cct && formation.cct.toLowerCase().includes(searchLower)) ||
      (formation.agent && formation.agent.toLowerCase().includes(searchLower))
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Formations
      </Typography>

      {/* Section Filtres */}
      <Paper sx={{ 
        p: 3, 
        mb: 3, 
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0'
      }}>
        <Typography variant="h6" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          color: 'primary.main',
          fontWeight: 600,
          mb: 2
        }}>
          <SearchIcon />
          RECHERCHE
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 1,
          mb: 2
        }}>
          <FormControl fullWidth size="small" sx={{ bgcolor: 'white', borderRadius: 1, minHeight: '48px' }}>
            <InputLabel>Réseau</InputLabel>
            <Select
              value={filters.reseauId}
              onChange={(e) => handleFilterChange('reseauId', e.target.value)}
              label="Réseau"
            >
              <MenuItem value="">Sélectionnez</MenuItem>
              {Array.isArray(dropdowns.reseaux) && dropdowns.reseaux.map(reseau => (
                <MenuItem key={reseau.id} value={reseau.id}>
                  {reseau.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        
          <FormControl fullWidth size="small" sx={{ bgcolor: 'white', borderRadius: 1, minHeight: '48px' }}>
            <InputLabel>CCT</InputLabel>
            <Select
              value={filters.cctId}
              onChange={(e) => handleFilterChange('cctId', e.target.value)}
              label="CCT"
            >
              <MenuItem value="">Sélectionnez</MenuItem>
              {Array.isArray(dropdowns.ccts) && dropdowns.ccts.map(cct => (
                <MenuItem key={cct.id} value={cct.id}>
                  {cct.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        
          <FormControl fullWidth size="small" sx={{ bgcolor: 'white', borderRadius: 1, minHeight: '48px' }}>
            <InputLabel>Chef centre</InputLabel>
            <Select
              value={filters.chefCentreId}
              onChange={(e) => handleFilterChange('chefCentreId', e.target.value)}
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
        
          <FormControl fullWidth size="small" sx={{ bgcolor: 'white', borderRadius: 1, minHeight: '48px' }}>
            <InputLabel>Agent</InputLabel>
            <Select
              value={filters.agentId}
              onChange={(e) => handleFilterChange('agentId', e.target.value)}
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

          <FormControl fullWidth size="small" sx={{ bgcolor: 'white', borderRadius: 1, minHeight: '48px' }}>
            <InputLabel>Type formation</InputLabel>
            <Select
              value={filters.typeFormationId}
              onChange={(e) => handleFilterChange('typeFormationId', e.target.value)}
              label="Type formation"
            >
              <MenuItem value="">Sélectionnez un élément</MenuItem>
              {Array.isArray(dropdowns.typesFormation) && dropdowns.typesFormation.map(type => (
                <MenuItem key={type.id} value={type.id}>
                  {type.libelle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            size="small"
            label="Période"
            type="date"
            value={filters.dateDebut}
            onChange={(e) => handleFilterChange('dateDebut', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ bgcolor: 'white', borderRadius: 1, minHeight: '48px' }}
          />
          
          <TextField
            fullWidth
            size="small"
            label="Période (fin)"
            type="date"
            value={filters.dateFin}
            onChange={(e) => handleFilterChange('dateFin', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ bgcolor: 'white', borderRadius: 1, minHeight: '48px' }}
          />
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pt: 1,
          borderTop: '1px solid #e0e0e0',
          mt: 1
        }}>
          <FormControlLabel
            control={
              <Switch
                checked={filters.valideParFormateur}
                onChange={(e) => handleFilterChange('valideParFormateur', e.target.checked)}
              />
            }
            label="Validé (Formateur + CHEH)"
            sx={{ 
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center'
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={applyFilters}
              startIcon={<FilterIcon />}
              sx={{ minWidth: 120, height: 48, borderRadius: 2 }}
            >
              Rechercher
            </Button>
            <Button
              variant="outlined"
              onClick={clearFilters}
              startIcon={<ClearIcon />}
              sx={{ minWidth: 120, height: 48, borderRadius: 2 }}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Section Formations */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon />
            FORMATIONS
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Afficher
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={pagination.pageSize}
                onChange={(e) => setPagination(prev => ({ ...prev, pageSize: e.target.value, currentPage: 1 }))}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2">
              éléments
            </Typography>
            
            <TextField
              size="small"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200 }}
            />
            
            <Button
              variant="contained"
              onClick={handleAdd}
              startIcon={<AddIcon />}
            >
              Ajouter Formation
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type de Formation</TableCell>
                  <TableCell>CCT</TableCell>
                  <TableCell>Nom agent</TableCell>
                  <TableCell>Intitulé</TableCell>
                  <TableCell>Début</TableCell>
                  <TableCell>Fin</TableCell>
                  <TableCell>Validé par formateur</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFormations.length > 0 ? (
                  filteredFormations.map((formation) => (
                    <TableRow key={formation.id}>
                      <TableCell>{formation.typeFormation || '-'}</TableCell>
                      <TableCell>{formation.cct || '-'}</TableCell>
                      <TableCell>{formation.agent || '-'}</TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formation.intitule}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {formation.dateDebut ? new Date(formation.dateDebut).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {formation.dateFin ? new Date(formation.dateFin).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={formation.valideParFormateur ? 'Oui' : 'Non'}
                          color={formation.valideParFormateur ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Tooltip title="Voir les détails">
                            <IconButton
                              color="primary"
                              onClick={() => handleDetails(formation)}
                              size="small"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Modifier">
                            <IconButton
                              color="secondary"
                              onClick={() => handleEdit(formation)}
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(formation)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {searchTerm ? 'Aucune formation trouvée pour cette recherche' : 'Aucune formation disponible'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Affichage de {((pagination.currentPage - 1) * pagination.pageSize) + 1} à {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} sur {pagination.totalCount} formations
                </Typography>
              </Box>
              {pagination.pageCount > 1 && (
                <Pagination
                  count={pagination.pageCount}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }
                  }}
                />
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Modal de formulaire (ajout/modification) */}
      <FormationFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={async (data) => {
          try {
            if (editingFormation) {
              await formationService.updateFormation(editingFormation.id, data);
              toast.success('Formation modifiée avec succès');
            } else {
              await formationService.createFormation(data);
              toast.success('Formation créée avec succès');
            }
            setOpenModal(false);
            loadFormations();
          } catch (error) {
            console.error('Erreur détaillée:', error);
            if (error.response?.data) {
              console.error('Erreurs de validation:', error.response.data);
              toast.error(`Erreur de validation: ${JSON.stringify(error.response.data)}`);
            } else {
              toast.error(editingFormation ? 'Erreur lors de la modification de la formation' : 'Erreur lors de la création de la formation');
            }
          }
        }}
        initialValues={editingFormation}
        dropdowns={dropdowns}
      />

      {/* Modal de détails */}
      <FormationDetailsModal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        formation={selectedFormation}
        onEdit={() => {
          setOpenDetailsModal(false);
          handleEdit(selectedFormation);
        }}
      />
    </Box>
  );
} 