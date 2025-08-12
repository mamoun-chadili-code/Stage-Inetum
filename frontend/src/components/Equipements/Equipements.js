import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Equipements() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [equipements, setEquipements] = useState([]); // À remplacer par données API
  const [form, setForm] = useState({ code: '', libelle: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Gestion des Équipements</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <TextField label="Recherche" value={search} onChange={e => setSearch(e.target.value)} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Ajouter</Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Libellé</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipements.filter(e => e.libelle?.toLowerCase().includes(search.toLowerCase())).map((equipement, idx) => (
            <TableRow key={idx}>
              <TableCell>{equipement.code}</TableCell>
              <TableCell>{equipement.libelle}</TableCell>
              <TableCell>
                <IconButton color="primary"><EditIcon /></IconButton>
                <IconButton color="error"><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un Équipement</DialogTitle>
        <DialogContent>
          <TextField label="Code" name="code" value={form.code} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Libellé" name="libelle" value={form.libelle} onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button variant="contained" onClick={handleClose}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 