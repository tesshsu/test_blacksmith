import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users$ = new Subject<User[]>();
  isAuth$ = new BehaviorSubject<boolean>(false);
  userRole$ = new BehaviorSubject<string>('');
  private authToken: string;
  private userId: string;

  constructor(private http: HttpClient,
              private router: Router) {}

  createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signup', {email: email, password: password}).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getToken() {
    return this.authToken;
  }

  getUsers() {
    this.http.get('http://localhost:3000/api/auth/users').subscribe(
      (users: User[]) => {
        this.users$.next(users);
      },
      (error) => {
        this.users$.next([]);
        console.error(error);
      }
    );
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password) {
    return new Promise<void>((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/login', {email: email, password: password}).subscribe(
        (response: {userId: string, token: string, userRole: string}) => {
          this.userId = response.userId;
          this.authToken = response.token;
          this.userRole$.next(response.userRole);
          this.isAuth$.next(true);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  logout() {
    this.authToken = null;
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}
