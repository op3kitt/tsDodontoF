import * as fs from 'fs';
import Logger from './Logger';
import Room from './Room';

class StateHolder
{
  private static instance = {
    load: (file) => {
      try{
        let stat = fs.statSync(file);
        let data = JSON.parse(fs.readFileSync(file).toString());
        StateHolder.instance.roomData = Object.assign([], data);
      }catch(err){
        Logger.error(err);
      }
    },
    userList: [],
    roomData: [],
  };

  static getInstance()
  {
    return StateHolder.instance;
  }
}

export default StateHolder.getInstance();