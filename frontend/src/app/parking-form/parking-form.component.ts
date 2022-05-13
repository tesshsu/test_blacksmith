import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingsService } from '../services/parkings.service';
import { Parking } from '../models/Parking.model';
import { AuthService } from '../services/auth.service';

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
  imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private parkings: ParkingsService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
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

  initEmptyForm() {
    this.parkingForm = this.formBuilder.group({
      note: [null],
      image: [null, Validators.required],
      floor: [1, Validators.required],
      floorValue: [{value: 1, disabled: true}],
      occupancyTime: [1, Validators.required],
      spaceNumber: [1, Validators.required],
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
      image: [this.parking.imageUrl, Validators.required],
      floor: [this.parking.floor, Validators.required],
      floorValue: [{value: this.parking.floor, disabled: true}],
      spaceNumber: [this.parking.spaceNumber, Validators.required],
      occupancyTime: [this.parking.occupancyTime, Validators.required]
    });
    this.parkingForm.get('floor').valueChanges.subscribe(
      (value) => {
        this.parkingForm.get('floorValue').setValue(value);
      }
    );
    this.imagePreview = this.parking.imageUrl;
  }

  onSubmit() {
    this.loading = true;
    const newParking = new Parking();
    newParking.note = this.parkingForm.get('note').value;
    newParking.floor = this.parkingForm.get('floor').value;
    newParking.spaceNumber = this.parkingForm.get(' spaceNumber').value;
    newParking.occupancyTime = this.parkingForm.get('occupancyTime').value;
    newParking.userId = this.auth.getUserId();
    if (this.mode === 'new') {
      this.parkings.createParking(newParking, this.parkingForm.get('image').value).then(
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
      this.parkings.modifyParking(this.parking._id, newParking, this.parkingForm.get('image').value).then(
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

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.parkingForm.get('image').setValue(file);
    this.parkingForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
