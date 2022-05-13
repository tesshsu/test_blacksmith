import { Component, OnInit } from '@angular/core';
import { Parking } from '../models/Parking.model';
import { ParkingsService } from '../services/parkings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-parking',
  templateUrl: './single-parking.component.html',
  styleUrls: ['./single-parking.component.scss']
})
export class SingleParkingComponent implements OnInit {

  loading: boolean;
  parking: Parking;
  userId: string;
  likePending: boolean;
  liked: boolean;
  disliked: boolean;
  errorMessage: string;

  constructor(private parkings: ParkingsService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.parkings.getParkingById(params.id).then(
          (parking: Parking) => {
            this.parking = parking;
            this.loading = false;
          }
        );
      }
    );
    this.userId = this.auth.getUserId();
  }

  onBack() {
    this.router.navigate(['/parkings']);
  }

  onModify() {
    this.router.navigate(['/modify-parking', this.parking._id]);
  }

  onDelete() {
    this.loading = true;
    this.parkings.deleteParking(this.parking._id).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.loading = false;
        this.router.navigate(['/parkings']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error(error);
      }
    );
  }
}
