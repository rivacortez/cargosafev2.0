export class TripEntity {
  id: number;
  name: string;
  type: string;
  weight: number;
  unloadDirection: string;
  unloadLocation: string;
  unloadDate: string;
  expenseId: number;
  alertId: number;
  ongoingTripId: number;
  vehicleId: number;
  driverId: number;
  entrepreneurId: number;
  destination: string;
  department: string;
  district: string;
  country: string;
  numberPackages: number;
  holderName: string;
  destinationDate: string;
  totalAmount: number;
  destinationAddress: string;
  loadDetail: string;
  pickupAddress: string;

  constructor(trip: {
    id?: number,
    name?: string,
    type?: string,
    weight?: number,
    unloadDirection?: string,
    unloadLocation?: string,
    unloadDate?: string,
    expenseId?: number,
    alertId?: number,
    ongoingTripId?: number,
    vehicleId?: number,
    driverId?: number,
    entrepreneurId?: number,
    destination?: string,
    country?: string,
    department?: string,
    district?: string,
    numberPackages?: number,
    holderName?: string,
    destinationDate?: string,
    totalAmount?: number,
    destinationAddress?: string,
    loadDetail?: string,
    pickupAddress?: string
  } = {}) {
    this.id = trip.id || 0;
    this.name = trip.name || '';
    this.type = trip.type || '';
    this.weight = trip.weight || 0;
    this.unloadLocation = trip.unloadLocation || '';
    this.unloadDirection = trip.unloadDirection || '';
    this.unloadDate = trip.unloadDate || '';
    this.expenseId = trip.expenseId || 0;
    this.alertId = trip.alertId || 0;
    this.ongoingTripId = trip.ongoingTripId || 0;
    this.vehicleId = trip.vehicleId || 0;
    this.driverId = trip.driverId || 0;
    this.entrepreneurId = trip.entrepreneurId || 0;
    this.numberPackages = trip.numberPackages || 0;
    this.destination = trip.destination || '';
    this.country = trip.country || '';
    this.department = trip.department || '';
    this.district = trip.district || '';
    this.holderName = trip.holderName || '';
    this.destinationDate = trip.destinationDate || '';
    this.totalAmount = trip.totalAmount || 0;
    this.destinationAddress = trip.destinationAddress || '';
    this.loadDetail = trip.loadDetail || '';
    this.pickupAddress = trip.pickupAddress || '';
  }
}
