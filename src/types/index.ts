/**
 * Type definitions for Hospital Dashboard
 * 
 * Defines the data structures used throughout the application
 * for managing doctors, laboratories, and queue systems.
 */

/**
 * Doctor entity representing medical staff
 */
export interface Doctor {
  id: number;
  name: string;
  status: 'available' | 'busy' | 'not-available';
}

/**
 * Laboratory entity with equipment status
 */
export interface Lab {
  id: number;
  name: string;
  status: 'open' | 'busy' | 'closed';
  equipment: 'working' | 'maintenance' | 'out-of-service';
}

/**
 * Queue operational status
 */
export type QueueStatus = 'active' | 'paused';

/**
 * Doctor availability status
 */
export type DoctorStatus = 'available' | 'busy' | 'not-available';

/**
 * Laboratory operational status
 */
export type LabStatus = 'open' | 'busy' | 'closed';

/**
 * Equipment health status
 */
export type EquipmentStatus = 'working' | 'maintenance' | 'out-of-service';
