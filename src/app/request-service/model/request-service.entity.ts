export class RequestServiceEntity {
  id: number;
  unloadDirection: string;
  type: string;
  numberPackages: number;
  country: string;
  department: string;
  district: string;
  destination: string;
  unloadLocation: string;
  unloadDate: string;
  distance: number | null | undefined;
  statusId: number;
  holderName: string;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  destinationAddress: string;
  destinationLat: number;
  destinationLng: number;
  loadDetail: any;
  weight: any;

  constructor(requestService: {
    id?: number,
    unloadDirection?: string,
    type?: string,
    name?: string,
    country?: string,
    department?: string,
    district?: string,
    destination?: string,
    unloadLocation?: string,
    unloadDate?: string,
    distance?: number | null,
    statusId?: number,
    holderName?: string,
    numberPackages?: number,
    pickupAddress?: string,
    pickupLat?: number,
    pickupLng?: number,
    destinationAddress?: string,
    destinationLat?: number,
    destinationLng?: number,
    loadDetail?: any,
    weight?: any
  }) {
    this.id = requestService.id || 0;
    this.unloadDirection = requestService.unloadDirection || '';
    this.type = requestService.type || '';
    this.numberPackages = requestService.numberPackages || 0;
    this.country = requestService.country || '';
    this.department = requestService.department || '';
    this.district = requestService.district || '';
    this.destination = requestService.destination || '';
    this.unloadLocation = requestService.unloadLocation || '';
    this.unloadDate = requestService.unloadDate && !isNaN(Date.parse(requestService.unloadDate))
      ? requestService.unloadDate
      : new Date().toISOString();
    this.distance = requestService.distance ?? null;
    this.statusId = requestService.statusId || 3;
    this.holderName = requestService.holderName || '';
    this.pickupAddress = requestService.pickupAddress || '';
    this.pickupLat = requestService.pickupLat || 0;
    this.pickupLng = requestService.pickupLng || 0;
    this.destinationAddress = requestService.destinationAddress || '';
    this.destinationLat = requestService.destinationLat || 0;
    this.destinationLng = requestService.destinationLng || 0;
    this.loadDetail = requestService.loadDetail || '';
    this.weight = requestService.weight || '';
  }
}
