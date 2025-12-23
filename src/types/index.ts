export interface Doctor {
  id: number;
  name: string;
  status: 'available' | 'busy' | 'not-available';
}

export interface Lab {
  id: number;
  name: string;
  status: 'open' | 'busy' | 'closed';
  equipment: 'working' | 'maintenance' | 'out-of-service';
}

export type QueueStatus = 'active' | 'paused';

export type DoctorStatus = 'available' | 'busy' | 'not-available';

export type LabStatus = 'open' | 'busy' | 'closed';

export type EquipmentStatus = 'working' | 'maintenance' | 'out-of-service';
