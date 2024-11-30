import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { Chart, registerables } from 'chart.js';
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {TripService} from "../../../trip/service/trip.service";
import {TripEntity} from "../../../trip/model/trip.entity";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    ToolbarContentComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  constructor(private tripService: TripService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadTripData();
  }

  loadTripData(): void {
    this.tripService.getAllTrips().subscribe(
      trips => {
        const monthlyEarnings = this.calculateMonthlyEarnings(trips);
        this.createChart(monthlyEarnings);
      },
      error => console.error('Error loading trip data:', error)
    );
  }

  calculateMonthlyEarnings(trips: TripEntity[]): { [key: string]: number } {
    const earnings: { [key: string]: number } = {};

    trips.forEach(trip => {
      const month = new Date(trip.destinationDate).toLocaleString('default', { month: 'long' });
      if (!earnings[month]) {
        earnings[month] = 0;
      }
      earnings[month] += trip.totalAmount;
    });

    return earnings;
  }

  createChart(monthlyEarnings: { [key: string]: number }): void {
    const labels = Object.keys(monthlyEarnings);
    const data = Object.values(monthlyEarnings);

    new Chart('monthly-earnings-chart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Monthly Earnings',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
