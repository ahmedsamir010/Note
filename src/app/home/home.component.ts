import { Router } from '@angular/router';
import { NotesApiService } from './../services/notes-api.service';
import { Component,OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
constructor(private _NotesApiService:NotesApiService,private _Router:Router){}
noteId:any;
token:any=localStorage.getItem('userToken')
decoded:any = jwt_decode(this.token);
userId:number=this.decoded._id
myNotes:any[]=[]
message:string='';
currentIndex:number=0;
noteDetails=new FormGroup({
title:new FormControl(null ,Validators.required ) ,
desc:new FormControl(null ,Validators.required )
})


ngOnInit(): void {

  this.displayNote();

}


displayNote()
{
  let data={
    token:this.token ,
    userID:this.userId ,
  }

  this._NotesApiService.getUserNotes(data).subscribe({
    next: res=>{
if(res.message === "success")
{

  this.myNotes=res.Notes
}
else{
  this.myNotes=[];
this.message=res.message;
}

    }
  })
}

addNote(dataForm:FormGroup)
{

let data={
  title:dataForm.value.title ,
  desc:dataForm.value.desc ,
  citizenID:this.userId ,
  token:this.token
}
this._NotesApiService.addNotes(data).subscribe({
  next:res=>{
  if(res.message === 'success')
  {
    $('#exampleModal').modal('hide')
    dataForm.reset();
    this.displayNote();

  }

}
})
}

getNoteId(id:any,i : number)
{
  this.currentIndex=i;

this.noteId=id;

}

deleteNote()
{


  let options={
    headers:new HttpHeaders({}),
    body:{
      NoteID:this.noteId ,
      token:localStorage.getItem('userToken')
    }
  }

  this._NotesApiService.deleteNote(options).subscribe({
    next:(res)=>{
if(res.message === "deleted")
{
// dusplay Notes
// hide Model
    $('#deleteNoteModel').modal('hide')
    this.displayNote();

  }

    }
  })

}


editnote(dataForm:FormGroup)
{
let data={
  token:localStorage.getItem('userToken') ,
  title:dataForm.value.title ,
  desc:dataForm.value.desc ,
  NoteID:this.noteId
}
this._NotesApiService.editNote(data).subscribe({
  next:(res)=>{

  $('#EditNoteModel').modal('hide')
  dataForm.reset();
  this.displayNote();

  }
})

}

// deleteNotes(): Observable<any> {
//   console.log("kljkl;j");

//   return new Observable(() => {
//     const notesIdAndToken: any[] = [];
//     this.myNotes.forEach((note) => {
//       const objectDelete: Object = {
//         body: {
//           NoteID:note._id,
//           token: localStorage.getItem('userToken'),
//         },
//       };
//       notesIdAndToken.push(objectDelete);
//     });
//     console.log(notesIdAndToken);
//     notesIdAndToken.forEach((item, index) => {
//       this._NotesApiService.deleteNote(item).subscribe({
//         next: (response) => {
//           if (response.message == 'success') {
//             if (index == notesIdAndToken.length - 1) {
//               this.displayNote();
//             }
//           }
//         },
//       });
//     });
//     });
//   }
}
