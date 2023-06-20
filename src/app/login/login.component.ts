import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage:string='';
  loginData:any;
  hide = true;
  isLoading:boolean=false;


  constructor(private _AuthApiService:AuthApiService,private _Router:Router){}
  ngOnInit(): void {
    if(localStorage.getItem('userToken') !=null)
    {
      this._Router.navigate(['/home']);
    }
    this.loginForm();

    }
  loginForm(){
    this.isLoading=true;
  this.loginData =new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl(null,[Validators.pattern(/^[a-z0-9]{3,}$/),Validators.required]),
  })
  }

  signIn(FormGroup:FormGroup):void
  {
    this.isLoading=false;
  this._AuthApiService.signIn(FormGroup.value).subscribe({
    next:(response)=>{
      if(response.message === 'success')
      {
        localStorage.setItem('userToken',response.token);
        this._AuthApiService.saveUserData();
      this._Router.navigate(['/home']);

        // Go to Home
      }
      else{
        this.errorMessage=response.message;
      }
    },
    complete:()=>{
      this.isLoading=true;
    }
  })

  }
}
