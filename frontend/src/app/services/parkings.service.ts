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
  constructor(private http: HttpClient,
              private auth: AuthService) {}

  getParkings(bodyData: any = {}) {
    let httpURL = 'http://localhost:3000/api/parkings';
    if(bodyData && bodyData.floor){
      httpURL += `?floor=${bodyData.floor}`;
    }
    console.log('httpURL : ', httpURL);
    this.http.get(httpURL).subscribe(
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
      this.http.post('http://localhost:3000/api/parkings', parking).subscribe(
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
      this.http.put('http://localhost:3000/api/parkings/' + id, parking).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
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
