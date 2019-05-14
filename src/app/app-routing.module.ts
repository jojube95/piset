import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard} from './auth/auth.guard';
import { SignUpComponent} from './user/sign-up-user/sign-up.component';
import { SignInComponent} from './auth/sign-in/sign-in.component';
import {UserMainPageComponent} from './user/user-main-page/user-main-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full'},
  { path : 'signUp', component: SignUpComponent},
  { path : 'signIn', component: SignInComponent},
  { path: 'user', component: UserMainPageComponent, canActivate: [AuthGuard], children: [
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
