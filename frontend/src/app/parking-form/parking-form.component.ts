import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingsService } from '../services/parkings.service';
import { Parking } from '../models/Parking.model';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent implements OnInit {

  parkingForm: FormGroup;
  mode: string;
  loading: boolean;
  parking: Parking;
  errorMsg: string;
  userSub: Subscription;
  users: User[];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private parkings: ParkingsService,
    private authservice: AuthService,
    private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.getUsers();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
          this.loading = false;
        } else {
          this.mode = 'edit';
          this.parkings.getParkingById(params.id).then(
            (parking: Parking) => {
              this.parking = parking;
              this.initModifyForm(parking);
              this.loading = false;
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        }
      }
    );
  }

  getUsers() {
    this.loading = true;
    this.userSub = this.authservice.users$.subscribe(
      (users) => {
        this.users = users;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.authservice.getUsers();
  }

  initEmptyForm() {
    this.parkingForm = this.formBuilder.group({
      note: [null],
      floor: [1, Validators.required],
      floorValue: [{ value: 1, disabled: true }],
      occupancyTime: [null, Validators.required],
      spaceNumber: [null, Validators.required],
      availability: [false],
      assignUser: [(this.users && this.users.length ? this.users[0].email : null)],
    });
   
    this.parkingForm.get('floor').valueChanges.subscribe(
      (value) => {
        this.parkingForm.get('floorValue').setValue(value);
      }
    );
  }

  initModifyForm(parking: Parking) {
    this.parkingForm = this.formBuilder.group({
      note: [this.parking.note],
      floor: [this.parking.floor, Validators.required],
      floorValue: [{ value: this.parking.floor, disabled: true }],
      spaceNumber: [this.parking.spaceNumber, Validators.required],
      occupancyTime: [this.parking.occupancyTime, Validators.required],
      availability: [false],
      assignUser: [(this.parking.assignUser ? this.parking.assignUser : (this.users && this.users.length ? this.users[0].email : null))],
    });
   
    this.parkingForm.get('floor').valueChanges.subscribe(
      (value) => {
        this.parkingForm.get('floorValue').setValue(value);
      }
    );
  }

  onSubmit() {
    console.log(this.parkingForm.get('assignUser'));
    const newParking = new Parking();
    newParking.note = this.parkingForm.get('note')?.value;
    newParking.floor = this.parkingForm.get('floor')?.value;
    newParking.spaceNumber = this.parkingForm.get('spaceNumber')?.value;
    newParking.occupancyTime = this.parkingForm.get('occupancyTime')?.value;
    newParking.availability = this.parkingForm.get('availability') ? this.parkingForm.get('availability').value : false;
    newParking.assignUser = this.parkingForm.get('assignUser')?.value;
    newParking.userId = this.auth.getUserId();

    console.log('newParking : ', newParking);

    if (this.mode === 'new') {
      this.parkings.createParking(newParking).then(
        (response: { message: string }) => {
          console.log(response.message);
          this.loading = false;
          this.router.navigate(['/parkings']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    } else if (this.mode === 'edit') {
      this.parkings.modifyParking(this.parking._id, newParking).then(
        (response: { message: string }) => {
          console.log(response.message);
          this.loading = false;
          this.router.navigate(['/parkings']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    }
  }
}
