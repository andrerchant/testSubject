export interface data{
  _user:string,
  _score:number,
  _hotel_key:string,
  _sections:Array<string>
  Postre?:{
    matutino:boolean,
    cantidad:number,
    cual:string
  }
}

export interface cuestionario{
    id:number,
    name:string,
}
