import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { CompareValidatorDirective } from './utilities/compare-validator.directive';
import { SignUpComponent } from './user/sign-up-user/sign-up.component';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserMainPageComponent } from './user/user-main-page/user-main-page.component';

export const firebaseCredentials = {
  apiKey: ' AIzaSyCZq6n9XqQE6_rW-T-fXX8aEUTQTnu8qsk',
  authDomain: 'piset-9bf03.firebaseapp.com',
  databaseURL: 'https://piset-9bf03.firebaseio.com',
  projectId: 'piset-9bf03',
  storageBucket: 'piset-9bf03.appspot.com',
};

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CompareValidatorDirective,
    SignUpComponent,
    UserMainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseCredentials),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
