import * as fs from 'fs';
import Logger from './Logger';
import Room from './Room';
import Config from './Config'

class StateHolder
{
  private static instance = {
    load: (file) => {
      try{
        let stat = fs.statSync(file);
        let data = JSON.parse(fs.readFileSync(file).toString());
        data.forEach((v) => {
          StateHolder.instance.roomData[v.roomNo] = new Room(v);
        });
      }catch(err){
        Logger.error(err);
      }
    },
    save: () => {
      switch(Config.saveFile.mode){
        case "file":
        fs.writeFileSync('save/saveData.json', JSON.stringify(StateHolder.instance.roomData));
      }
    },
    sendMessage: (roomNo, obj) => {
      const room = StateHolder.instance.roomData.filter((v)=>{return v.roomNo == roomNo}).pop();
      if(room){
        room.userList.forEach(user => {
          user.send(JSON.stringify(obj));
        });
      }
    },
    roomData: new Array<Room>()
  };

  static getInstance()
  {
    return StateHolder.instance;
  }

}

export default StateHolder.getInstance();