import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Typography,
  Box,
  Divider,
  Chip
} from '@mui/material';
import {
  FileDownload as FileDownloadIcon,
  TableChart as TableChartIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function AgentExport({ agents, open, onClose }) {
  const [exportFormat, setExportFormat] = useState('excel');
  const [selectedFields, setSelectedFields] = useState([
    'nom', 'prenom', 'cin', 'tel', 'mail', 'cnss', 'cct', 'numeroCAP', 'dateCAP', 'dateExpirationCAP'
  ]);

  const allFields = [
    { key: 'nom', label: 'Nom', required: true },
    { key: 'prenom', label: 'Prénom', required: true },
    { key: 'cin', label: 'CIN', required: true },
    { key: 'tel', label: 'Téléphone', required: false },
    { key: 'mail', label: 'Email', required: false },
    { key: 'cnss', label: 'CNSS', required: false },
    { key: 'cct', label: 'CCT', required: false },
    { key: 'numeroCAP', label: 'Numéro CAP', required: false },
    { key: 'dateCAP', label: 'Date CAP', required: false },
    { key: 'dateExpirationCAP', label: 'Date Expiration CAP', required: false },
    { key: 'categorieCAP', label: 'Catégorie CAP', required: false },
    { key: 'dateAffectationCCT', label: 'Date Affectation CCT', required: false },
    { key: 'anneeAutorisation', label: 'Année Autorisation', required: false },
    { key: 'statutAdministratif', label: 'Statut Administratif', required: false },
    { key: 'adresse', label: 'Adresse', required: false }
  ];

  const handleFieldToggle = (fieldKey) => {
    setSelectedFields(prev => {
      if (prev.includes(fieldKey)) {
        // Ne pas permettre de désélectionner les champs requis
        const field = allFields.find(f => f.key === fieldKey);
        if (field?.required) return prev;
        return prev.filter(f => f !== fieldKey);
      } else {
        return [...prev, fieldKey];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedFields(allFields.map(f => f.key));
  };

  const handleDeselectAll = () => {
    setSelectedFields(allFields.filter(f => f.required).map(f => f.key));
  };

  const exportData = async () => {
    try {
      if (selectedFields.length === 0) {
        toast.error('Veuillez sélectionner au moins un champ à exporter');
        return;
      }

      // Filtrer les agents selon les champs sélectionnés
      const exportData = agents.map(agent => {
        const exportAgent = {};
        selectedFields.forEach(field => {
          exportAgent[field] = agent[field] || '';
        });
        return exportAgent;
      });

      if (exportFormat === 'excel') {
        await exportToExcel(exportData);
      } else if (exportFormat === 'csv') {
        await exportToCSV(exportData);
      } else if (exportFormat === 'pdf') {
        await exportToPDF(exportData);
      }

      toast.success('Export réalisé avec succès !');
      onClose();
    } catch (error) {
      console.error('Erreur export:', error);
      toast.error('Erreur lors de l\'export');
    }
  };

  const exportToExcel = async (data) => {
    // Simulation d'export Excel - dans un vrai projet, utilisez une librairie comme xlsx
    const worksheet = data.map(row => 
      selectedFields.map(field => row[field])
    );
    
    const headers = selectedFields.map(field => 
      allFields.find(f => f.key === field)?.label || field
    );
    
    const csvContent = [headers, ...worksheet]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    downloadFile(csvContent, 'agents.xlsx', 'text/csv');
  };

  const exportToCSV = async (data) => {
    const headers = selectedFields.map(field => 
      allFields.find(f => f.key === field)?.label || field
    );
    
    const csvContent = [headers, ...data.map(row => 
      selectedFields.map(field => row[field])
    )]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    downloadFile(csvContent, 'agents.csv', 'text/csv');
  };

  const exportToPDF = async (data) => {
    // Simulation d'export PDF - dans un vrai projet, utilisez une librairie comme jsPDF
    const headers = selectedFields.map(field => 
      allFields.find(f => f.key === field)?.label || field
    );
    
    let pdfContent = '=== EXPORT AGENTS ===\n\n';
    data.forEach((agent, index) => {
      pdfContent += `Agent ${index + 1}:\n`;
      selectedFields.forEach(field => {
        const label = allFields.find(f => f.key === field)?.label || field;
        pdfContent += `  ${label}: ${agent[field]}\n`;
      });
      pdfContent += '\n';
    });
    
    downloadFile(pdfContent, 'agents.pdf', 'text/plain');
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FileDownloadIcon color="primary" />
          <Typography variant="h6">Exporter les Agents</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Format d'export
          </Typography>
          <RadioGroup
            row
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
          >
            <FormControlLabel
              value="excel"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TableChartIcon color="primary" />
                  Excel
                </Box>
              }
            />
            <FormControlLabel
              value="csv"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon color="primary" />
                  CSV
                </Box>
              }
            />
            <FormControlLabel
              value="pdf"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon color="primary" />
                  PDF
                </Box>
              }
            />
          </RadioGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">
              Champs à exporter
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" onClick={handleSelectAll}>
                Tout sélectionner
              </Button>
              <Button size="small" onClick={handleDeselectAll}>
                Désélectionner tout
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
            {allFields.map((field) => (
              <FormControlLabel
                key={field.key}
                control={
                  <Checkbox
                    checked={selectedFields.includes(field.key)}
                    onChange={() => handleFieldToggle(field.key)}
                    disabled={field.required}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {field.label}
                    {field.required && (
                      <Chip label="Requis" size="small" color="primary" />
                    )}
                  </Box>
                }
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2" color="textSecondary">
            <strong>Résumé :</strong> {agents.length} agent(s) seront exportés avec {selectedFields.length} champ(s) sélectionné(s)
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Annuler
        </Button>
        <Button
          onClick={exportData}
          variant="contained"
          startIcon={<FileDownloadIcon />}
          disabled={selectedFields.length === 0}
        >
          Exporter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
