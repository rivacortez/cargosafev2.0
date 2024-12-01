import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { DriverManagementComponent } from './drivers/pages/driver-management/driver-management.component';
import { ListRequestTripComponent } from './request-service/components/list-request-trip/list-request-trip.component';
import { VehiclesManagementComponent } from './vehicles/pages/vehicles-management/vehicles-management.component';
import { StatisticsComponent } from './company/components/statistics/statistics.component';
import {
  ToolbarEntrepreneurContentComponent
} from "./public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {RequestComponent} from "./request-service/components/request/request.component";
import {
  DriversEditComponent
} from "./drivers/components/drivers-edit/drivers-edit.component";
import {AddDriverManagementComponent} from "./drivers/pages/add-driver-management/add-driver-management.component";
import {
  AddVehiclesManagementComponent
} from "./vehicles/pages/add-vehicles-management/add-vehicles-management.component";
import {
  ListRequestStatusComponent
} from "./request-service/components/list-request-status/list-request-status.component";
import {
  ListTripsEntrepreneurComponent
} from "./trip/components/list-trips-entrepreneur/list-trips-entrepreneur.component";
import {AddDetailsTripComponent} from "./trip/components/add-details-trip/add-details-trip.component";
import {DetailsTripComponent} from "./trip/components/details-trip/details-trip.component";
import {ProfileComponent} from "./profile/components/profile/profile.component";
import {MapsComponent} from "./maps/maps.component";
import {PaymentComponent} from "./payment/component/payment/payment.component";
import {HomeCompanyComponent} from "./public/pages/home-company/home-company.component";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";
import {authenticationGuard} from "./iam/services/authentication.guard";

import {companyRoleGuard} from "./iam/services/companyRoleGuard.guard";
import {entrepreneurRoleGuard} from "./iam/services/entrepreneurRoleGuard.guard";
import {SidebarCompanyComponent} from "./public/sidebar-company/sidebar-company.component";


export const routes: Routes = [
  { path: '', redirectTo: 'home-company', pathMatch: 'full' },
  { path: 'home-company', component: HomeCompanyComponent, canActivate: [authenticationGuard] },

  // IAM
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  // Not found
  { path: 'pages', component: PageNotFoundComponent },

// Driver management
  { path: 'drivers/management', component: DriverManagementComponent, canActivate: [authenticationGuard] },
  { path: 'management/driver/new', component: AddDriverManagementComponent, canActivate: [authenticationGuard] },

  // Vehicles management
  { path: 'management/vehicle/new', component: AddVehiclesManagementComponent, canActivate: [authenticationGuard] },
  { path: 'vehicles/management', component: VehiclesManagementComponent, canActivate: [authenticationGuard] },

  // Add new order
  { path: 'list-request-trip', component: ListRequestTripComponent, canActivate: [authenticationGuard] },
  { path: 'stadistics', component: StatisticsComponent, canActivate: [authenticationGuard] },

  // Entrepreneur
  { path: 'a', component: ToolbarEntrepreneurContentComponent },
  { path: 'request/trip/new', component: RequestComponent },
  { path: 'list-request-trip', component: ListRequestTripComponent },
  { path: 'list-request-history', component: ListRequestStatusComponent },
  { path: 'home-entrepreneur', component: HomeComponent },
  { path: 'list-trips', component: ListTripsEntrepreneurComponent },
  { path: 'add-trip-details', component: AddDetailsTripComponent },
  { path: 'trip/details/:id', component: DetailsTripComponent },
  { path: 'maps/details', component: MapsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '**', component: PageNotFoundComponent },


  //testtttt
  {path: 'sidebar-company', component: SidebarCompanyComponent},
];
