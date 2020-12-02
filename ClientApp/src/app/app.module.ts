import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { InterceptorService } from './interceptor.service';
import { ExternalApiComponent } from './external-api/external-api.component';
import { LoginorsignupComponent } from './loginorsignup/loginorsignup.component';
import { FrontPageGuard } from './auth/front-page.guard';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ParkMapComponent } from './park-map/park-map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NavBarComponent,
    ProfileComponent,
    ExternalApiComponent,
    LoginorsignupComponent,
    ParkMapComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
    { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [FrontPageGuard] },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [FrontPageGuard] },
    { path: 'external-api', component: ExternalApiComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginorsignupComponent },
    { path: 'map', component: ParkMapComponent },
], { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
