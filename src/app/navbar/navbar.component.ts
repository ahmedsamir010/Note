import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
isLogin:boolean=false;
  constructor(private _AuthApiService:AuthApiService) {     }

  ngOnInit(): void {
    this.alreadyLogin();
  }

alreadyLogin()
{
this._AuthApiService.userData.subscribe({
  next:()=>{


    if(this._AuthApiService.userData.getValue() != null)
    {

      this.isLogin=true;
    }
    else{
      this.isLogin=false;
    }
  }
})

}

logOut()
{
  this._AuthApiService.signOut();
}


}
