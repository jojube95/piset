import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {MainPageComponent} from './main-page/main-page.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {TaskManagementComponent} from './main-page/admin/task-management/task-management.component';
import {UserManagementComponent} from './main-page/admin/user-management/user-management.component';
import {GroupManagementComponent} from './main-page/admin/group-management/group-management.component';
<<<<<<< HEAD
import {PenaltyManagementComponent} from './main-page/admin/penalty-management/penalty-management.component';
=======
>>>>>>> dev
import {UserSettingsComponent} from './main-page/user/user-settings/user-settings.component';
import {UserInfoComponent} from './main-page/user/user-info/user-info.component';
import {TasksComponent} from './main-page/tasks/tasks.component';
import {HistoryComponent} from './main-page/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full'},
  { path : 'signUp', component: SignUpComponent},
  { path : 'signIn', component: SignInComponent},
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard], children: [
    { path: 'admin', canActivate: [AuthGuard], children: [
        {path: 'taskManagement', component: TaskManagementComponent},
        {path: 'userManagement', component: UserManagementComponent},
<<<<<<< HEAD
        {path: 'penaltyManagement', component: PenaltyManagementComponent},
=======
>>>>>>> dev
        {path: 'groupManagement', component: GroupManagementComponent},
      ]
    },
    { path: 'user', canActivate: [AuthGuard], children: [
            {path: 'info', component: UserInfoComponent},
            {path: 'settings', component: UserSettingsComponent}
        ]
    },
    { path: 'tasks', canActivate: [AuthGuard], component: TasksComponent},
    { path: 'history', canActivate: [AuthGuard], component: HistoryComponent},
  ]}
  ]
;

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
