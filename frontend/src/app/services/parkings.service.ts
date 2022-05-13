import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Parking } from '../models/Parking.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingsService {

  parkings$ = new Subject<Parking[]>();

  tempParkings = [
    {
      _id: 'eizomfhazo',
      note: 'p1',
      floor: 1,
      spaceNumber: 1,
      occupancyTime: 24,
      availability: true
    },
    {
      _id: 'oimhoiohmhoih',
      note: 'p2',
      floor: 1,
      spaceNumber: 2,
      occupancyTime: 24,
      availability: true
    },
    {
      _id: 'oimjoijlhui',
      note: 'p1',
      floor: 1,
      spaceNumber: 3,
      occupancyTime: 24,
      availability: true
    }
  ];

  constructor(private http: HttpClient,
              private auth: AuthService) {}

  getParkings() {
    this.http.get('http://localhost:3000/api/parkings').subscribe(
      (parkings: Parking[]) => {
        this.parkings$.next(parkings);
      },
      (error) => {
        this.parkings$.next([]);
        console.error(error);
      }
    );
  }

  getParkingById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/parkings/' + id).subscribe(
        (parking: Parking) => {
          resolve(parking);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createParking(parking: Parking) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('parking', JSON.stringify(parking));

      this.http.post('http://localhost:3000/api/parkings', formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyParking(id: string, parking: Parking ) {
    return new Promise((resolve, reject) => {
      if (typeof id === 'string') {
        this.http.put('http://localhost:3000/api/parkings/' + id, parking).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('parking', JSON.stringify(parking));
        this.http.put('http://localhost:3000/api/parkings/' + id, formData).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  deleteParking(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/parkings/' + id).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
