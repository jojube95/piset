import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard} from './auth/auth.guard';
import { SignUpComponent} from './auth/sign-up/sign-up.component';
import { SignInComponent} from './auth/sign-in/sign-in.component';
import { MainPageComponent} from './mainPage/main-page.component';
import { GroupManagementComponent} from './mainPage/admin/group-management/group-management.component';
import { TaskManagementComponent } from './mainPage/admin/task-management/task-management.component';
import { UserManagementComponent} from './mainPage/admin/user-management/user-management.component';
import { PenaltyManagementComponent} from './mainPage/admin/penalty-management/penalty-management.component';
import { UserInfoComponent} from './mainPage/user/user-info/user-info.component';
import { UserSettingsComponent} from './mainPage/user/user-settings/user-settings.component';
import { TasksComponent} from './mainPage/tasks/tasks.component';
import { HistoryComponent} from './mainPage/history/history.component';

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
