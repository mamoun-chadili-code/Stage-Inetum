import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  PrivacyTip as PrivacyTipIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export default function AgentReports({ agents, ccts, categoriesCAP, onGenerateReport }) {
  const [activeTab, setActiveTab] = useState(0);
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedCCT, setSelectedCCT] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [generating, setGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const reportTypes = [
    { value: 'summary', label: 'Résumé Général', icon: AssessmentIcon },
    { value: 'performance', label: 'Performance', icon: TrendingUpIcon },
    { value: 'compliance', label: 'Conformité', icon: CheckCircleIcon },
    { value: 'geographic', label: 'Répartition Géographique', icon: LocationIcon },
    { value: 'temporal', label: 'Évolution Temporelle', icon: CalendarIcon },
    { value: 'custom', label: 'Rapport Personnalisé', icon: AssessmentIcon }
  ];

  const generateReport = async () => {
    setGenerating(true);
    try {
      // Simulation de génération de rapport
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = generateReportData();
      setReportData(data);
      setOpenPreview(true);
      
      if (onGenerateReport) {
        onGenerateReport(data);
      }
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
    } finally {
      setGenerating(false);
    }
  };

  const generateReportData = () => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    
    // Données d'évolution mensuelle
    const evolutionData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
      const monthAgents = agents.filter(agent => {
        const agentDate = new Date(agent.dateAffectationCCT || agent.dateCAP);
        return agentDate.getMonth() === date.getMonth() && agentDate.getFullYear() === date.getFullYear();
      }).length;
      
      evolutionData.push({
        mois: monthName,
        agents: monthAgents,
        croissance: i > 0 ? ((monthAgents / Math.max(1, evolutionData[evolutionData.length - 1]?.agents || 1)) - 1) * 100 : 0
      });
    }

    // Répartition par CCT
    const cctData = ccts?.map(cct => ({
      name: cct.nom,
      agents: agents.filter(a => a.cctId === cct.id).length,
      pourcentage: (agents.filter(a => a.cctId === cct.id).length / Math.max(1, agents.length)) * 100
    })).filter(item => item.agents > 0) || [];

    // Répartition par catégorie CAP
    const categoryData = categoriesCAP?.map(cat => ({
      name: cat.nom,
      agents: agents.filter(a => a.categorieCAPId === cat.id).length,
      pourcentage: (agents.filter(a => a.categorieCAPId === cat.id).length / Math.max(1, agents.length)) * 100
    })).filter(item => item.agents > 0) || [];

    // Indicateurs de performance
    const performanceIndicators = {
      totalAgents: agents.length,
      agentsActifs: agents.filter(a => a.statutAdministratifId === 1).length,
      agentsInactifs: agents.filter(a => a.statutAdministratifId === 2).length,
      tauxActifs: (agents.filter(a => a.statutAdministratifId === 1).length / Math.max(1, agents.length)) * 100,
      capExpirant: agents.filter(a => {
        if (!a.dateExpirationCAP) return false;
        const dateExp = new Date(a.dateExpirationCAP);
        const troisMois = new Date();
        troisMois.setMonth(troisMois.getMonth() + 3);
        return dateExp <= troisMois;
      }).length,
      agentsSansCCT: agents.filter(a => !a.cctId).length,
      agentsSansEmail: agents.filter(a => !a.mail).length
    };

    // Alertes et recommandations
    const alerts = [];
    if (performanceIndicators.capExpirant > 0) {
      alerts.push({
        type: 'warning',
        message: `${performanceIndicators.capExpirant} agent(s) ont un CAP qui expire dans les 3 mois`,
        priority: 'high'
      });
    }
    if (performanceIndicators.agentsSansCCT > 0) {
      alerts.push({
        type: 'info',
        message: `${performanceIndicators.agentsSansCCT} agent(s) ne sont pas affectés à un CCT`,
        priority: 'medium'
      });
    }
    if (performanceIndicators.agentsSansEmail > 0) {
      alerts.push({
        type: 'warning',
        message: `${performanceIndicators.agentsSansEmail} agent(s) n'ont pas d'adresse email`,
        priority: 'medium'
      });
    }

    return {
      type: reportType,
      dateRange,
      generatedAt: new Date().toISOString(),
      evolutionData,
      cctData,
      categoryData,
      performanceIndicators,
      alerts,
      summary: generateSummary(performanceIndicators, alerts)
    };
  };

  const generateSummary = (indicators, alerts) => {
    let summary = `Rapport des Agents - ${new Date().toLocaleDateString('fr-FR')}\n\n`;
    summary += `Total des agents: ${indicators.totalAgents}\n`;
    summary += `Agents actifs: ${indicators.agentsActifs} (${indicators.tauxActifs.toFixed(1)}%)\n`;
    summary += `Agents inactifs: ${indicators.agentsInactifs}\n`;
    summary += `CAP expirant (3 mois): ${indicators.capExpirant}\n`;
    summary += `Agents sans CCT: ${indicators.agentsSansCCT}\n`;
    summary += `Agents sans email: ${indicators.agentsSansEmail}\n\n`;
    
    if (alerts.length > 0) {
      summary += `Alertes:\n`;
      alerts.forEach(alert => {
        summary += `- ${alert.message}\n`;
      });
    }
    
    return summary;
  };

  const exportReport = (format) => {
    if (!reportData) return;
    
    let content = '';
    let filename = `rapport_agents_${new Date().toISOString().split('T')[0]}`;
    let mimeType = '';
    
    if (format === 'txt') {
      content = reportData.summary;
      filename += '.txt';
      mimeType = 'text/plain';
    } else if (format === 'csv') {
      content = generateCSV(reportData);
      filename += '.csv';
      mimeType = 'text/csv';
    } else if (format === 'json') {
      content = JSON.stringify(reportData, null, 2);
      filename += '.json';
      mimeType = 'application/json';
    }
    
    downloadFile(content, filename, mimeType);
  };

  const generateCSV = (data) => {
    let csv = 'Indicateur,Valeur\n';
    csv += `Total Agents,${data.performanceIndicators.totalAgents}\n`;
    csv += `Agents Actifs,${data.performanceIndicators.agentsActifs}\n`;
    csv += `Agents Inactifs,${data.performanceIndicators.agentsInactifs}\n`;
    csv += `Taux Actifs,${data.performanceIndicators.tauxActifs.toFixed(1)}%\n`;
    csv += `CAP Expirant,${data.performanceIndicators.capExpirant}\n`;
    csv += `Sans CCT,${data.performanceIndicators.agentsSansCCT}\n`;
    csv += `Sans Email,${data.performanceIndicators.agentsSansEmail}\n`;
    return csv;
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <Box sx={{ mb: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <AssessmentIcon />
          Rapports et Analyses
        </Typography>

        {/* Configuration du rapport */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Type de rapport</InputLabel>
              <Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                label="Type de rapport"
              >
                {reportTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <type.icon fontSize="small" />
                      {type.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Date de début"
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Date de fin"
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={generateReport}
              disabled={generating}
              startIcon={generating ? <CircularProgress size={20} /> : <AssessmentIcon />}
              sx={{ height: 56 }}
            >
              {generating ? 'Génération...' : 'Générer Rapport'}
            </Button>
          </Grid>
        </Grid>

        {/* Filtres supplémentaires */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>CCT spécifique</InputLabel>
              <Select
                value={selectedCCT}
                onChange={(e) => setSelectedCCT(e.target.value)}
                label="CCT spécifique"
              >
                <MenuItem value="">Tous les CCTs</MenuItem>
                {ccts?.map(cct => (
                  <MenuItem key={cct.id} value={cct.id}>
                    {cct.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Catégorie CAP</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Catégorie CAP"
              >
                <MenuItem value="">Toutes les catégories</MenuItem>
                {categoriesCAP?.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Aperçu des données */}
        {reportData && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Aperçu du Rapport
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Indicateurs Clés
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <PeopleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Agents"
                          secondary={reportData.performanceIndicators.totalAgents}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Taux d'Activité"
                          secondary={`${reportData.performanceIndicators.tauxActifs.toFixed(1)}%`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <WarningIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText
                          primary="CAP Expirant"
                          secondary={reportData.performanceIndicators.capExpirant}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Évolution Mensuelle
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={reportData.evolutionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mois" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="agents" stroke="#1976d2" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Actions sur le rapport */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => exportReport('txt')}
              >
                Exporter TXT
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => exportReport('csv')}
              >
                Exporter CSV
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => exportReport('json')}
              >
                Exporter JSON
              </Button>
              <Button
                variant="contained"
                startIcon={<PrintIcon />}
                onClick={() => window.print()}
              >
                Imprimer
              </Button>
            </Box>
          </Box>
        )}

        {/* Alertes et recommandations */}
        {reportData?.alerts && reportData.alerts.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Alertes et Recommandations
            </Typography>
            <Grid container spacing={2}>
              {reportData.alerts.map((alert, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Alert 
                    severity={alert.type} 
                    icon={alert.type === 'warning' ? <WarningIcon /> : <PrivacyTipIcon />}
                    sx={{ mb: 1 }}
                  >
                    {alert.message}
                  </Alert>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Modal de prévisualisation */}
      <Dialog 
        open={openPreview} 
        onClose={() => setOpenPreview(false)} 
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">
            Prévisualisation du Rapport - {reportTypes.find(t => t.value === reportType)?.label}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {reportData && (
            <Box>
              <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {reportData.summary}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreview(false)}>
            Fermer
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => exportReport('txt')}
          >
            Télécharger
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
