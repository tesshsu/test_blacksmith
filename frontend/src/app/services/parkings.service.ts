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
      note: 'test add note',
      floor: 10,
      imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/LAstdabReduxx_1024x1024-1_1024x1024.jpg?v=1527778720',
    },
    {
      _id: 'oimhoiohmhoih',
      note: 'test add note',
      floor: 5,
      imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/LOS_CALIENTES1_1024x1024.jpg?v=1527709467',
    },
    {
      _id: 'oimjoijlhui',
      note: 'test add note',
      floor: 6,
      imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/bravado-blackgarlichotparking_1024x1024.jpg?v=1527270029',
    },
    {
      _id: 'sildjhv',
      note: 'test add note',
      floor: 3,
      imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/smokedonion1_1024x1024_copy_1024x1024.jpg?v=1538413599',
    },
    {
      _id: 'eroimfgjlfh',
      note: 'test add note',
      floor: 9,
      imageUrl: 'https://www.chilliworld.com/content/images/thumbs/0000827_blairs-ultra-death-parking-in-a-coffin_550.jpeg',
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

  createParking(parking: Parking, image: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('parking', JSON.stringify(parking));
      formData.append('image', image);
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

  modifyParking(id: string, parking: Parking, image: string | File) {
    return new Promise((resolve, reject) => {
      if (typeof image === 'string') {
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
        formData.append('image', image);
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
