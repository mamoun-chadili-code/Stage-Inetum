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
  IconButton,
  Avatar,
  Grid,
  Tooltip
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  History as HistoryIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

export default function AgentDetailsModal({ open, onClose, agent, details, onEdit, dropdowns, activeTab, setActiveTab }) {

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Fonction améliorée pour obtenir la couleur du statut administratif
  const getStatutAdministratifColor = (statutId) => {
    if (!statutId || !dropdowns.statutsAdministratifs) return { bg: '#1976d2', text: 'white' };
    
    const status = dropdowns.statutsAdministratifs.find(s => s.id === statutId);
    if (!status) return { bg: '#1976d2', text: 'white' };
    
    const statusText = status.libelle.toLowerCase();
    
    // Couleurs spécifiques pour les statuts CAP (exactement comme dans le tableau)
    if (statusText.includes('cap valide')) return { bg: '#4caf50', text: 'white' }; // Vert
    if (statusText.includes('cap en cours')) return { bg: '#2196f3', text: 'white' }; // Bleu
    if (statusText.includes('cap en attente')) return { bg: '#ff9800', text: 'white' }; // Orange
    if (statusText.includes('cap non valide')) return { bg: '#f44336', text: 'white' }; // Rouge
    if (statusText.includes('cap expiré')) return { bg: '#9c27b0', text: 'white' }; // Violet
    if (statusText.includes('cap renouvelé')) return { bg: '#00bcd4', text: 'white' }; // Cyan
    if (statusText.includes('cap suspendu')) return { bg: '#ff5722', text: 'white' }; // Rouge-orange
    if (statusText.includes('cap annulé')) return { bg: '#795548', text: 'white' }; // Marron
    
    // Couleurs pour les statuts administratifs (exactement comme dans le tableau)
    if (statusText.includes('activité') || statusText.includes('active')) return { bg: '#4caf50', text: 'white' }; // Vert
    if (statusText.includes('inactif')) return { bg: '#f44336', text: 'white' }; // Rouge
    if (statusText.includes('suspendu')) return { bg: '#ff9800', text: 'white' }; // Orange
    if (statusText.includes('fermer') || statusText.includes('fermé')) return { bg: '#9e9e9e', text: 'white' }; // Gris
    
    return { bg: '#1976d2', text: 'white' }; // Bleu par défaut
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



  // Fonction pour obtenir la couleur de la catégorie CAP
  const getCategorieCAPColor = (categorieId) => {
    if (!categorieId || !dropdowns.categories) return '#757575';
    
    const categorie = dropdowns.categories.find(c => c.id === categorieId);
    if (!categorie) return '#757575';
    
    const categorieColors = {
      'Véhicules toute catégorie': { bg: '#3f51b5', text: 'white' },
      'Véhicules légers': { bg: '#4caf50', text: 'white' },
      'Poids lourds': { bg: '#ff9800', text: 'white' },
      'Motocycles': { bg: '#9c27b0', text: 'white' },
      'Véhicules agricoles': { bg: '#795548', text: 'white' },
      'Véhicules spéciaux': { bg: '#607d8b', text: 'white' }
    };
    
    return categorieColors[categorie.libelle] || { bg: '#757575', text: 'white' };
  };

  // Fonction pour obtenir le libellé de la catégorie CAP
  const getCategorieCAPLabel = () => {
    if (!details.categorieCAPId || !dropdowns.categories) {
      return details.categorieCAP || '-';
    }
    
    const categorie = dropdowns.categories.find(
      c => c.id === details.categorieCAPId
    );
    
    return categorie ? categorie.libelle : details.categorieCAP || '-';
  };

  if (!details) {
    return null;
  }

  const statutColor = getStatutAdministratifColor(details.statutAdministratifId);
  const categorieColor = getCategorieCAPColor(details.categorieCAPId);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xl" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 8,
          minWidth: '1200px',
          width: '95vw',
          maxWidth: '1600px'
        }
      }}
    >
      <DialogTitle sx={{ 
        backgroundColor: '#1976d2', 
        color: 'white',
        borderRadius: '12px 12px 0 0'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 48, height: 48 }}>
              <PersonIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {details.prenom} {details.nom}
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Agent - {details.numeroCAP}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button 
              onClick={onEdit} 
              variant="contained" 
              startIcon={<EditIcon />} 
              sx={{ 
                mr: 1, 
                bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
              }}
            >
              Modifier
            </Button>
            <IconButton onClick={onClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {/* Statut principal avec couleur */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Chip 
            label={getStatutAdministratifLabel()} 
            sx={{ 
              backgroundColor: statutColor.bg,
              color: statutColor.text,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '12px 24px',
              '& .MuiChip-label': { px: 2 }
            }}
            size="large"
          />
        </Box>

        {/* Onglets améliorés */}
        <Box sx={{ 
          borderBottom: 2, 
          borderColor: '#e0e0e0', 
          mb: 4,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Button
            variant={activeTab === 0 ? "contained" : "text"}
            onClick={() => setActiveTab(0)}
            startIcon={<PersonIcon />}
            sx={{ 
              mr: 3, 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold'
            }}
          >
            Informations Générales
          </Button>
          <Button
            variant={activeTab === 1 ? "contained" : "text"}
            onClick={() => setActiveTab(1)}
            startIcon={<HistoryIcon />}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold'
            }}
          >
            Historique
            {details.historique && details.historique.length > 0 && (
              <Chip 
                label={details.historique.length} 
                size="small" 
                sx={{ 
                  ml: 1, 
                  backgroundColor: '#1976d2', 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            )}
          </Button>
        </Box>

        {activeTab === 0 && (
          <Grid container spacing={4}>
            {/* Section 1: Informations d'identification */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    color: '#1976d2',
                    fontWeight: 'bold',
                    mb: 3
                  }}>
                    <BadgeIcon />
                    Informations d'identification
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <PersonIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Nom</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{details.nom}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <PersonIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Prénom</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{details.prenom}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <BadgeIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">CIN</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{details.cin}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AssignmentIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">CNSS</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{details.cnss || '-'}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Section 2: Informations de contact */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    color: '#1976d2',
                    fontWeight: 'bold',
                    mb: 3
                  }}>
                    <PhoneIcon />
                    Informations de contact
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <PhoneIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Téléphone</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{details.tel}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <EmailIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{details.mail || '-'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Adresse</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{details.adresse || '-'}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Section 3: Informations professionnelles */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    color: '#1976d2',
                    fontWeight: 'bold',
                    mb: 3
                  }}>
                    <BusinessIcon />
                    Affectation & CCT
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <WorkIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">CCT</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{details.cct || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Date affectation</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{formatDate(details.dateAffectationCCT)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <BusinessIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Réseau</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{details.reseau || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Ville</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{details.ville || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Année autorisation</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{details.anneeAutorisation}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AssignmentIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Statut administratif</Typography>
                      </Box>
                      <Chip 
                        label={getStatutAdministratifLabel()} 
                        sx={{ 
                          backgroundColor: getStatutAdministratifColor(details.statutAdministratifId).bg,
                          color: getStatutAdministratifColor(details.statutAdministratifId).text,
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}
                        size="small"
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Section 4: Informations CAP */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    color: '#1976d2',
                    fontWeight: 'bold',
                    mb: 3
                  }}>
                    <AssignmentIcon />
                    Permis de conduire (CAP)
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <BadgeIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Numéro CAP</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{details.numeroCAP}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Date CAP</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{formatDate(details.dateCAP)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Date expiration</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{formatDate(details.dateExpirationCAP)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AssignmentIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Catégorie</Typography>
                      </Box>
                      <Chip 
                        label={getCategorieCAPLabel()} 
                        sx={{ 
                          backgroundColor: categorieColor.bg,
                          color: categorieColor.text,
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <BadgeIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">N° renouvellement</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{details.numDecisionRenouv || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="textSecondary">Date renouvellement</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{formatDate(details.dateDecisionRenouv)}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 3
              }}>
                <HistoryIcon />
                Historique des affectations - {details.prenom} {details.nom}
              </Typography>

              {Array.isArray(details.historique) && details.historique.length > 0 ? (
                <>
                  {/* Debug: Afficher la structure des données */}
                  {console.log('🔍 Debug - Historique reçu:', details.historique)}
                  {console.log('🔍 Debug - Premier item:', details.historique[0])}
                <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>CCT</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Date Affectation</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Date Fin</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Date Mise à Jour</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {details.historique.map((item, index) => (
                        <TableRow 
                          key={index} 
                          sx={{ 
                            '&:hover': { backgroundColor: '#f8f9fa' },
                            '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
                          }}
                        >
                                                    <TableCell sx={{ fontWeight: 'medium' }}>{item.cctNom || '-'}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{formatDate(item.dateDebutAffectation)}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{formatDate(item.dateFinAffectation)}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{formatDate(item.dateMiseAJour)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                                  </TableContainer>
                  </>
                ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 6,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 3
                }}>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    📋 Aucun historique disponible
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cet agent n'a pas encore d'historique d'affectation.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            px: 3
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 