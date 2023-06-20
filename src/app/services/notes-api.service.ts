import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  baseUrl=`https://sticky-note-fe.vercel.app/`
  constructor(private _HttpClient:HttpClient) { }
getUserNotes(data:object):Observable<any>
{
  return this._HttpClient.post(this.baseUrl+'getUserNotes',data)
}

addNotes(data:object):Observable<any>
{
  return this._HttpClient.post(this.baseUrl+'addNote',data)
}
deleteNote(data:object):Observable<any>
{
  return this._HttpClient.delete(this.baseUrl+'deleteNote',data)
}
editNote(data:object):Observable<any>
{
  return this._HttpClient.put(this.baseUrl+'updateNote',data)
}
}
