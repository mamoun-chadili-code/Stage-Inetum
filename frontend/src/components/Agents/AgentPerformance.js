import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Rating,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Slider,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function AgentPerformance({ agents = [] }) {
  const [evaluations, setEvaluations] = useState([]);
  const [objectifs, setObjectifs] = useState([]);
  const [openEvaluationDialog, setOpenEvaluationDialog] = useState(false);
  const [openObjectifDialog, setOpenObjectifDialog] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [selectedObjectif, setSelectedObjectif] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Critères d'évaluation
  const evaluationCriteria = [
    { key: 'productivite', label: 'Productivité', description: 'Efficacité dans l\'exécution des tâches' },
    { key: 'qualite', label: 'Qualité du travail', description: 'Précision et excellence du travail fourni' },
    { key: 'ponctualite', label: 'Ponctualité', description: 'Respect des horaires et délais' },
    { key: 'communication', label: 'Communication', description: 'Clarté et efficacité de la communication' },
    { key: 'equipe', label: 'Travail d\'équipe', description: 'Collaboration et esprit d\'équipe' },
    { key: 'initiative', label: 'Initiative', description: 'Proactivité et prise d\'initiative' },
    { key: 'adaptabilite', label: 'Adaptabilité', description: 'Flexibilité face aux changements' },
    { key: 'formation', label: 'Formation continue', description: 'Développement des compétences' }
  ];

  // Types d'objectifs
  const objectifTypes = [
    'Quantitatif',
    'Qualitatif',
    'Comportemental',
    'Formation',
    'Performance',
    'Client'
  ];

  // Statuts des objectifs
  const objectifStatuses = [
    { value: 'not_started', label: 'Non commencé', color: '#9e9e9e' },
    { value: 'in_progress', label: 'En cours', color: '#2196f3' },
    { value: 'completed', label: 'Terminé', color: '#4caf50' },
    { value: 'overdue', label: 'En retard', color: '#f44336' }
  ];

  useEffect(() => {
    generateSampleData();
  }, [agents]);

  const generateSampleData = () => {
    // Générer des données d'exemple pour les évaluations
    const sampleEvaluations = agents.flatMap(agent => {
      const agentEvaluations = [];
      const numEvaluations = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numEvaluations; i++) {
        const evaluationDate = new Date();
        evaluationDate.setDate(evaluationDate.getDate() - Math.floor(Math.random() * 90));
        
        const scores = {};
        evaluationCriteria.forEach(criterion => {
          scores[criterion.key] = Math.floor(Math.random() * 3) + 3; // Score entre 3 et 5
        });
        
        const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
        
        agentEvaluations.push({
          id: `${agent.id}_evaluation_${i}`,
          agentId: agent.id,
          agentName: `${agent.nom} ${agent.prenom}`,
          date: evaluationDate.toISOString().split('T')[0],
          evaluator: `Évaluateur ${Math.floor(Math.random() * 5) + 1}`,
          scores: scores,
          averageScore: Math.round(averageScore * 10) / 10,
          commentaires: Math.random() > 0.3 ? 'Agent performant avec de bonnes perspectives d\'évolution' : 'À améliorer sur certains aspects',
          recommandations: Math.random() > 0.5 ? 'Formation recommandée en communication' : 'Maintenir le niveau actuel'
        });
      }
      return agentEvaluations;
    });

    // Générer des données d'exemple pour les objectifs
    const sampleObjectifs = agents.flatMap(agent => {
      const agentObjectifs = [];
      const numObjectifs = Math.floor(Math.random() * 2) + 1;
      
      for (let i = 0; i < numObjectifs; i++) {
        const objectifType = objectifTypes[Math.floor(Math.random() * objectifTypes.length)];
        const status = objectifStatuses[Math.floor(Math.random() * objectifStatuses.length)];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 60) + 30);
        
        const progress = Math.floor(Math.random() * 100);
        
        agentObjectifs.push({
          id: `${agent.id}_objectif_${i}`,
          agentId: agent.id,
          agentName: `${agent.nom} ${agent.prenom}`,
          titre: `Objectif ${objectifType} ${i + 1}`,
          description: `Améliorer les performances dans le domaine ${objectifType.toLowerCase()}`,
          type: objectifType,
          status: status.value,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          progress: progress,
          priorite: Math.random() > 0.5 ? 'Haute' : 'Normale',
          notes: Math.random() > 0.7 ? 'Objectif prioritaire pour l\'équipe' : ''
        });
      }
      return agentObjectifs;
    });

    setEvaluations(sampleEvaluations);
    setObjectifs(sampleObjectifs);
  };

  const handleAddEvaluation = (agent) => {
    setSelectedAgent(agent);
    setSelectedEvaluation(null);
    setOpenEvaluationDialog(true);
  };

  const handleEditEvaluation = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setSelectedAgent(agents.find(a => a.id === evaluation.agentId));
    setOpenEvaluationDialog(true);
  };

  const handleDeleteEvaluation = (evaluationId) => {
    setEvaluations(prev => prev.filter(e => e.id !== evaluationId));
    toast.success('Évaluation supprimée avec succès');
  };

  const handleAddObjectif = (agent) => {
    setSelectedAgent(agent);
    setSelectedObjectif(null);
    setOpenObjectifDialog(true);
  };

  const handleEditObjectif = (objectif) => {
    setSelectedObjectif(objectif);
    setSelectedAgent(agents.find(a => a.id === objectif.agentId));
    setOpenObjectifDialog(true);
  };

  const handleDeleteObjectif = (objectifId) => {
    setObjectifs(prev => prev.filter(o => o.id !== objectifId));
    toast.success('Objectif supprimé avec succès');
  };

  const saveEvaluation = () => {
    if (selectedEvaluation) {
      // Modification
      setEvaluations(prev => prev.map(e => 
        e.id === selectedEvaluation.id ? selectedEvaluation : e
      ));
      toast.success('Évaluation modifiée avec succès');
    } else {
      // Création
      const scores = {};
      evaluationCriteria.forEach(criterion => {
        scores[criterion.key] = selectedEvaluation?.scores?.[criterion.key] || 3;
      });
      
      const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
      
      const newEvaluation = {
        id: `evaluation_${Date.now()}`,
        agentId: selectedAgent.id,
        agentName: `${selectedAgent.nom} ${selectedAgent.prenom}`,
        date: selectedEvaluation?.date || new Date().toISOString().split('T')[0],
        evaluator: selectedEvaluation?.evaluator || '',
        scores: scores,
        averageScore: Math.round(averageScore * 10) / 10,
        commentaires: selectedEvaluation?.commentaires || '',
        recommandations: selectedEvaluation?.recommandations || ''
      };
      setEvaluations(prev => [...prev, newEvaluation]);
      toast.success('Évaluation ajoutée avec succès');
    }
    setOpenEvaluationDialog(false);
    setSelectedEvaluation(null);
    setSelectedAgent(null);
  };

  const saveObjectif = () => {
    if (selectedObjectif) {
      // Modification
      setObjectifs(prev => prev.map(o => 
        o.id === selectedObjectif.id ? selectedObjectif : o
      ));
      toast.success('Objectif modifié avec succès');
    } else {
      // Création
      const newObjectif = {
        id: `objectif_${Date.now()}`,
        agentId: selectedAgent.id,
        agentName: `${selectedAgent.nom} ${selectedAgent.prenom}`,
        titre: selectedObjectif?.titre || '',
        description: selectedObjectif?.description || '',
        type: selectedObjectif?.type || objectifTypes[0],
        status: selectedObjectif?.status || 'not_started',
        startDate: selectedObjectif?.startDate || '',
        endDate: selectedObjectif?.endDate || '',
        progress: selectedObjectif?.progress || 0,
        priorite: selectedObjectif?.priorite || 'Normale',
        notes: selectedObjectif?.notes || ''
      };
      setObjectifs(prev => [...prev, newObjectif]);
      toast.success('Objectif ajouté avec succès');
    }
    setOpenObjectifDialog(false);
    setSelectedObjectif(null);
    setSelectedAgent(null);
  };

  const getStatusColor = (status, statusList) => {
    const statusObj = statusList.find(s => s.value === status);
    return statusObj ? statusObj.color : '#757575';
  };

  const getStatusLabel = (status, statusList) => {
    const statusObj = statusList.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return '#4caf50';
    if (score >= 4) return '#8bc34a';
    if (score >= 3.5) return '#ff9800';
    return '#f44336';
  };

  const getScoreLabel = (score) => {
    if (score >= 4.5) return 'Excellent';
    if (score >= 4) return 'Très bien';
    if (score >= 3.5) return 'Bien';
    if (score >= 3) return 'Moyen';
    return 'À améliorer';
  };

  return (
    <Box>
      {/* En-tête */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TrendingUpIcon sx={{ color: '#1976d2', fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Gestion des Performances
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Évaluez les performances de vos agents et suivez leurs objectifs pour optimiser leur développement
        </Typography>
      </Paper>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                  <AssessmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {evaluations.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Évaluations
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ backgroundColor: '#e8f5e8', color: '#4caf50' }}>
                  <CheckCircleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {objectifs.filter(o => o.status === 'completed').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Objectifs atteints
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ backgroundColor: '#fff3e0', color: '#ff9800' }}>
                  <WarningIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {objectifs.filter(o => o.status === 'overdue').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    En retard
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ backgroundColor: '#fce4ec', color: '#e91e63' }}>
                  <StarIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {evaluations.length > 0 
                      ? Math.round(evaluations.reduce((sum, e) => sum + e.averageScore, 0) / evaluations.length * 10) / 10
                      : 0
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Score moyen
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Évaluations */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Évaluations des Performances
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Agent</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Évaluateur</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Score moyen</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Appréciation</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {evaluations.map((evaluation) => (
                <TableRow key={evaluation.id} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                      {evaluation.agentName}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>{evaluation.date}</TableCell>
                  
                  <TableCell>{evaluation.evaluator}</TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: getScoreColor(evaluation.averageScore)
                        }}
                      >
                        {evaluation.averageScore}/5
                      </Typography>
                      <Chip
                        label={getScoreLabel(evaluation.averageScore)}
                        size="small"
                        sx={{
                          backgroundColor: getScoreColor(evaluation.averageScore),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                      {evaluation.commentaires}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Modifier">
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={() => handleEditEvaluation(evaluation)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteEvaluation(evaluation.id)}
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
      </Paper>

      {/* Objectifs */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Objectifs et Suivi
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Agent</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Objectif</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Statut</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Progression</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Priorité</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {objectifs.map((objectif) => (
                <TableRow key={objectif.id} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                      {objectif.agentName}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {objectif.titre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {objectif.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>{objectif.type}</TableCell>
                  
                  <TableCell>
                    <Chip
                      label={getStatusLabel(objectif.status, objectifStatuses)}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(objectif.status, objectifStatuses),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ minWidth: 150 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{objectif.progress}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={objectif.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: objectif.progress >= 100 ? '#4caf50' : '#1976d2'
                          }
                        }}
                      />
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={objectif.priorite}
                      size="small"
                      sx={{
                        backgroundColor: objectif.priorite === 'Haute' ? '#ffebee' : '#e8f5e8',
                        color: objectif.priorite === 'Haute' ? '#d32f2f' : '#2e7d32',
                        fontWeight: 'bold'
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Modifier">
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={() => handleEditObjectif(objectif)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteObjectif(objectif.id)}
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
      </Paper>

      {/* Dialog Évaluation */}
      <Dialog open={openEvaluationDialog} onClose={() => setOpenEvaluationDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedEvaluation ? 'Modifier l\'Évaluation' : 'Ajouter une Évaluation'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Agent : {selectedAgent?.nom} {selectedAgent?.prenom}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date d'évaluation"
                  type="date"
                  value={selectedEvaluation?.date || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedEvaluation(prev => ({ ...prev, date: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Évaluateur"
                  value={selectedEvaluation?.evaluator || ''}
                  onChange={(e) => setSelectedEvaluation(prev => ({ ...prev, evaluator: e.target.value }))}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Critères d'évaluation
              </Typography>
            </Divider>

            {evaluationCriteria.map((criterion) => (
              <Box key={criterion.key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {criterion.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {criterion.description}
                  </Typography>
                </Box>
                <Rating
                  value={selectedEvaluation?.scores?.[criterion.key] || 3}
                  onChange={(e, newValue) => {
                    setSelectedEvaluation(prev => ({
                      ...prev,
                      scores: {
                        ...prev?.scores,
                        [criterion.key]: newValue || 3
                      }
                    }));
                  }}
                  max={5}
                />
                <Typography variant="body2" sx={{ minWidth: 30 }}>
                  {selectedEvaluation?.scores?.[criterion.key] || 3}/5
                </Typography>
              </Box>
            ))}

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Commentaires généraux"
              value={selectedEvaluation?.commentaires || ''}
              onChange={(e) => setSelectedEvaluation(prev => ({ ...prev, commentaires: e.target.value }))}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Recommandations"
              value={selectedEvaluation?.recommandations || ''}
              onChange={(e) => setSelectedEvaluation(prev => ({ ...prev, recommandations: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEvaluationDialog(false)}>Annuler</Button>
          <Button onClick={saveEvaluation} variant="contained">
            {selectedEvaluation ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Objectif */}
      <Dialog open={openObjectifDialog} onClose={() => setOpenObjectifDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedObjectif ? 'Modifier l\'Objectif' : 'Ajouter un Objectif'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Agent : {selectedAgent?.nom} {selectedAgent?.prenom}
            </Typography>
            
            <TextField
              fullWidth
              label="Titre de l'objectif"
              value={selectedObjectif?.titre || ''}
              onChange={(e) => setSelectedObjectif(prev => ({ ...prev, titre: e.target.value }))}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={selectedObjectif?.description || ''}
              onChange={(e) => setSelectedObjectif(prev => ({ ...prev, description: e.target.value }))}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Type d'objectif</InputLabel>
                  <Select
                    value={selectedObjectif?.type || objectifTypes[0]}
                    onChange={(e) => setSelectedObjectif(prev => ({ ...prev, type: e.target.value }))}
                  >
                    {objectifTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={selectedObjectif?.status || 'not_started'}
                    onChange={(e) => setSelectedObjectif(prev => ({ ...prev, status: e.target.value }))}
                  >
                    {objectifStatuses.map((status) => (
                      <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date de début"
                  type="date"
                  value={selectedObjectif?.startDate || ''}
                  onChange={(e) => setSelectedObjectif(prev => ({ ...prev, startDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date de fin"
                  type="date"
                  value={selectedObjectif?.endDate || ''}
                  onChange={(e) => setSelectedObjectif(prev => ({ ...prev, endDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography variant="body2" gutterBottom>
                Progression : {selectedObjectif?.progress || 0}%
              </Typography>
              <Slider
                value={selectedObjectif?.progress || 0}
                onChange={(e, newValue) => setSelectedObjectif(prev => ({ ...prev, progress: newValue }))}
                aria-label="Progression"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
              />
            </Box>

            <FormControl fullWidth>
              <InputLabel>Priorité</InputLabel>
              <Select
                value={selectedObjectif?.priorite || 'Normale'}
                onChange={(e) => setSelectedObjectif(prev => ({ ...prev, priorite: e.target.value }))}
              >
                <MenuItem value="Basse">Basse</MenuItem>
                <MenuItem value="Normale">Normale</MenuItem>
                <MenuItem value="Haute">Haute</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              value={selectedObjectif?.notes || ''}
              onChange={(e) => setSelectedObjectif(prev => ({ ...prev, notes: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenObjectifDialog(false)}>Annuler</Button>
          <Button onClick={saveObjectif} variant="contained">
            {selectedObjectif ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
