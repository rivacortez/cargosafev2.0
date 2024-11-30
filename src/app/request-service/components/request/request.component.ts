import {Component, inject, ViewChild} from '@angular/core';
import {AddRequestTripComponent} from "../add-request-trip/add-request-trip.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

import {
  ToolbarEntrepreneurContentComponent
} from "../../../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {RequestService} from "../../service/request.service";
import {RequestServiceEntity} from "../../model/request-service.entity";

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    AddRequestTripComponent,
    ToolbarEntrepreneurContentComponent
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private tripService: RequestService = inject(RequestService);
  protected tripData!: RequestServiceEntity;

  constructor() {
    this.editMode = false;
    this.tripData = new RequestServiceEntity({});
    this.dataSource = new MatTableDataSource();
  }

  protected onEditItem(item: RequestServiceEntity) {
    this.editMode = true;
    this.tripData = item;
  }

  protected onDeleteItem(item: RequestServiceEntity) {
    this.deleteTrip(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllTrips();
  }



  protected onTripUpdateRequested(item: RequestServiceEntity) {
    this.tripData = item;
    this.updateTrip();
    this.resetEditState();
  }

  private resetEditState() {
    this.tripData = new RequestServiceEntity({});
    this.editMode = false;
  }

  private getAllTrips() {
    this.tripService.getAll().subscribe((response: Array<RequestServiceEntity>) => {
      this.dataSource.data = response;
    });
  }



  private updateTrip() {
    let tripToUpdate = this.tripData;
    this.tripService.update(tripToUpdate.id, tripToUpdate).subscribe((response: RequestServiceEntity) => {
      let index = this.dataSource.data.findIndex((trip: RequestServiceEntity) => trip.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  private deleteTrip(id: number) {
    this.tripService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((trip: RequestServiceEntity) => trip.id !== id);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTrips();
  }

  protected onTripAddRequested(item: RequestServiceEntity) {
    this.tripData = item;
    this.createTrip();
    this.resetEditState();
  }

  private createTrip() {
    this.tripService.create(this.tripData).subscribe((response: RequestServiceEntity) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }
}
