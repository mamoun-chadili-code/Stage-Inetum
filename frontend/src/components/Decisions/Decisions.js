import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Decisions() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [decisions, setDecisions] = useState([]); // À remplacer par données API
  const [form, setForm] = useState({ type: '', description: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Gestion des Décisions / Sanctions</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <TextField label="Recherche" value={search} onChange={e => setSearch(e.target.value)} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Ajouter</Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {decisions.filter(d => d.type?.toLowerCase().includes(search.toLowerCase())).map((decision, idx) => (
            <TableRow key={idx}>
              <TableCell>{decision.type}</TableCell>
              <TableCell>{decision.description}</TableCell>
              <TableCell>
                <IconButton color="primary"><EditIcon /></IconButton>
                <IconButton color="error"><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter une Décision / Sanction</DialogTitle>
        <DialogContent>
          <TextField label="Type" name="type" value={form.type} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button variant="contained" onClick={handleClose}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 