import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  History as HistoryIcon
} from '@mui/icons-material';

export default function AgentDetailsModal({ open, onClose, agent, details, onEdit, dropdowns }) {
  const [activeTab, setActiveTab] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Fonction pour obtenir le statut CAP avec sa couleur
  const getStatusColor = (statusText) => {
    if (!statusText) return 'default';
    
    const statusColors = {
      'CAP VALIDE': '#4caf50',
      'CAP EN COURS': '#2196f3',
      'CAP EN ATTENTE': '#ff9800',
      'CAP NON VALIDE': '#f44336',
      'CAP EXPIRÉ': '#9c27b0',
      'CAP RENOUVELÉ': '#00bcd4',
      'CAP SUSPENDU': '#ff5722',
      'CAP ANNULÉ': '#795548'
    };
    
    return statusColors[statusText] || 'default';
  };

  // Fonction pour obtenir le libellé du statut administratif
  const getStatutAdministratifLabel = () => {
    if (!details.statutAdministratifId || !dropdowns.statutsAdministratifs) {
      return details.statutAdministratif || '-';
    }
    
    const status = dropdowns.statutsAdministratifs.find(
      s => s.id === details.statutAdministratifId
    );
    
    return status ? status.libelle : details.statutAdministratif || '-';
  };

  if (!details) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Détails de l'Agent
          </Typography>
          <Box>
            <Button onClick={onEdit} variant="contained" startIcon={<EditIcon />} sx={{ mr: 1 }}>
              Saisir
            </Button>
            <Button onClick={onClose} startIcon={<CloseIcon />}>
              Fermer
            </Button>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon />
            {details.prenom} {details.nom}
          </Typography>
        </Box>

        {/* Onglets */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Button
            variant={activeTab === 0 ? "contained" : "text"}
            onClick={() => setActiveTab(0)}
            startIcon={<PersonIcon />}
            sx={{ mr: 2 }}
          >
            Informations
          </Button>
          <Button
            variant={activeTab === 1 ? "contained" : "text"}
            onClick={() => setActiveTab(1)}
            startIcon={<HistoryIcon />}
          >
            Historique
          </Button>
        </Box>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Informations personnelles */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    Informations personnelles
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Nom agent</Typography>
                      <Typography variant="body1">{details.nom}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Prénom agent</Typography>
                      <Typography variant="body1">{details.prenom}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">CIN</Typography>
                      <Typography variant="body1">{details.cin}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">CNSS</Typography>
                      <Typography variant="body1">{details.cnss || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Tel</Typography>
                      <Typography variant="body1">{details.tel}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Mail</Typography>
                      <Typography variant="body1">{details.mail || '-'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">Adresse</Typography>
                      <Typography variant="body1">{details.adresse || '-'}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Informations professionnelles */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkIcon />
                    Informations professionnelles
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">CCT</Typography>
                      <Typography variant="body1">{details.cct || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Date affectation</Typography>
                      <Typography variant="body1">{formatDate(details.dateAffectationCCT)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Réseau</Typography>
                      <Typography variant="body1">{details.reseau || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Ville</Typography>
                      <Typography variant="body1">{details.ville || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Statut Administratif</Typography>
                      <Chip 
                        label={getStatutAdministratifLabel()} 
                        sx={{ 
                          backgroundColor: getStatusColor(getStatutAdministratifLabel()),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                        size="small" 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Année Autorisation</Typography>
                      <Typography variant="body1">{details.anneeAutorisation}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">CAP</Typography>
                      <Typography variant="body1">{details.numeroCAP}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Date CAP</Typography>
                      <Typography variant="body1">{formatDate(details.dateCAP)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Date Expiration CAP</Typography>
                      <Typography variant="body1">{formatDate(details.dateExpirationCAP)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Catégorie</Typography>
                      <Typography variant="body1">{details.categorieCAP || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">N° renouvellement CAP</Typography>
                      <Typography variant="body1">{details.numDecisionRenouv || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">Date renouvellement CAP</Typography>
                      <Typography variant="body1">{formatDate(details.dateDecisionRenouv)}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon />
                Historique Agent [{details.prenom} {details.nom}]
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {Array.isArray(details.historique) && details.historique.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>CCT</TableCell>
                        <TableCell>Date Début Affectation</TableCell>
                        <TableCell>Date Fin Affectation</TableCell>
                        <TableCell>Date Mise à Jour</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {details.historique.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.cct || '-'}</TableCell>
                          <TableCell>{formatDate(item.dateDebutAffectation)}</TableCell>
                          <TableCell>{formatDate(item.dateFinAffectation)}</TableCell>
                          <TableCell>{formatDate(item.dateMiseAJour)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
                  Aucun historique disponible pour cet agent.
                </Typography>
              )}
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
} 