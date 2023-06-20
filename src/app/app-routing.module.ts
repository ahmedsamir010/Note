import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard/guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes =
[
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent,title:"login"},
  {path:"register",component:RegisterComponent,title:"register"},
  {path:"home",canActivate:[GuardGuard],component:HomeComponent,title:"home"},


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
