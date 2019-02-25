import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CurrentConfig, ConfService } from 'src/app/services/conf.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'testingsub';

  @ViewChild("user") _user_input : ElementRef;
  @ViewChild("score") _score_input : ElementRef;
  @ViewChild("hotel_key") _hotel_key_input : ElementRef;

  constructor(
    public _confService : ConfService,
  ){  }

  changer(type:string,inserted?:any){
    this._confService.conf[type] = inserted || this[`${type}_input`].nativeElement.value;
    console.log("this.conf[type]",this._confService.conf[type]);
  }

  changeThis(){
    let postre ={
      matutino:true,
      cantidad:5,
      cual:"arroz"
    }
    this.changer("Postre",postre);
  }

  //This automatic sets on LS when set a property
  otro(){
    this._confService.conf._user="Mother";
    console.log("done");
  }


}
