import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkingListComponent } from './parking-list/parking-list.component';
import { ParkingFormComponent } from './parking-form/parking-form.component';
import { SingleParkingComponent } from './single-parking/single-parking.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'parkings', component: ParkingListComponent, canActivate: [AuthGuard] },
  { path: 'parking/:id', component: SingleParkingComponent, canActivate: [AuthGuard] },
  { path: 'new-parking', component: ParkingFormComponent, canActivate: [AuthGuard] },
  { path: 'modify-parking/:id', component: ParkingFormComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'parkings'},
  { path: '**', redirectTo: 'parkings' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
