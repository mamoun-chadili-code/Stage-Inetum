import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import agentService from '../../services/agentService';
import dropdownsService from '../../services/dropdownsService';
import AgentFormModal from './AgentFormModal';
import AgentDetailsModal from './AgentDetailsModal';

import SearchableSelect from '../common/SearchableSelect';

export default function Agents() {
  // États
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const [editingAgent, setEditingAgent] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentDetails, setAgentDetails] = useState(null);
  const [dropdowns, setDropdowns] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // États pour les filtres
  const [filters, setFilters] = useState({
    regionId: '',
    villeId: '',
    reseauId: '',
    cctId: '',
    dateCAP: '',
    dateExpirationCAP: '',
    anneeAutorisation: ''
  });

  // États pour la pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 5, // Changé de 10 à 5 pour afficher seulement 5 agents
    totalCount: 0,
    pageCount: 0
  });

  // Charger les agents
  const loadAgents = async () => {
    try {
      console.log('Chargement des agents avec filtres:', filters);
      setLoading(true);
      const response = await agentService.getAgents(filters, pagination.currentPage, pagination.pageSize);
      console.log('Réponse de l\'API agents:', response);
      
      // Forcer l'utilisation des nouveaux statuts CAP dans l'affichage
      const agentsWithNewStatuses = response.data.map(agent => {
        // Si l'agent a un statutAdministratifId, mapper vers le nouveau libellé
        if (agent.statutAdministratifId && dropdowns.statutsAdministratifs) {
          const newStatus = dropdowns.statutsAdministratifs.find(
            status => status.id === agent.statutAdministratifId
          );
          if (newStatus) {
            return {
              ...agent,
              statutAdministratif: newStatus.libelle
            };
          }
        }
        return agent;
      });
      
      console.log('Agents avec nouveaux statuts:', agentsWithNewStatuses);
      setAgents(agentsWithNewStatuses);
      setPagination(prev => ({
        ...prev,
        totalCount: response.pagination.totalCount,
        pageCount: response.pagination.pageCount,
        currentPage: response.pagination.currentPage,
        pageSize: response.pagination.pageSize
      }));
    } catch (error) {
      toast.error('Erreur lors du chargement des agents');
      console.error('Erreur loadAgents:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rafraîchir les données sans filtres
  const refreshData = async () => {
    try {
      setLoading(true);
      const response = await agentService.getAgents({}, 1, 10);
      
      // Forcer l'utilisation des nouveaux statuts CAP dans l'affichage
      const agentsWithNewStatuses = response.data.map(agent => {
        // Si l'agent a un statutAdministratifId, mapper vers le nouveau libellé
        if (agent.statutAdministratifId && dropdowns.statutsAdministratifs) {
          const newStatus = dropdowns.statutsAdministratifs.find(
            status => status.id === agent.statutAdministratifId
          );
          if (newStatus) {
            return {
              ...agent,
              statutAdministratif: newStatus.libelle
            };
          }
        }
        return agent;
      });
      
      setAgents(agentsWithNewStatuses);
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
      const [regions, villes, reseaux, ccts, categories, statuts] = await Promise.all([
        dropdownsService.getRegions(),
        dropdownsService.getVilles(),
        dropdownsService.getReseaux(),
        dropdownsService.getCCTs(),
        dropdownsService.getCategoriesCAP(),
        dropdownsService.getStatutsAdministratifs()
      ]);

      console.log('Dropdowns récupérés:', { regions, villes, reseaux, ccts, categories, statuts });

      setDropdowns({
        regions: regions.data || regions,
        villes: villes.data || villes,
        reseaux: reseaux.data || reseaux,
        ccts: ccts.data || ccts,
        categories: categories.data || categories,
        statutsAdministratifs: statuts.data || statuts
      });

      console.log('Dropdowns mis à jour dans l\'état');
    } catch (error) {
      console.error('Erreur loadDropdowns:', error);
      toast.error('Erreur lors du chargement des listes déroulantes');
    }
  };

  // Gérer le changement de page
  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  // Gérer le changement de filtre
  const handleFilterChange = (field, value) => {
    console.log('Changement de filtre:', { field, value, previousValue: filters[field] });
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Appliquer les filtres
  const applyFilters = () => {
    console.log('Application des filtres:', filters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadAgents();
  };

  // Réinitialiser les filtres
  const clearFilters = () => {
    console.log('Réinitialisation des filtres');
    setFilters({
      regionId: '',
      villeId: '',
      reseauId: '',
      cctId: '',
      dateCAP: '',
      dateExpirationCAP: '',
      anneeAutorisation: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    // Charger les données sans filtres
    setTimeout(() => {
      loadAgents();
    }, 100);
  };

  // Gérer l'ajout d'un agent
  const handleAdd = () => {
    setEditingAgent(null);
    setOpenModal(true);
  };

  // Gérer la modification d'un agent
  const handleEdit = async (agent) => {
    setEditingAgent(agent);
    setOpenModal(true);
  };

  // Gérer la fermeture du modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingAgent(null);
  };

  // Gérer l'affichage des détails
  const handleDetails = async (agent) => {
    try {
      setSelectedAgent(agent);
      const response = await agentService.getAgentDetails(agent.id);
      setAgentDetails(response.data);
      setOpenDetailsModal(true);
    } catch (error) {
      toast.error('Erreur lors du chargement des détails de l\'agent');
      console.error('Erreur handleDetails:', error);
    }
  };

  // Gérer la suppression d'un agent
  const handleDelete = async (agent) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'agent ${agent.nom} ${agent.prenom} ?`)) {
      try {
        console.log('Suppression de l\'agent:', agent);
        await agentService.deleteAgent(agent.id);
        toast.success('Agent supprimé avec succès');
        loadAgents();
      } catch (error) {
        toast.error('Erreur lors de la suppression de l\'agent');
        console.error('Erreur handleDelete:', error);
      }
    }
  };



  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  };

  // Charger les données au montage
  useEffect(() => {
    loadDropdowns();
    loadAgents();
  }, []);

  // Charger les agents au démarrage et quand les dropdowns changent
  useEffect(() => {
    // Ne charger les agents que si les dropdowns sont disponibles
    if (dropdowns.statutsAdministratifs && dropdowns.statutsAdministratifs.length > 0) {
      loadAgents();
    }
  }, [dropdowns.statutsAdministratifs]);

  // Recharger les agents quand les filtres ou la pagination changent
  useEffect(() => {
    // Ne charger les agents que si les dropdowns sont disponibles
    if (dropdowns.statutsAdministratifs && dropdowns.statutsAdministratifs.length > 0) {
      loadAgents();
    }
  }, [pagination.currentPage, pagination.pageSize]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
        Gestion des Agents
      </Typography>

      {/* Section Recherche */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
          Recherche
        </Typography>
        
        {Object.keys(dropdowns).length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mb: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Chargement des données de recherche...
            </Typography>
          </Box>
        )}
        


        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mb: 3 }}>
          <SearchableSelect
            label="Région"
            value={filters.regionId}
            onChange={(value) => handleFilterChange('regionId', value)}
            options={dropdowns.regions || []}
            placeholder="Rechercher une région..."
            getOptionLabel={(option) => option.libelle}
            getOptionValue={(option) => option.id}
            disabled={!dropdowns.regions || dropdowns.regions.length === 0}
          />
          {!dropdowns.regions && (
            <Typography variant="caption" color="text.secondary" sx={{ gridColumn: '1 / -1' }}>
              Chargement des régions...
            </Typography>
          )}

          <SearchableSelect
            label="Ville"
            value={filters.villeId}
            onChange={(value) => handleFilterChange('villeId', value)}
            options={dropdowns.villes || []}
            placeholder="Rechercher une ville..."
            getOptionLabel={(option) => option.nom}
            getOptionValue={(option) => option.id}
            disabled={!dropdowns.villes || dropdowns.villes.length === 0}
          />

          <SearchableSelect
            label="Réseau de ralliement"
            value={filters.reseauId}
            onChange={(value) => handleFilterChange('reseauId', value)}
            options={dropdowns.reseaux || []}
            placeholder="Rechercher un réseau..."
            getOptionLabel={(option) => option.nom}
            getOptionValue={(option) => option.id}
            disabled={!dropdowns.reseaux || dropdowns.reseaux.length === 0}
          />

          <SearchableSelect
            label="CCT"
            value={filters.cctId}
            onChange={(value) => handleFilterChange('cctId', value)}
            options={dropdowns.ccts || []}
            placeholder="Rechercher un CCT..."
            getOptionLabel={(option) => option.nom}
            getOptionValue={(option) => option.id}
            disabled={!dropdowns.ccts || dropdowns.ccts.length === 0}
          />

          <TextField
            fullWidth
            size="small"
            label="Date CAP"
            type="date"
            value={filters.dateCAP}
            onChange={(e) => handleFilterChange('dateCAP', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            size="small"
            label="Date Expiration CAP"
            type="date"
            value={filters.dateExpirationCAP}
            onChange={(e) => handleFilterChange('dateExpirationCAP', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            size="small"
            label="Année autorisation"
            type="number"
            value={filters.anneeAutorisation}
            onChange={(e) => handleFilterChange('anneeAutorisation', e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
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

        </Box>
      </Paper>



      {/* Section Agents */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Agents
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3
              }}
            >
              + Ajouter Agent
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer sx={{ borderRadius: 1, border: '1px solid #e0e0e0' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Nom agent</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Prénom agent</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>CCT</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Statut administratif</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>CAP</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Date CAP</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Année Autorisation</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Date affectation</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                      <TableCell sx={{ fontWeight: 'medium' }}>{agent.nom || '-'}</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>{agent.prenom || '-'}</TableCell>
                      <TableCell>{agent.cct || '-'}</TableCell>
                      <TableCell>
                        {agent.statutAdministratif ? (
                          <Chip 
                            label={agent.statutAdministratif} 
                            size="small"
                            sx={{
                              backgroundColor: (() => {
                                const status = agent.statutAdministratif.toLowerCase();
                                // Couleurs spécifiques pour les statuts CAP
                                if (status.includes('cap valide')) return '#4caf50'; // Vert
                                if (status.includes('cap en cours')) return '#2196f3'; // Bleu
                                if (status.includes('cap en attente')) return '#ff9800'; // Orange
                                if (status.includes('cap non valide')) return '#f44336'; // Rouge
                                if (status.includes('cap expiré')) return '#9c27b0'; // Violet
                                if (status.includes('cap renouvelé')) return '#00bcd4'; // Cyan
                                if (status.includes('cap suspendu')) return '#ff5722'; // Rouge-orange
                                if (status.includes('cap annulé')) return '#795548'; // Marron
                                // Couleurs par défaut pour les autres statuts
                                if (status.includes('activité') || status.includes('active')) return '#4caf50';
                                if (status.includes('inactif')) return '#f44336';
                                if (status.includes('suspendu')) return '#ff9800';
                                if (status.includes('fermer') || status.includes('fermé')) return '#9e9e9e';
                                return '#1976d2';
                              })(),
                              color: 'white',
                              fontWeight: 'bold',
                              '& .MuiChip-label': {
                                color: 'white'
                              }
                            }}
                          />
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{agent.numeroCAP || '-'}</TableCell>
                      <TableCell>{formatDate(agent.dateCAP)}</TableCell>
                      <TableCell>{agent.anneeAutorisation || '-'}</TableCell>
                      <TableCell>{formatDate(agent.dateAffectationCCT)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Voir les détails">
                            <IconButton
                              color="primary"
                              onClick={() => handleDetails(agent)}
                              sx={{ 
                                backgroundColor: '#e3f2fd',
                                '&:hover': { backgroundColor: '#bbdefb' }
                              }}
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Voir l'historique">
                            <IconButton
                              color="info"
                              onClick={() => handleDetails(agent)}
                              sx={{ 
                                backgroundColor: '#e1f5fe',
                                '&:hover': { backgroundColor: '#b3e5fc' }
                              }}
                            >
                              <HistoryIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Modifier">
                            <IconButton
                              color="secondary"
                              onClick={() => handleEdit(agent)}
                              sx={{ 
                                backgroundColor: '#f3e5f5',
                                '&:hover': { backgroundColor: '#e1bee7' }
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(agent)}
                              sx={{ 
                                backgroundColor: '#ffebee',
                                '&:hover': { backgroundColor: '#ffcdd2' }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Affichage de {((pagination.currentPage - 1) * pagination.pageSize) + 1} à {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} sur {pagination.totalCount} agents
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Éléments par page</InputLabel>
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
              {pagination.pageCount > 1 && (
                <Pagination
                  count={pagination.pageCount}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 1
                    }
                  }}
                />
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Modal de formulaire (ajout/modification) */}
      <AgentFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={async (data) => {
          try {
            if (editingAgent) {
              await agentService.updateAgent(editingAgent.id, data);
              toast.success('Agent modifié avec succès');
              
              // Mettre à jour immédiatement l'état local pour refléter les changements
              // Mapper l'ID du statut vers son libellé pour l'affichage
              const updatedAgent = { ...editingAgent, ...data };
              
              // Trouver le libellé du statut administratif sélectionné
              if (data.statutAdministratifId && dropdowns.statutsAdministratifs) {
                const selectedStatus = dropdowns.statutsAdministratifs.find(
                  status => status.id === parseInt(data.statutAdministratifId)
                );
                if (selectedStatus) {
                  updatedAgent.statutAdministratif = selectedStatus.libelle;
                }
              }
              
              setAgents(prev => prev.map(agent => 
                agent.id === editingAgent.id 
                  ? updatedAgent
                  : agent
              ));
            } else {
              await agentService.createAgent(data);
              toast.success('Agent créé avec succès');
            }
            handleCloseModal();
            
            // Recharger les données pour s'assurer de la cohérence
            if (editingAgent) {
              // Pour la modification, on a déjà mis à jour l'état local
              console.log('Agent modifié localement, pas de rechargement nécessaire');
            } else {
              // Pour la création, recharger pour obtenir l'ID généré
              refreshData();
            }
          } catch (error) {
            console.error('Erreur détaillée:', error);
            if (error.response?.data) {
              console.error('Erreurs de validation:', error.response.data);
              toast.error(`Erreur de validation: ${JSON.stringify(error.response.data)}`);
            } else {
              toast.error(editingAgent ? 'Erreur lors de la modification de l\'agent' : 'Erreur lors de la création de l\'agent');
            }
          }
        }}
        initialValues={editingAgent}
        dropdowns={dropdowns}
      />

      {/* Modal de détails */}
      <AgentDetailsModal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        agent={selectedAgent}
        details={agentDetails}
        onEdit={() => {
          setOpenDetailsModal(false);
          handleEdit(selectedAgent);
        }}
        dropdowns={dropdowns}
      />


    </Box>
  );
} 