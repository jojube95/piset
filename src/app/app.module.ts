import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TaskManagementComponent} from './main-page/admin/task-management/task-management.component';
import {UserManagementComponent} from './main-page/admin/user-management/user-management.component';
import {GroupManagementComponent} from './main-page/admin/group-management/group-management.component';
import {PenaltyManagementComponent} from './main-page/admin/penalty-management/penalty-management.component';
import {DateFilterPipe} from './pipe/date-filter.pipe';
import {UserFilterPipe} from './pipe/user-filter.pipe';
import {UserSettingsComponent} from './main-page/user/user-settings/user-settings.component';
import {UserInfoComponent} from './main-page/user/user-info/user-info.component';
import {LoadingSpinerComponent} from './ui/loading-spiner/loading-spiner.component';
import {TasksComponent} from './main-page/tasks/tasks.component';
import {HistoryComponent} from './main-page/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MainPageComponent,
    TaskManagementComponent,
    UserManagementComponent,
    GroupManagementComponent,
    PenaltyManagementComponent,
    LoadingSpinerComponent,
    UserInfoComponent,
    UserSettingsComponent,
    UserFilterPipe,
    DateFilterPipe,
    TasksComponent,
    HistoryComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
