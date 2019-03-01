import * as crypt from 'bcryptjs';

export default class Room
{
  private _roomNo    : number;
  private _title     : string;
  private _system    : string;
  private _diceBot   : string;
  private _password  : string;
  private _createdDay: Date;
  private _updatedDay: Date;

  private constructor(){}

  get roomNo(): number
  {
    return this._roomNo;
  }

  get title(): string
  {
    return this._title;
  }

  get system(): string
  {
    return this._system;
  }

  get diceBot(): string
  {
    return this._diceBot;
  }

  get password(): string
  {
    return this._password;
  }

  get createdDay(): Date
  {
    return this._createdDay;
  }

  get updatedDay(): Date
  {
    return this._updatedDay;
  }

  static createRoom(param: Object)
  {
    let room = new Room();
    param.hasOwnProperty("title")    && (room.title    = param["title"]);
    param.hasOwnProperty("system")   && (room._system  = param["system"]);
    param.hasOwnProperty("diceBot")  && (room._diceBot = param["diceBot"]);
    param.hasOwnProperty("password") && (room.password = param["password"]);
    room._createdDay = new Date();
    room._updatedDay = new Date();

    return room;
  }

  set title(title: string)
  {
    this._title = title;
  }

  set password(password: string)
  {
    if(password != "" && password !== this._password)
    {
      this._password = crypt.hashSync(password, 10);
    }else{
      this._password = "";
    }
  }

  checkPassword(password: string): boolean
  {
    if(this._password == ""){
      return true;
    }
    return crypt.compareSync(password, this._password);
  }
}