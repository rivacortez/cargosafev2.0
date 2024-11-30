import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DecimalPipe, NgIf, NgForOf } from '@angular/common';
import {LocationDataEntity} from './model/location-data.entity';
import {
  ToolbarEntrepreneurContentComponent
} from "../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";

@Component({
  selector: 'app-maps',
  standalone: true,
  templateUrl: './maps.component.html',
  imports: [FormsModule, HttpClientModule, DecimalPipe, NgIf, NgForOf],
  styleUrls: ['./maps.component.css']
})
export class MapsComponent /*implements OnInit, AfterViewInit*/ {
 /* private map: L.Map | undefined;
  private pickupLocation: L.Marker | undefined;
  private destinationLocation: L.Marker | undefined;
  private polyline: L.Polyline | undefined;
  public pickupAddress: string = '';
  public destinationAddress: string = '';
  public distance: number | null = null;
  public pickupSuggestions: any[] = [];
  public destinationSuggestions: any[] = [];
  public pickupLatLng: L.LatLng | null = null;
  public destinationLatLng: L.LatLng | null = null;*/

  /*@ViewChild('mapContainer') mapContainer!: ElementRef;*/

  /*constructor(private http: HttpClient) {}*/

  ngOnInit() {}

  /*ngAfterViewInit() {
    this.initMap();
  }*/

  /*private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, { zoomControl: true }).setView([-9.5524878, -74.9387723], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    this.pickupLocation = L.marker([-9.5524878, -74.9387723], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      }),
      draggable: true
    }).addTo(this.map);
    this.pickupLocation.bindPopup('Punto de recogida').openPopup();

    this.destinationLocation = L.marker([-8.109052, -79.021534], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      }),
      draggable: true
    }).addTo(this.map);
    this.destinationLocation.bindPopup('Punto de destino');

    this.pickupLocation.on('moveend', this.updatePolyline.bind(this));
    this.destinationLocation.on('moveend', this.updatePolyline.bind(this));

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 300);
  }

  private calculateDistance(): void {
    if (this.pickupLocation && this.destinationLocation) {
      const pickupLatLng = this.pickupLocation.getLatLng();
      const destinationLatLng = this.destinationLocation.getLatLng();
      this.distance = pickupLatLng.distanceTo(destinationLatLng);
    }
  }

  private getCoordinates(address: string): Promise<L.LatLng> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    return this.http.get<any[]>(url).toPromise().then(results => {
      if (results && results.length > 0) {
        const result = results[0];
        return L.latLng(result.lat, result.lon);
      } else {
        throw new Error('Address not found');
      }
    });
  }

  private getSuggestions(query: string): Promise<any[]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;
    return this.http.get<any[]>(url).toPromise().then(results => results || []);
  }

  public async onPickupInput(): Promise<void> {
    if (this.pickupAddress.length > 2) {
      this.pickupSuggestions = await this.getSuggestions(this.pickupAddress);
    } else {
      this.pickupSuggestions = [];
    }
  }

  public async onDestinationInput(): Promise<void> {
    if (this.destinationAddress.length > 2) {
      this.destinationSuggestions = await this.getSuggestions(this.destinationAddress);
    } else {
      this.destinationSuggestions = [];
    }
  }

  public selectPickupSuggestion(suggestion: any): void {
    this.pickupAddress = suggestion.display_name;
    this.pickupLatLng = L.latLng(suggestion.lat, suggestion.lon);
    this.pickupSuggestions = [];
    this.setPickupLocation(suggestion.lat, suggestion.lon);
  }

  public selectDestinationSuggestion(suggestion: any): void {
    this.destinationAddress = suggestion.display_name;
    this.destinationLatLng = L.latLng(suggestion.lat, suggestion.lon);
    this.destinationSuggestions = [];
    this.setDestinationLocation(suggestion.lat, suggestion.lon);
  }

  public async updateMarkers(): Promise<void> {
    try {
      if (this.pickupLocation && this.destinationLocation) {
        const pickupLatLng = await this.getCoordinates(this.pickupAddress);
        const destinationLatLng = await this.getCoordinates(this.destinationAddress);

        this.pickupLocation.setLatLng(pickupLatLng);
        this.destinationLocation.setLatLng(destinationLatLng);
        this.updatePolyline();
        this.calculateDistance();

        // Llamar al método para enviar los datos al backend
        this.sendDataToBackend();
      }
    } catch (error) {
      console.error(error);
    }
  }

  private updatePolyline(): void {
    if (this.pickupLocation && this.destinationLocation) {
      const pickupLatLng = this.pickupLocation.getLatLng();
      const destinationLatLng = this.destinationLocation.getLatLng();

      if (this.polyline) {
        this.polyline.setLatLngs([pickupLatLng, destinationLatLng]);
      } else {
        this.polyline = L.polyline([pickupLatLng, destinationLatLng], { color: 'red' }).addTo(this.map!);
      }
      this.calculateDistance();
    }
  }

  private setPickupLocation(lat: number, lng: number): void {
    if (this.pickupLocation) {
      const latLng = L.latLng(lat, lng);
      this.pickupLocation.setLatLng(latLng);
      this.updatePolyline();
      this.calculateDistance();
    }
  }

  private setDestinationLocation(lat: number, lng: number): void {
    if (this.destinationLocation) {
      const latLng = L.latLng(lat, lng);
      this.destinationLocation.setLatLng(latLng);
      this.updatePolyline();
      this.calculateDistance();
    }
  }

  public sendDataToBackend(): void {
    if (this.pickupLatLng && this.destinationLatLng) {
      const data = new LocationDataEntity(
        this.pickupAddress,
        this.pickupLatLng.lat,
        this.pickupLatLng.lng,
        this.destinationAddress,
        this.destinationLatLng.lat,
        this.destinationLatLng.lng
      );

      this.http.post('https://your-backend-url.com/api/locations', data)
        .subscribe(response => {
          console.log('Data sent successfully', response);
        }, error => {
          console.error('Error sending data', error);
        });
    } else {
      console.error('Pickup or destination coordinates are missing');
    }
  }

  showMap() {
    if (!this.map) {
      this.initMap();
    } else {
      this.map.invalidateSize();
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setPickupLocation(lat, lng);
      }, error => {
        console.error('Error getting location', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.map?.invalidateSize();
  }*/
}
