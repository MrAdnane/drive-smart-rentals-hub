
import { Vehicle } from "@/types/vehicle";

// Sample vehicles data
export const sampleVehicles: Vehicle[] = [
  {
    id: "v1",
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    plate: "123 ABC 78",
    status: "disponible",
    lastInspection: "15/01/2025",
    nextInspection: "15/07/2025",
    insurance: {
      provider: "AXA Assurance",
      policyNumber: "AXA-12345",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
      status: "actif"
    },
    documents: [
      { name: "Carte grise", expires: null, uploaded: true },
      { name: "Attestation d'assurance", expires: "31/12/2025", uploaded: true },
      { name: "Rapport de contrôle technique", expires: "15/07/2025", uploaded: true }
    ],
    mileage: 28500,
    fuelType: "Essence",
    transmission: "Automatique",
    nextMaintenance: "10000 km ou 15/07/2025"
  },
  {
    id: "v2",
    make: "Honda",
    model: "CR-V",
    year: 2023,
    plate: "456 DEF 78",
    status: "en entretien",
    lastInspection: "20/12/2024",
    nextInspection: "20/06/2025",
    insurance: {
      provider: "Allianz",
      policyNumber: "ALZ-67890",
      startDate: "01/03/2025",
      endDate: "28/02/2026",
      status: "actif"
    },
    documents: [
      { name: "Carte grise", expires: null, uploaded: true },
      { name: "Attestation d'assurance", expires: "28/02/2026", uploaded: true },
      { name: "Rapport de contrôle technique", expires: "20/06/2025", uploaded: true }
    ],
    mileage: 15200,
    fuelType: "Hybride",
    transmission: "Automatique",
    nextMaintenance: "10000 km ou 01/09/2025"
  },
  {
    id: "v3",
    make: "Mercedes-Benz",
    model: "Classe E",
    year: 2022,
    plate: "789 GHI 78",
    status: "réservé",
    lastInspection: "10/02/2025",
    nextInspection: "10/08/2025",
    insurance: {
      provider: "MAAF",
      policyNumber: "MF-54321",
      startDate: "15/02/2025",
      endDate: "14/02/2026",
      status: "actif"
    },
    documents: [
      { name: "Carte grise", expires: null, uploaded: true },
      { name: "Attestation d'assurance", expires: "14/02/2026", uploaded: true },
      { name: "Rapport de contrôle technique", expires: "10/08/2025", uploaded: true }
    ],
    mileage: 32100,
    fuelType: "Diesel",
    transmission: "Automatique",
    nextMaintenance: "10000 km ou 15/05/2025"
  },
  {
    id: "v4",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    plate: "101 JKL 78",
    status: "disponible",
    lastInspection: "05/03/2025",
    nextInspection: "05/09/2025",
    insurance: {
      provider: "AXA Assurance",
      policyNumber: "AXA-24680",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
      status: "actif"
    },
    documents: [
      { name: "Carte grise", expires: null, uploaded: true },
      { name: "Attestation d'assurance", expires: "31/12/2025", uploaded: true },
      { name: "Rapport de contrôle technique", expires: "05/09/2025", uploaded: false }
    ],
    mileage: 12800,
    fuelType: "Électrique",
    transmission: "Automatique",
    nextMaintenance: "20000 km ou 01/10/2025"
  }
];
