import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

userData:any=new BehaviorSubject(null);

constructor(private _HttpClient:HttpClient,private _Router:Router){    this.alreadyLogin()}


alreadyLogin():void{
  if(localStorage.getItem("userToken")!=null)
  {
this.saveUserData();
  }
}
saveUserData()
{
  let encodeToken=JSON.stringify(localStorage.getItem('userToken'));
  let decodeToken:object=jwtDecode(encodeToken);
this.userData.next(decodeToken);
console.log(this.userData);
}


signUp(userData:object): Observable<any>
{
  return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,userData)
}

signIn(userData:object): Observable<any>
{
  return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,userData)
}
signOut()
{
  localStorage.removeItem("userToken")
  this.userData.next(null);
this._Router.navigate(['/login']);
}







}
