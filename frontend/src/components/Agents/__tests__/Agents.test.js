import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Agents from '../Agents';
import agentService from '../../../services/agentService';
import dropdownsService from '../../../services/dropdownsService';

// Mock des services
jest.mock('../../../services/agentService');
jest.mock('../../../services/dropdownsService');

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Agents Component', () => {
  const mockAgents = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      cin: 'AB123456',
      tel: '0612345678',
      mail: 'jean.dupont@example.com',
      cnss: 'CN123456',
      cctId: 1,
      cct: 'CCT Test',
      numeroCAP: 'CAP001',
      dateCAP: '2023-01-01',
      dateExpirationCAP: '2024-01-01',
      categorieCAPId: 1,
      statutAdministratifId: 1,
      statutAdministratif: 'En activité',
      anneeAutorisation: 2023,
      dateAffectationCCT: '2023-01-01',
      numDecisionRenouv: 'DEC001',
      dateDecisionRenouv: '2023-01-01',
      adresse: '123 Rue Test'
    }
  ];

  const mockDropdowns = {
    regions: [
      { id: 1, libelle: 'Région 1' },
      { id: 2, libelle: 'Région 2' }
    ],
    villes: [
      { id: 1, nom: 'Ville 1' },
      { id: 2, nom: 'Ville 2' }
    ],
    reseaux: [
      { id: 1, nom: 'Réseau 1' },
      { id: 2, nom: 'Réseau 2' }
    ],
    ccts: [
      { id: 1, nom: 'CCT 1' },
      { id: 2, nom: 'CCT 2' }
    ],
    statutsAdministratifs: [
      { id: 1, libelle: 'En activité' },
      { id: 2, libelle: 'Suspendu' }
    ]
  };

  beforeEach(() => {
    // Reset des mocks
    jest.clearAllMocks();
    
    // Mock des services
    agentService.getAgents.mockResolvedValue({
      data: mockAgents,
      pagination: {
        totalCount: 1,
        pageCount: 1,
        currentPage: 1,
        pageSize: 10
      }
    });

    dropdownsService.getRegions.mockResolvedValue({ data: mockDropdowns.regions });
    dropdownsService.getVilles.mockResolvedValue({ data: mockDropdowns.villes });
    dropdownsService.getReseaux.mockResolvedValue({ data: mockDropdowns.reseaux });
    dropdownsService.getCCTs.mockResolvedValue({ data: mockDropdowns.ccts });
    dropdownsService.getStatutsAdministratifs.mockResolvedValue({ data: mockDropdowns.statutsAdministratifs });
  });

  test('renders Agents component with title', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      expect(screen.getByText('Gestion des Agents')).toBeInTheDocument();
    });
  });

  test('loads agents on component mount', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      expect(agentService.getAgents).toHaveBeenCalled();
      expect(screen.getByText('Jean')).toBeInTheDocument();
      expect(screen.getByText('Dupont')).toBeInTheDocument();
    });
  });

  test('loads dropdowns on component mount', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      expect(dropdownsService.getRegions).toHaveBeenCalled();
      expect(dropdownsService.getVilles).toHaveBeenCalled();
      expect(dropdownsService.getReseaux).toHaveBeenCalled();
      expect(dropdownsService.getCCTs).toHaveBeenCalled();
      expect(dropdownsService.getStatutsAdministratifs).toHaveBeenCalled();
    });
  });

  test('displays add agent button', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      expect(screen.getByText('+ Ajouter Agent')).toBeInTheDocument();
    });
  });

  test('displays search section', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      expect(screen.getByText('Recherche')).toBeInTheDocument();
      expect(screen.getByText('Rechercher')).toBeInTheDocument();
      expect(screen.getByText('Annuler')).toBeInTheDocument();
    });
  });

  test('displays agents table', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      expect(screen.getByText('Nom agent')).toBeInTheDocument();
      expect(screen.getByText('Prénom agent')).toBeInTheDocument();
      expect(screen.getByText('CCT')).toBeInTheDocument();
      expect(screen.getByText('Statut administratif')).toBeInTheDocument();
      expect(screen.getByText('CAP')).toBeInTheDocument();
    });
  });

  test('displays agent data in table', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      expect(screen.getByText('Jean')).toBeInTheDocument();
      expect(screen.getByText('Dupont')).toBeInTheDocument();
      expect(screen.getByText('CCT Test')).toBeInTheDocument();
      expect(screen.getByText('En activité')).toBeInTheDocument();
      expect(screen.getByText('CAP001')).toBeInTheDocument();
    });
  });

  test('handles filter changes', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      const regionSelect = screen.getByLabelText('Région');
      fireEvent.mouseDown(regionSelect);
    });
    
    // Vérifier que les options sont affichées
    await waitFor(() => {
      expect(screen.getByText('Région 1')).toBeInTheDocument();
      expect(screen.getByText('Région 2')).toBeInTheDocument();
    });
  });

  test('handles search button click', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      const searchButton = screen.getByText('Rechercher');
      fireEvent.click(searchButton);
    });
    
    // Vérifier que la recherche est déclenchée
    expect(agentService.getAgents).toHaveBeenCalledTimes(2); // Une fois au montage, une fois après le clic
  });

  test('handles clear filters button click', async () => {
    render(<Agents />);
    
    await waitFor(() => {
      const clearButton = screen.getByText('Annuler');
      fireEvent.click(clearButton);
    });
    
    // Vérifier que les filtres sont réinitialisés
    await waitFor(() => {
      expect(agentService.getAgents).toHaveBeenCalledTimes(2); // Une fois au montage, une fois après le clic
    });
  });
});
