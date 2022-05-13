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
      name: [null, Validators.required],
      manufacturer: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
      mainPepper: [null, Validators.required],
      heat: [1, Validators.required],
      heatValue: [{value: 1, disabled: true}]
    });
    this.parkingForm.get('heat').valueChanges.subscribe(
      (value) => {
        this.parkingForm.get('heatValue').setValue(value);
      }
    );
  }

  initModifyForm(parking: Parking) {
    this.parkingForm = this.formBuilder.group({
      name: [this.parking.name, Validators.required],
      manufacturer: [this.parking.manufacturer, Validators.required],
      description: [this.parking.description, Validators.required],
      image: [this.parking.imageUrl, Validators.required],
      mainPepper: [this.parking.mainPepper, Validators.required],
      heat: [this.parking.heat, Validators.required],
      heatValue: [{value: this.parking.heat, disabled: true}]
    });
    this.parkingForm.get('heat').valueChanges.subscribe(
      (value) => {
        this.parkingForm.get('heatValue').setValue(value);
      }
    );
    this.imagePreview = this.parking.imageUrl;
  }

  onSubmit() {
    this.loading = true;
    const newParking = new Parking();
    newParking.name = this.parkingForm.get('name').value;
    newParking.manufacturer = this.parkingForm.get('manufacturer').value;
    newParking.description = this.parkingForm.get('description').value;
    newParking.mainPepper = this.parkingForm.get('mainPepper').value;
    newParking.heat = this.parkingForm.get('heat').value;
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
