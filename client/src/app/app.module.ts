import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AddrideComponent } from './addride/addride.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RideDetailsFormComponent } from './ride-details-form/ride-details-form.component';
import { DateInputDirective } from './customDirective/date-input.directive';
import { RideViewComponent } from './ride-view/ride-view.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { SplitPipe } from 'src/pipe/split.pipe';
import { NavigationForRideViewComponent } from './navigation-for-ride-view/navigation-for-ride-view.component';
import {
  NgxStripeElementLoadingTemplateDirective,
  NgxStripeModule,
} from 'ngx-stripe';
import { environment } from 'environment';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { DateCheckPipe } from 'src/pipe/date-check.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ng2-tooltip-directive';
import { RiderProfileComponent } from './rider-profile/rider-profile.component';

@NgModule({
  declarations: [
    SplitPipe,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    SearchComponent,
    NavbarComponent,
    UserProfileComponent,
    AddrideComponent,
    MapboxComponent,
    NavigationComponent,
    RideDetailsFormComponent,
    DateInputDirective,
    RideViewComponent,
    CardDetailsComponent,
    NavigationForRideViewComponent,
    ThankYouPageComponent,
    DateCheckPipe,
    RiderProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TooltipModule,
    NgxStripeModule.forRoot(environment.stripe.publicKey),
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
