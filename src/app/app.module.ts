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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaskManagementComponent} from './main-page/admin/task-management/task-management.component';
import {UserManagementComponent} from './main-page/admin/user-management/user-management.component';
import {DateFilterPipe} from './pipe/date-filter.pipe';
import {UserUpdateComponent} from './main-page/user/user-settings/user-update/user-update.component';
import {UserInfoComponent} from './main-page/user/user-info/user-info.component';
import {LoadingSpinerComponent} from './ui/loading-spiner/loading-spiner.component';
import {TasksComponent} from './main-page/tasks/tasks.component';
import {HistoryComponent} from './main-page/history/history.component';
import {TestComponent} from './main-page/admin/test/test.component';
import {UserInvitationsComponent} from './main-page/user/user-invitations/user-invitations.component';
import {TaskUpdateComponent} from './main-page/tasks/task-update/task-update.component';
import {TaskAddComponent} from './main-page/tasks/task-add/task-add.component';
import {GroupAddComponent} from './main-page/groups/group-add/group-add.component';
import {GroupUpdateComponent} from './main-page/groups/group-update/group-update.component';
import {UserSettingsComponent} from './main-page/user/user-settings/user-settings.component';
import {TaskComponent} from './main-page/tasks/board/column/task/task.component';
import {ColumnComponent} from './main-page/tasks/board/column/column.component';
import {BoardComponent} from './main-page/tasks/board/board.component';
import {TaskDetailComponent} from './main-page/tasks/board/column/task-detail/task-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        MainPageComponent,
        TaskManagementComponent,
        UserManagementComponent,
        LoadingSpinerComponent,
        UserInfoComponent,
        UserSettingsComponent,
        UserUpdateComponent,
        UserInvitationsComponent,
        TestComponent,
        DateFilterPipe,
        TasksComponent,
        HistoryComponent,
        TaskUpdateComponent,
        TaskAddComponent,
        GroupAddComponent,
        GroupUpdateComponent,
        TaskComponent,
        ColumnComponent,
        BoardComponent,
        TaskDetailComponent
    ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
