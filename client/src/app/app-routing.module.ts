import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddrideComponent } from './addride/addride.component';
import { AuthGuard } from './authGuard/authGuard';
import { MapboxComponent } from './mapbox/mapbox.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RideDetailsFormComponent } from './ride-details-form/ride-details-form.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"registration",
    component:RegistrationComponent
  },
  {
    path:"profile",
    component:UserProfileComponent,

  },
  {
    path:"nav",
    component:NavigationComponent,

  },
  {
    path:"addride",
    component:AddrideComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"rideDetails",
    component:RideDetailsFormComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"map",
    component:MapboxComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
