import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { CompareValidatorDirective } from './utilities/compare-validator.directive';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NgbButtonsModule, NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MainPageComponent } from './mainPage/main-page.component';
import { GroupManagementComponent } from './mainPage/admin/group-management/group-management.component';
import { TaskManagementComponent } from './mainPage/admin/task-management/task-management.component';
import { PenaltyManagementComponent } from './mainPage/admin/penalty-management/penalty-management.component';
import { UserManagementComponent } from './mainPage/admin/user-management/user-management.component';
import { UserInfoComponent } from './mainPage/user/user-info/user-info.component';
import { UserSettingsComponent } from './mainPage/user/user-settings/user-settings.component';
import { TasksComponent } from './mainPage/tasks/tasks.component';
import { HistoryComponent } from './mainPage/history/history.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { HttpClientModule } from '@angular/common/http';


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
    LoadingSpinnerComponent,
    UserFilterPipe,
    DateFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
    BsDatepickerModule,
    NgbButtonsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
