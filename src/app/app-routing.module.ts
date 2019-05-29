import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard} from './auth/auth.guard';
import { SignUpComponent} from './auth/sign-up/sign-up.component';
import { SignInComponent} from './auth/sign-in/sign-in.component';
import { MainPageComponent} from './mainPage/main-page/main-page.component';
import { GroupManagementComponent} from './mainPage/main-page/admin/group-management/group-management.component';
import { TaskManagementComponent } from './mainPage/main-page/admin/task-management/task-management.component';
import { UserManagementComponent} from './mainPage/main-page/admin/user-management/user-management.component';
import { PenaltyManagementComponent} from './mainPage/main-page/admin/penalty-management/penalty-management.component';
import { UserInfoComponent} from './mainPage/main-page/user/user-info/user-info.component';
import { UserSettingsComponent} from './mainPage/main-page/user/user-settings/user-settings.component';
import { TasksComponent} from './mainPage/main-page/tasks/tasks.component';
import { HistoryComponent} from './mainPage/main-page/history/history.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full'},
  { path : 'signUp', component: SignUpComponent},
  { path : 'signIn', component: SignInComponent},
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard], children: [
      { path: 'admin', canActivate: [AuthGuard], children: [
          {path: 'taskManagement', component: TaskManagementComponent},
          {path: 'userManagement', component: UserManagementComponent},
          {path: 'penaltyManagement', component: PenaltyManagementComponent},
          {path: 'groupManagement', component: GroupManagementComponent},
        ]},
      { path: 'user', canActivate: [AuthGuard], children: [
          {path: 'info', component: UserInfoComponent},
          {path: 'settings', component: UserSettingsComponent}
        ]
      },
      { path: 'tasks', canActivate: [AuthGuard], component: TasksComponent},
      { path: 'history', canActivate: [AuthGuard], component: HistoryComponent}

    ]
  },

  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
