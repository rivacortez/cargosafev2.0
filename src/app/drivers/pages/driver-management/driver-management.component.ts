import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DriverEntity } from "../../model/driver.entity";
import { DriverService } from "../../services/driver.service";
import { DriversEditComponent } from "../../components/drivers-edit/drivers-edit.component";
import { MatDialog } from "@angular/material/dialog";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {NgClass, NgForOf, TitleCasePipe} from "@angular/common";
import { PhotoDialogComponent } from '../../../../shared/dialogs/photo-dialog/photo-dialog.component';
import {ThemeService} from "../../../../shared/services/theme.service";

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgForOf,
    NgClass
  ],
  styleUrls: ['./driver-management.component.css']
})
export class DriverManagementComponent  implements OnInit, AfterViewInit {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef;
  @ViewChild('addDriverButton') addDriverButton!: ElementRef;

  columnsToDisplay = ['id', 'photoUrl', 'name', 'dni', 'license', 'ruc', 'actions'];
  dataSource: DriverEntity[] = [];
  currentDriver = new DriverEntity({});
  editMode = false;
  isDarkMode = false;

  constructor(
    private driverService: DriverService,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {
    gsap.registerPlugin(ScrollTrigger);
    this.isDarkMode = this.themeService.getActiveTheme() === 'dark';
  }

  ngOnInit() {
    this.loadDrivers();
  }

  ngAfterViewInit() {
    this.initializeAnimations();
  }

  private loadDrivers() {
    this.driverService.getAll().subscribe(drivers => {
      this.dataSource = drivers;
      this.refreshAnimations();
    });
  }

  private initializeAnimations() {
    gsap.from('.driver-table tr', {
      duration: 0.8,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.table-scroll-wrapper',
        start: 'top center'
      }
    });

    this.setupHoverEffects();
  }

  private setupHoverEffects() {
    gsap.to('.driver-table tr', {
      duration: 0.3,
      backgroundColor: '#f8f9fa',
      paused: true,
      onMouseEnter: (self: gsap.core.Tween) => self.play(),
      onMouseLeave: (self: gsap.core.Tween) => self.reverse()
    });

    gsap.to(this.addDriverButton.nativeElement, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power1.inOut',
      paused: true,
      onMouseEnter: (self: gsap.core.Tween) => self.play(),
      onMouseLeave: (self: gsap.core.Tween) => self.reverse()
    });
  }

  onAddDriver() {
    const buttonPosition = this.addDriverButton.nativeElement.getBoundingClientRect();
    const dialogRef = this.dialog.open(DriversEditComponent, {
      width: '90%',
      maxWidth: '500px',
      data: { position: buttonPosition },
      panelClass: ['custom-dialog', 'accessible-dialog'],
      ariaDescribedBy: 'dialog-content',
      ariaLabelledBy: 'dialog-title',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleDialogResult(result);
      }
    });
  }

  onEditItem(driver: DriverEntity) {
    const buttonPosition = this.addDriverButton.nativeElement.getBoundingClientRect();
    const dialogRef = this.dialog.open(DriversEditComponent, {
      width: '90%',
      maxWidth: '500px',
      data: { ...driver, position: buttonPosition }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleDialogResult(result);
      }
    });
  }

  onDeleteItem(driver: DriverEntity) {
    const row = this.renderer.selectRootElement(`#row-${driver.id}`);
    gsap.to(row, {
      duration: 0.4,
      opacity: 0,
      x: -100,
      ease: 'power2.in',
      onComplete: () => this.deleteDriver(driver.id)
    });
  }

  private deleteDriver(id: number) {
    this.driverService.delete(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(d => d.id !== id);
      this.refreshAnimations();
    });
  }

  private handleDialogResult(result: DriverEntity) {
    if (this.editMode) {
      this.updateDriver(result);
    } else {
      this.createDriver(result);
    }
  }

  private createDriver(driver: DriverEntity) {
    this.driverService.create(driver).subscribe(newDriver => {
      this.dataSource = [...this.dataSource, newDriver];
      this.refreshAnimations();
    });
  }

  private updateDriver(driver: DriverEntity) {
    this.driverService.update(driver.id, driver).subscribe(updatedDriver => {
      this.dataSource = this.dataSource.map(d => d.id === updatedDriver.id ? updatedDriver : d);
      this.refreshAnimations();
    });
  }

  private refreshAnimations() {
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }

  viewPhoto(photoUrl: string) {
    this.dialog.open(PhotoDialogComponent, {
      data: { photoUrl },
      panelClass: 'photo-modal'
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }
}
