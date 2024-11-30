export class DriverEntity {
  id: number;
  name: string;
  dni: string;
  license: string;
  contactNum: string;
  photoUrl: string;

  constructor(driver: { id?: number; name?: string; dni?: string; license?: string; contactNum?: string; photoUrl?: string }) {
    this.id = driver.id || 0;
    this.name = driver.name || '';
    this.dni = driver.dni || '';
    this.license = driver.license || '';
    this.contactNum = driver.contactNum || '';
    this.photoUrl = driver.photoUrl || '';
  }
}
