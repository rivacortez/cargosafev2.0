export class LocationDataEntity {
  constructor(
    public pickupAddress: string,
    public pickupLat: number,
    public pickupLng: number,
    public destinationAddress: string,
    public destinationLat: number,
    public destinationLng: number
  ) {}
}
