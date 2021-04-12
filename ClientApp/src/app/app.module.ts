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
import { ParkEditorComponent } from './park-editor/park-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFullInfoEditorComponent } from './user-full-info-editor/user-full-info-editor.component';
import { UserPublicInfoEditorComponent } from './user-public-info-editor/user-public-info-editor.component';
import { DogEditorComponent } from './dog-editor/dog-editor.component';
import { PictureInfoEditorComponent } from './picture-info-editor/picture-info-editor.component';



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
    ParkMapComponent,
    ParkEditorComponent,
    UserFullInfoEditorComponent,
    UserPublicInfoEditorComponent,
    DogEditorComponent,
    PictureInfoEditorComponent

  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
