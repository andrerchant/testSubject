import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

export interface data{
  _user:string,
  _score:number,
  _hotel_key:string,
  _sections:Array<string>
}

class CurrentConfig{


  data:data={
    _user:"",
    _score:0,
    _hotel_key:"",
    _sections:[]
  }
  changes:Subject<any> = new Subject<any>();

  constructor(){  }

  set user(val_user:string){
    this.data._user = val_user;
    this.changes.next(this.data);
  }
  set score(val_score:number){
    this.data._score = val_score;
    this.changes.next(this.data);

  }
  set hotel_key(val_hotel_key:string){
    this.data._hotel_key = val_hotel_key;
    this.changes.next(this.data);
  }

  get user(){ return this.data._user}
  get score(){ return this.data._score}
  get hotel_key(){ return this.data._hotel_key}

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'testingsub';
  conf:CurrentConfig;

  @ViewChild("user") user_input : ElementRef;
  @ViewChild("score") score_input : ElementRef;
  @ViewChild("hotel_key") hotel_key_input : ElementRef;

  constructor(){
    this.conf = new CurrentConfig();
    this.conf.changes
    .subscribe(
      res=>{
        this.saveData(res);
      }
    )
  }
  changer(type:string){
    this.conf[type] = this[`${type}_input`].nativeElement.value;
  }

  saveData(val){
    let confMod = JSON.stringify(val);
    localStorage.setItem("conf",confMod);
    //console.log("conf",confMod);
  }
}
