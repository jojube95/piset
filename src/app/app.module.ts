import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { CompareValidatorDirective } from './utilities/compare-validator.directive';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MainPageComponent } from './mainPage/main-page/main-page.component';
import { GroupManagementComponent } from './mainPage/main-page/admin/group-management/group-management.component';
import { TaskManagementComponent } from './mainPage/main-page/admin/task-management/task-management.component';
import { PenaltyManagementComponent } from './mainPage/main-page/admin/penalty-management/penalty-management.component';
import { UserManagementComponent } from './mainPage/main-page/admin/user-management/user-management.component';
import { UserInfoComponent } from './mainPage/main-page/user/user-info/user-info.component';
import { UserSettingsComponent } from './mainPage/main-page/user/user-settings/user-settings.component';
import { TasksComponent } from './mainPage/main-page/tasks/tasks.component';
import { HistoryComponent } from './mainPage/main-page/history/history.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { BsDatepickerModule} from 'ngx-bootstrap';
import {DateUtilities} from './utilities/date-utilities';

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
    MainPageComponent,
    GroupManagementComponent,
    TaskManagementComponent,
    PenaltyManagementComponent,
    UserManagementComponent,
    UserInfoComponent,
    UserSettingsComponent,
    TasksComponent,
    HistoryComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseCredentials),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    NgbDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }, DateUtilities],
  bootstrap: [AppComponent]
})
export class AppModule { }
