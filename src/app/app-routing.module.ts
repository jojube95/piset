import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {MainPageComponent} from './main-page/main-page.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {TaskManagementComponent} from './main-page/admin/task-management/task-management.component';
import {UserManagementComponent} from './main-page/admin/user-management/user-management.component';
import {GroupManagementComponent} from './main-page/admin/group-management/group-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full'},
  { path : 'signUp', component: SignUpComponent},
  { path : 'signIn', component: SignInComponent},
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard], children: [
    { path: 'admin', canActivate: [AuthGuard], children: [
        {path: 'taskManagement', component: TaskManagementComponent},
        {path: 'userManagement', component: UserManagementComponent},
        //{path: 'penaltyManagement', component: PenaltyManagementComponent},
        {path: 'groupManagement', component: GroupManagementComponent},
      ]},
    ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
