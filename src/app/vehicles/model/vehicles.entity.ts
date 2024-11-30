export class VehiclesEntity {
  id: number;
  model: string;
  plate: string;
  maxLoad: number;
  volume: number;
  photoUrl: string;

  constructor(vehicle: {id?: number, model?: string, plate?: string, maxLoad?: number, volume?: number, photoUrl?: string}) {
    this.id = vehicle.id || 0;
    this.model = vehicle.model || '';
    this.plate = vehicle.plate || '';
    this.maxLoad = vehicle.maxLoad || 0;
    this.volume = vehicle.volume || 0;
    this.photoUrl = vehicle.photoUrl || '';
  }
}
