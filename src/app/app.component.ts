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

  constructor(){
    for(let key in this.data){
      Object.defineProperty(this,key,{
        get: () => { return this.data[key]; },
        set: (value:any) => {
          this.data[key] = value;
          this.changes.next(this.data);
          console.log("setting/retrieving data");
        }
      })
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'testingsub';
  conf:CurrentConfig;

  @ViewChild("user") _user_input : ElementRef;
  @ViewChild("score") _score_input : ElementRef;
  @ViewChild("hotel_key") _hotel_key_input : ElementRef;

  constructor(){
    this.conf = new CurrentConfig();
    this.conf.changes
    .subscribe(
      res=>{
        console.log("Data has changed");
        this.saveData(res);
      },err=>{console.log("err: ",err)},()=>{console.log("finished subscribe")}
    )
  }
  changer(type:string){
    this.conf[type] = this[`${type}_input`].nativeElement.value;
    console.log("this.conf[type]",this.conf[type]);
  }

  saveData(val){
    let confMod = JSON.stringify(val);
    localStorage.setItem("conf",confMod);
    //console.log("conf",confMod);
  }
}
