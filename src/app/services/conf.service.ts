import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { data, cuestionario } from 'src/app/services/conf'

export class CurrentConfig{

  data:data={
    _user:"",
    _score:0,
    _hotel_key:"",
    _sections:[],
    Postre:{
      matutino:false,
      cantidad:0,
      cual:""
    }
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

@Injectable({
  providedIn: 'root'
})
export class ConfService {
  conf:any;

  constructor() {
    this.conf = new CurrentConfig();
    this.conf.changes
    .subscribe(
      res=>{
        console.log("Data has changed");
        this.saveData(res);
      },err=>{console.log("err: ",err)},()=>{console.log("finished subscribe")}
    )
  }

  saveData(val){
    let confMod = JSON.stringify(val);
    localStorage.setItem("conf",confMod);
    //console.log("conf",confMod);
  }


}
