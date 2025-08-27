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
  Tooltip,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  AutoDelete as AutoDeleteIcon,
  PrivacyTip as PrivacyTipIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  FirstPage as FirstPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  LastPage as LastPageIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import chefCentreService from '../../services/chefCentreService';
import { dropdownsService } from '../../services/dropdownsService';
import ChefCentreFormModal from './ChefCentreFormModal';
import ChefCentreDetailsModal from './ChefCentreDetailsModal';
import SearchableSelect from '../common/SearchableSelect';
import SearchSection from '../common/SearchSection';

export default function ChefsCentre() {
  // États principaux
  const [chefsCentre, setChefsCentre] = useState([]);
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
      const response = await chefCentreService.getChefsCentre({}, 1, 5);
      setChefsCentre(response.data);
      setPagination(prev => ({
        ...prev,
        totalCount: response.pagination.totalCount,
        pageCount: response.pagination.pageCount,
        currentPage: 1,
        pageSize: 5
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
      console.log('Structure niveauxFormation:', niveauxFormation);

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
    <Box sx={{ p: 2 }}>
      {/* Titre principal centré */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        pt: 2,
        pb: 3,
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            color: '#1976d2', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          Gestion des Chefs de Centre
        </Typography>
      </Box>

      {/* Section Recherche */}
      <SearchSection>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 2,
          mb: 2
        }}>
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
                borderRadius: 2,
                minHeight: '48px'
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'text.primary'
              }
            }}
          />
          
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
                borderRadius: 2,
                minHeight: '48px'
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'text.primary'
              }
            }}
          />
          
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
                borderRadius: 2,
                minHeight: '48px'
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'text.primary'
              }
            }}
          />
          
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
                borderRadius: 2,
                minHeight: '48px'
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'text.primary'
              }
            }}
          />
          
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
                borderRadius: 2,
                minHeight: '48px'
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'text.primary'
              }
            }}
          />
          
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
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                minHeight: '48px'
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'text.primary'
              }
            }}
          />

          {/* Boutons d'action sur la même rangée */}
          <Button
            variant="contained"
            onClick={applyFilters}
            startIcon={<FilterIcon />}
            sx={{
              minWidth: '200px',
              height: '48px',
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
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
              minWidth: '200px',
              height: '48px',
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderColor: 'primary.main',
              borderWidth: '2px',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.light',
                color: 'primary.dark'
              }
            }}
          >
            Réinitialiser
          </Button>
        </Box>
        

      </SearchSection>

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
              Ajouter chef de centre
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table sx={{ border: '2px solid #e0e0e0', borderRadius: 1 }}>
              <TableHead>
                            <TableRow sx={{ backgroundColor: '#F2F2F5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Nom</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Prénom</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>CIN</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date de naissance</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Niveau de formation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Année Autorisation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tel</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
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
                    <TableCell>
                      {chefCentre.niveauFormationInitialId && dropdowns.niveauxFormation ? 
                        dropdowns.niveauxFormation.find(n => n.id === chefCentre.niveauFormationInitialId)?.libelle || '-'
                        : chefCentre.niveauFormationInitialNom || '-'
                      }
                    </TableCell>
                    <TableCell>{chefCentre.anneeAutorisation}</TableCell>
                    <TableCell>{chefCentre.tel}</TableCell>
                    <TableCell>
                      <Tooltip title="Voir les détails">
                        <IconButton
                          onClick={() => handleDetails(chefCentre)}
                        >
                          <PrivacyTipIcon sx={{ color: '#22780F' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton
                          onClick={() => handleEdit(chefCentre)}
                        >
                          <EditIcon sx={{ color: '#DF6D14' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          onClick={() => handleDelete(chefCentre)}
                        >
                          <AutoDeleteIcon sx={{ color: '#EB0000' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
                    onClick={() => handlePageChange(null, 1)}
                    disabled={pagination.currentPage === 1}
                    sx={{
                      color: pagination.currentPage === 1 ? '#bdbdbd' : '#1976d2',
                      '&:hover': {
                        backgroundColor: pagination.currentPage === 1 ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
                      }
                    }}
                  >
                    <FirstPageIcon />
                  </IconButton>

                  {/* Bouton page précédente */}
                  <IconButton
                    onClick={() => handlePageChange(null, pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    sx={{
                      color: pagination.currentPage === 1 ? '#bdbdbd' : '#1976d2',
                      '&:hover': {
                        backgroundColor: pagination.currentPage === 1 ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
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
                          onClick={() => handlePageChange(null, pageNum)}
                          sx={{
                            backgroundColor: pagination.currentPage === pageNum ? '#1976d2' : 'transparent',
                            color: pagination.currentPage === pageNum ? 'white' : '#424242',
                            minWidth: 36,
                            height: 36,
                            fontSize: '0.875rem',
                            '&:hover': {
                              backgroundColor: pagination.currentPage === pageNum ? '#1976d2' : 'rgba(25, 118, 210, 0.1)'
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
                    onClick={() => handlePageChange(null, pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= pagination.pageCount}
                    sx={{
                      color: pagination.currentPage >= pagination.pageCount ? '#bdbdbd' : '#1976d2',
                      '&:hover': {
                        backgroundColor: pagination.currentPage >= pagination.pageCount ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
                      }
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>

                  {/* Bouton dernière page */}
                  <IconButton
                    onClick={() => handlePageChange(null, pagination.pageCount)}
                    disabled={pagination.currentPage >= pagination.pageCount}
                    sx={{
                      color: pagination.currentPage >= pagination.pageCount ? '#bdbdbd' : '#1976d2',
                      '&:hover': {
                        backgroundColor: pagination.currentPage >= pagination.pageCount ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
                      }
                    }}
                  >
                    <LastPageIcon />
                  </IconButton>
                </Box>
              )}

              {/* Informations d'affichage en dessous */}
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Affichage de {((pagination.currentPage - 1) * pagination.pageSize) + 1} à {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} sur {pagination.totalCount} chefs de centre
              </Typography>
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
        dropdowns={dropdowns}
      />
    </Box>
  );
} 