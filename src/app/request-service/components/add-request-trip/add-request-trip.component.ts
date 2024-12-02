import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { TripEntity } from "../../../trip/model/trip.entity";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

import {MatDialog} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  DialogSuccessfullyComponent
} from "../../../public/components/dialogs/dialog-successfully/dialog-successfully.component";
import {RequestServiceEntity} from "../../model/request-service.entity";
import {Router} from "@angular/router";
import {MapsComponent} from "../../../maps/maps.component";
import {HttpClient} from "@angular/common/http";
import {RequestService} from "../../service/request.service";
import * as L from "leaflet";
import {LocationDataEntity} from "../../../maps/model/location-data.entity";

@Component({
  selector: 'app-add-request-trip',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton,
    NgIf,
    MatCardTitle,
    MatError,
    MatIcon,
    MatIconButton,
    MatSelect,
    MatOption,
    NgForOf,

    MapsComponent,
    DecimalPipe
  ],
  templateUrl: './add-request-trip.component.html',
  styleUrl: './add-request-trip.component.css'
})
export class AddRequestTripComponent  implements OnInit, AfterViewInit {
  @Input() trip: RequestServiceEntity = new RequestServiceEntity({});
  @Input() editMode: boolean = false;
  @Output() tripAddRequested = new EventEmitter<RequestServiceEntity>();
  @Output() tripUpdateRequested = new EventEmitter<RequestServiceEntity>();
  @Output() cancelRequested = new EventEmitter();
  @ViewChild('tripForm', { static: false }) tripForm!: NgForm;

  private map: L.Map | undefined;
  private pickupLocation: L.Marker | undefined;
  private destinationLocation: L.Marker | undefined;
  private polyline: L.Polyline | undefined;
  public pickupAddress: string = '';
  public destinationAddress: string = '';
  public distance: number | null = null;
  public pickupSuggestions: any[] = [];
  public destinationSuggestions: any[] = [];
  public pickupLatLng: L.LatLng | null = null;
  public destinationLatLng: L.LatLng | null = null;

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  formValid: any;

  constructor(private router: Router, private http: HttpClient, private requestService: RequestService, private dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
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
        return L.latLng(results[0].lat, results[0].lon);
      } else {
        throw new Error('No results found');
      }
    }).catch(error => {
      console.error('Error fetching coordinates:', error);
      throw error;
    });
  }

  private getSuggestions(query: string): Promise<any[]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;
    return this.http.get<any[]>(url).toPromise().then(results => {
      console.log('Suggestions response:', results);
      return results || [];
    }).catch(error => {
      console.error('Error fetching suggestions:', error);
      return [];
    });
  }


  public async onPickupInput(): Promise<void> {
    if (this.pickupAddress.length > 2) {
      try {
        this.pickupSuggestions = await this.getSuggestions(this.pickupAddress);
      } catch (error) {
        console.error('Error fetching pickup suggestions:', error);
        this.pickupSuggestions = [];
      }
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
      if (this.pickupAddress && this.destinationAddress) {
        const pickupLatLng = await this.getCoordinates(this.pickupAddress);
        const destinationLatLng = await this.getCoordinates(this.destinationAddress);

        if (this.pickupLocation && this.destinationLocation) {
          this.pickupLocation.setLatLng(pickupLatLng);
          this.destinationLocation.setLatLng(destinationLatLng);
          this.updatePolyline();
          this.calculateDistance();

          this.pickupLatLng = pickupLatLng;
          this.destinationLatLng = destinationLatLng;
        }
      } else {
        console.error('Pickup or destination address is missing');
      }
    } catch (error) {
      console.error('Error getting coordinates', error);
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
      const currentDate = new Date().toISOString();
      const data = new RequestServiceEntity({
        id: this.trip.id,
        holderName: this.trip.holderName,
        type: this.trip.type,
        loadDetail: this.trip.loadDetail,
        numberPackages: this.trip.numberPackages,
        weight: this.trip.weight,
        pickupAddress: this.pickupAddress,
        destinationAddress: this.destinationAddress,
        distance: this.distance,
        pickupLat: this.pickupLatLng.lat,
        pickupLng: this.pickupLatLng.lng,
        destinationLat: this.destinationLatLng.lat,
        destinationLng: this.destinationLatLng.lng,
        unloadDate: currentDate
      });

      this.requestService.saveRequestServiceTrip(data)
        .subscribe(response => {
          console.log('Data sent successfully', response);
          this.openSuccessDialog('Solicitud registrada exitosamente');
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
  }

  onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  resetEditState() {
    this.trip = new RequestServiceEntity({});
    this.editMode = false;
    this.tripForm.resetForm();
  }

  addAddressDetails(): void {
    this.router.navigate(['/maps/details']);
  }

  public async onSubmit() {
    if (this.pickupLatLng && this.destinationLatLng) {
      const currentDate = new Date().toISOString();
      const data = new RequestServiceEntity({
        id: this.trip.id,
        holderName: this.trip.holderName,
        type: this.trip.type,
        loadDetail: this.trip.loadDetail,
        numberPackages: this.trip.numberPackages,
        weight: this.trip.weight,
        pickupAddress: this.pickupAddress,
        destinationAddress: this.destinationAddress,
        distance: this.distance,
        pickupLat: this.pickupLatLng.lat,
        pickupLng: this.pickupLatLng.lng,
        destinationLat: this.destinationLatLng.lat,
        destinationLng: this.destinationLatLng.lng,
        unloadDate: currentDate,
        statusId: 3
      });

      try {
        const savedTrip = await this.requestService.saveRequestServiceTrip(data).toPromise();
        console.log('Request saved successfully', savedTrip);

      } catch (error) {
        console.error('Error saving request', error);
      }
    } else {
      console.error('Pickup and destination locations are required');
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(DialogSuccessfullyComponent, {
      data: { message }
    });
  }
}
