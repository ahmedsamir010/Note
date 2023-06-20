import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
errorMessage:string='';
registerData:any;
hide = true;
isLoading:boolean=false;

constructor(private _AuthApiService:AuthApiService,private _Router:Router)
 {
  if(localStorage.getItem("userToken") !=null)
  {
    this._Router.navigate(['/home'])
  }
  }

  ngOnInit(): void {
  this.registerForm()
  }

registerForm(){
  this.isLoading=true;
this.registerData =new FormGroup({
  first_name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(10),Validators.required]),
  last_name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(10),Validators.required]),
  email   : new FormControl('', [Validators.required, Validators.email]),
  password:new FormControl(null,[Validators.pattern(/^[a-z0-9]{3,}$/),Validators.required]),
})
}

signUp(FormGroup:FormGroup):void
{
  this.isLoading=false;
this._AuthApiService.signUp(FormGroup.value).subscribe({
  next:(response)=>{

    if(response.message === 'success')
    {
      this._Router.navigate(['/login']);
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

