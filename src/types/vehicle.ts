
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  status: string;
  lastInspection: string;
  nextInspection: string;
  insurance: {
    provider: string;
    policyNumber: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  documents: {
    name: string;
    expires: string | null;
    uploaded: boolean;
  }[];
  mileage: number;
  fuelType: string;
  transmission: string;
  nextMaintenance: string;
}
