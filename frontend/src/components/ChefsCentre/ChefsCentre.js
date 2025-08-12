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
  Grid,
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
  Tooltip,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import chefCentreService from '../../services/chefCentreService';
import { dropdownsService } from '../../services/dropdownsService';
import ChefCentreFormModal from './ChefCentreFormModal';
import ChefCentreDetailsModal from './ChefCentreDetailsModal';
import SearchableSelect from '../common/SearchableSelect';

export default function ChefsCentre() {
  // États principaux
  const [chefsCentre, setChefsCentre] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageCount: 0,
    currentPage: 1,
    pageSize: 10
  });

  // États des modals
  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [editingChefCentre, setEditingChefCentre] = useState(null);
  const [selectedChefCentre, setSelectedChefCentre] = useState(null);

  // États des filtres
  const [filters, setFilters] = useState({
    regionId: '',
    villeId: '',
    reseauId: '',
    CCTId: '',
    niveauFormationId: '',
    anneeAffectation: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // États des dropdowns
  const [dropdowns, setDropdowns] = useState({
    regions: [],
    villes: [],
    reseaux: [],
    ccts: [],
    niveauxFormation: []
  });

  // États des détails
  const [detailsTab, setDetailsTab] = useState(0);
  const [chefCentreDetails, setChefCentreDetails] = useState({
    historique: []
  });

  // Charger les données initiales
  useEffect(() => {
    loadChefsCentre();
    loadDropdowns();
  }, [pagination.currentPage, pagination.pageSize]);

  // Charger les chefs de centre
  const loadChefsCentre = async () => {
    try {
      setLoading(true);
      const response = await chefCentreService.getChefsCentre(filters, pagination.currentPage, pagination.pageSize);
      setChefsCentre(response.data);
      setPagination(prev => ({
        ...prev,
        totalCount: response.pagination.totalCount,
        pageCount: response.pagination.pageCount,
        currentPage: response.pagination.currentPage,
        pageSize: response.pagination.pageSize
      }));
    } catch (error) {
      toast.error('Erreur lors du chargement des chefs de centre');
      console.error('Erreur loadChefsCentre:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rafraîchir les données sans filtres
  const refreshData = async () => {
    try {
      setLoading(true);
      const response = await chefCentreService.getChefsCentre({}, 1, 10);
      setChefsCentre(response.data);
      setPagination(prev => ({
        ...prev,
        totalCount: response.pagination.totalCount,
        pageCount: response.pagination.pageCount,
        currentPage: 1,
        pageSize: 10
      }));
    } catch (error) {
      toast.error('Erreur lors du rafraîchissement des données');
      console.error('Erreur refreshData:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les dropdowns
  const loadDropdowns = async () => {
    try {
      console.log('Chargement des dropdowns...');
      
      const [
        regions,
        villes,
        reseaux,
        ccts,
        niveauxFormation
      ] = await Promise.all([
        dropdownsService.getRegions(),
        dropdownsService.getVilles(),
        dropdownsService.getReseaux(),
        dropdownsService.getCCTs(),
        dropdownsService.getNiveauxFormation()
      ]);

      console.log('Dropdowns chargés:', { regions, villes, reseaux, ccts, niveauxFormation });

      setDropdowns({
        regions,
        villes,
        reseaux,
        ccts,
        niveauxFormation
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
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Appliquer les filtres
  const applyFilters = () => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadChefsCentre();
  };

  // Réinitialiser les filtres
  const clearFilters = () => {
    setFilters({
      regionId: '',
      villeId: '',
      reseauId: '',
      CCTId: '',
      niveauFormationId: '',
      anneeAffectation: ''
    });
    setSearchTerm('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadChefsCentre();
  };

  // Ouvrir modal d'ajout
  const handleAdd = () => {
    setEditingChefCentre(null);
    setOpenModal(true);
  };

  // Ouvrir modal de modification
  const handleEdit = async (chefCentre) => {
    try {
      const response = await chefCentreService.getChefCentre(chefCentre.id);
      setEditingChefCentre(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error('Erreur lors de la récupération du chef de centre:', error);
      toast.error('Erreur lors de la récupération du chef de centre');
    }
  };

  // Ouvrir modal de détails
  const handleDetails = async (chefCentre) => {
    setSelectedChefCentre(chefCentre);
    setDetailsTab(0);
    setOpenDetailsModal(true);

    try {
      const [chefCentreResponse, historiqueResponse] = await Promise.all([
        chefCentreService.getChefCentre(chefCentre.id),
        chefCentreService.getChefCentreHistorique(chefCentre.id)
      ]);

      setChefCentreDetails({
        historique: historiqueResponse.data || []
      });
    } catch (error) {
      console.error('Erreur lors du chargement des détails:', error);
      setChefCentreDetails({
        historique: []
      });
    }
  };

  // Supprimer un chef de centre
  const handleDelete = async (chefCentre) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le chef de centre "${chefCentre.nom} ${chefCentre.prenom}" ?`)) {
      try {
        await chefCentreService.deleteChefCentre(chefCentre.id);
        toast.success('Chef de centre supprimé avec succès');
        refreshData();
      } catch (error) {
        toast.error('Erreur lors de la suppression du chef de centre');
        console.error('Erreur handleDelete:', error);
      }
    }
  };

  // Filtrer les chefs de centre par terme de recherche
  const filteredChefsCentre = chefsCentre.filter(chefCentre =>
    chefCentre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chefCentre.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chefCentre.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chefCentre.tel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Chefs de Centre
      </Typography>

      {/* Section Recherche */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 4, 
          mb: 4, 
          bgcolor: 'white',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease-in-out'
          },
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            color: 'primary.main',
            fontWeight: 700,
            mb: 3,
            fontSize: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            borderBottom: '2px solid',
            borderColor: 'primary.light',
            pb: 1,
            '& .MuiSvgIcon-root': {
              fontSize: '2rem',
              color: 'primary.main'
            }
          }}
        >
          <SearchIcon />
          Recherche Avancée
        </Typography>
        
        <Grid container spacing={4}>
          {/* Indicateur de statut des filtres */}
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mb: 3,
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200'
            }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Filtres actifs :
              </Typography>
              {Object.values(filters).some(value => value !== '') ? (
                <Chip 
                  label={`${Object.values(filters).filter(value => value !== '').length} filtre(s) appliqué(s)`}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              ) : (
                <Chip 
                  label="Aucun filtre appliqué"
                  color="default"
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4.5}>
            <SearchableSelect
              label="Région"
              value={filters.regionId}
              onChange={(value) => handleFilterChange('regionId', value)}
              options={dropdowns.regions || []}
              placeholder="Rechercher une région..."
              getOptionLabel={(option) => option.libelle}
              getOptionValue={(option) => option.id}
              fullWidth
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  minHeight: '75px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  marginBottom: '10px'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4.5}>
            <SearchableSelect
              label="Ville"
              value={filters.villeId}
              onChange={(value) => handleFilterChange('villeId', value)}
              options={dropdowns.villes || []}
              placeholder="Rechercher une ville..."
              getOptionLabel={(option) => option.nom}
              getOptionValue={(option) => option.id}
              fullWidth
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  minHeight: '75px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  marginBottom: '10px'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4.5}>
            <SearchableSelect
              label="Réseau de ralliement"
              value={filters.reseauId}
              onChange={(value) => handleFilterChange('reseauId', value)}
              options={dropdowns.reseaux || []}
              placeholder="Rechercher un réseau..."
              getOptionLabel={(option) => option.nom}
              getOptionValue={(option) => option.id}
              fullWidth
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  minHeight: '75px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  marginBottom: '10px'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4.5}>
            <SearchableSelect
              label="CCT"
              value={filters.CCTId}
              onChange={(value) => handleFilterChange('CCTId', value)}
              options={dropdowns.ccts || []}
              placeholder="Rechercher un CCT..."
              getOptionLabel={(option) => option.nom}
              getOptionValue={(option) => option.id}
              fullWidth
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  minHeight: '75px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  marginBottom: '10px'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4.5}>
            <SearchableSelect
              label="Formation"
              value={filters.niveauFormationId}
              onChange={(value) => handleFilterChange('niveauFormationId', value)}
              options={dropdowns.niveauxFormation || []}
              placeholder="Rechercher un niveau..."
              getOptionLabel={(option) => option.libelle}
              getOptionValue={(option) => option.id}
              fullWidth
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  minHeight: '75px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  marginBottom: '10px'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4.5}>
            <TextField
              fullWidth
              size="medium"
              label="Année d'affectation"
              value={filters.anneeAffectation}
              onChange={(e) => handleFilterChange('anneeAffectation', e.target.value)}
              placeholder="Ex: 2024"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'primary.main' }}>
                    <CalendarIcon fontSize="small" />
                  </Box>
                ),
              }}
              sx={{
                bgcolor: 'white',
                borderRadius: 3,
                transition: 'all 0.2s ease-in-out',
                '& .MuiInputLabel-root': {
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  marginBottom: '10px'
                },
                '& .MuiInputBase-input': {
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  color: 'text.primary',
                  padding: '24px 20px'
                },
                '& .MuiOutlinedInput-root': {
                  minHeight: '75px',
                  '& fieldset': {
                    borderColor: 'grey.400',
                    borderWidth: '3px'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '3.5px'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '3.5px'
                  },
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4.5}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              height: '100%',
              alignItems: 'center'
            }}>
              <Button
                variant="contained"
                onClick={applyFilters}
                startIcon={<FilterIcon />}
                sx={{
                  flex: 1,
                  height: '75px',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)'
                  }
                }}
              >
                Rechercher
              </Button>
              <Button
                variant="outlined"
                onClick={clearFilters}
                startIcon={<ClearIcon />}
                sx={{
                  flex: 1,
                  height: '75px',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderColor: 'primary.main',
                  borderWidth: '3px',
                  color: 'primary.main',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.light',
                    color: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 15px rgba(25, 118, 210, 0.2)'
                  }
                }}
              >
                Réinitialiser
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        {/* Section d'aide */}
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          bgcolor: 'info.50', 
          borderRadius: 2, 
          border: '1px solid',
          borderColor: 'info.200'
        }}>
          <Typography variant="body2" sx={{ 
            color: 'info.700', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontSize: '0.8rem'
          }}>
            <InfoIcon fontSize="small" />
            <strong>Astuce :</strong> Utilisez les champs de recherche pour filtrer rapidement les chefs de centre. 
            Vous pouvez combiner plusieurs critères pour affiner vos résultats.
          </Typography>
        </Box>
      </Paper>

      {/* Section Chefs des Centres */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon />
            CHEFS DES CENTRES
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Affichage
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
              + Ajouter Chef de centre
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
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>CIN</TableCell>
                  <TableCell>Date de naissance</TableCell>
                  <TableCell>Niveau de formation</TableCell>
                  <TableCell>Année Autorisation</TableCell>
                  <TableCell>Tel</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredChefsCentre.map((chefCentre) => (
                  <TableRow key={chefCentre.id} hover>
                    <TableCell>{chefCentre.nom}</TableCell>
                    <TableCell>{chefCentre.prenom}</TableCell>
                    <TableCell>{chefCentre.cin}</TableCell>
                    <TableCell>
                      {chefCentre.dateNaissance ? new Date(chefCentre.dateNaissance).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>{chefCentre.niveauFormation || '-'}</TableCell>
                    <TableCell>{chefCentre.anneeAutorisation}</TableCell>
                    <TableCell>{chefCentre.tel}</TableCell>
                    <TableCell>
                      <Tooltip title="Voir les détails">
                        <IconButton
                          color="primary"
                          onClick={() => handleDetails(chefCentre)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton
                          color="secondary"
                          onClick={() => handleEdit(chefCentre)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(chefCentre)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2">
                  Affichage de {((pagination.currentPage - 1) * pagination.pageSize) + 1} à {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} sur {pagination.totalCount} chefs de centre
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
                />
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Modal de formulaire (ajout/modification) */}
      <ChefCentreFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={async (data) => {
          try {
            if (editingChefCentre) {
              const response = await chefCentreService.updateChefCentre(editingChefCentre.id, data);
              toast.success('Chef de centre modifié avec succès');
            } else {
              await chefCentreService.createChefCentre(data);
              toast.success('Chef de centre créé avec succès');
            }
            setOpenModal(false);
            refreshData(); // Utiliser refreshData au lieu de loadChefsCentre
          } catch (error) {
            console.error('Erreur détaillée:', error);
            if (error.response?.data) {
              console.error('Erreurs de validation:', error.response.data);
              toast.error(`Erreur de validation: ${JSON.stringify(error.response.data)}`);
            } else {
              toast.error(editingChefCentre ? 'Erreur lors de la modification du chef de centre' : 'Erreur lors de la création du chef de centre');
            }
          }
        }}
        initialValues={editingChefCentre}
        dropdowns={dropdowns}
      />

      {/* Modal de détails */}
      <ChefCentreDetailsModal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        chefCentre={selectedChefCentre}
        details={chefCentreDetails}
        tab={detailsTab}
        onTabChange={(e, newValue) => setDetailsTab(newValue)}
        onEdit={() => {
          setOpenDetailsModal(false);
          handleEdit(selectedChefCentre);
        }}
      />
    </Box>
  );
} 