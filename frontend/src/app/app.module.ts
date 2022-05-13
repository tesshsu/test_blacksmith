import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ParkingListComponent } from './parking-list/parking-list.component';
import { SingleParkingComponent } from './single-parking/single-parking.component';
import { ParkingFormComponent } from './parking-form/parking-form.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { AuthInterceptor } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ParkingListComponent,
    SingleParkingComponent,
    ParkingFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
