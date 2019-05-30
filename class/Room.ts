import * as crypt from 'bcryptjs';

export default class Room
{
  private _roomNo    : number;
  private _title     : string;
  private _system    : string;
  private _diceBot   : string;
  private _password  : string;
  private _chatChannels  : Array<string>;
  private _chatMessages  : Array<any>;
  private _userList : Array<WebSocket>
  private _createdDay: Date;
  private _updatedDay: Date;

  constructor(data){
    if(data){
      this._roomNo  = data.roomNo;
      this.title    = data.title;
      this._system  = data.system;
      this._diceBot = data.diceBot;
      this.password = data.password;
      this._createdDay = data.createdDay;
      this._updatedDay = data.createdDay;
      this._chatChannels = data.chatChannels;
      this._chatMessages = data.chatMessages;
      this._userList = [];
    }
  }

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

  get chatChannels(): Array<string>
  {
    return this._chatChannels;
  }

  get chatMessages(): Array<any>
  {
    return this._chatMessages;
  }

  get userList(): Array<WebSocket>
  {
    return this._userList;
  }

  static createRoom(param: Object)
  {
    let room = new Room(false);
    param.hasOwnProperty("roomNo")   && (room._roomNo  = param["roomNo"]);
    param.hasOwnProperty("title")    && (room.title    = param["title"]);
    param.hasOwnProperty("system")   && (room._system  = param["system"]);
    param.hasOwnProperty("diceBot")  && (room._diceBot = param["diceBot"]);
    param.hasOwnProperty("password") && (room.password = param["password"]);
    room._createdDay = new Date();
    room._updatedDay = new Date();
    room._chatChannels = ["メイン"];
    room._chatMessages = [];
    room._userList = [];

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

  addUser(ws: WebSocket){
    this._userList.push(ws);
    ws.onclose = () => {
      delete this._userList[this._userList.findIndex((v) => {return v == ws})];
    };
  }

  addMessage(msgObj: any){
    this._chatMessages.push(msgObj);
  }

  checkPassword(password: string): boolean
  {
    if(this._password == ""){
      return true;
    }
    return crypt.compareSync(password, this._password);
  }

  changeChannels(channels: Array<string>){
    this._chatChannels = channels;
  }

  public toJSON()
  {
    return {
      roomNo    : this._roomNo,
      title     : this._title,
      system    : this._system,
      diceBot   : this._diceBot,
      password  : !!this._password,
      createdDay: this._createdDay,
      updatedDay: this._updatedDay,
      chatMessages: this._chatMessages,
      userList  : "[]",
      chatChannels: this._chatChannels
    };
  };
}