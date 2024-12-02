import { Component } from '@angular/core';
import {
  ListTripsEntrepreneurComponent
} from "../../components/list-trips-entrepreneur/list-trips-entrepreneur.component";

@Component({
  selector: 'app-list-trip-entrepreneur',
  standalone: true,
  imports: [

    ListTripsEntrepreneurComponent
  ],
  templateUrl: './list-trip-entrepreneur.component.html',
  styleUrl: './list-trip-entrepreneur.component.css'
})
export class ListTripEntrepreneurComponent {

}
