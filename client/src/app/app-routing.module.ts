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
import { RideViewComponent } from './ride-view/ride-view.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { NavigationForRideViewComponent } from './navigation-for-ride-view/navigation-for-ride-view.component';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { RiderProfileComponent } from './rider-profile/rider-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'nav',
    component: NavigationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addride',
    component: AddrideComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rideDetails/:start/:end',
    component: RideDetailsFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewRides',
    component: RideViewComponent,
  },
  {
    path: 'thankyou',
    component: ThankYouPageComponent,
  },
  {
    path: 'map',
    component: MapboxComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rideDetailsView/:id/:data',
    component: CardDetailsComponent,
  },
  {
    path: 'navigationForDetailsView/:start/:end',
    component: NavigationForRideViewComponent,
  },
  {
    path: 'riderProfile/:id',
    component: RiderProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
