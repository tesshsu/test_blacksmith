import { Component, OnInit } from '@angular/core';
import { ParkingsService } from '../services/parkings.service';
import { Subscription } from 'rxjs';
import { Parking } from '../models/Parking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.scss']
})
export class ParkingListComponent implements OnInit {

  parkingSub: Subscription;
  parkings: Parking[];
  loading: boolean;
  errorMsg: string;

  constructor(private parking: ParkingsService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.parkingSub = this.parking.parkings$.subscribe(
      (parkings) => {
        this.parkings = parkings;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.parking.getParkings();
  }

  onClickParking(id: string) {
    this.router.navigate(['parking', id]);
  }

}
