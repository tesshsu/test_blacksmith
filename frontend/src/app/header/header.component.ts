import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  userRole: string;
  authSubscription: Subscription;
  userRoleSubscription: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
    this.userRoleSubscription = this.auth.userRole$.subscribe(
      (userRole) => {
        this.userRole = userRole;
      }
    );
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
