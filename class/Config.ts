import * as fs from 'fs';

class Config
{
  private static config = {
    logger: {
      appenders: {
        all: { type: 'file', filename: 'logs/all.log' , maxLogSize: 10 * 1024 * 1024, backups: 5 }
      },
      categories: { default: { appenders: ['all'], level: 'debug' } }
    },
    createPlayRoomPassword: "",
    server: {
      port: 6500
    },
    firebase: {
      apiKey: "APIKEY",
      authDomain: "dodontofauth.firebaseapp.com",
      databaseURL: "https://dodontofauth.firebaseio.com",
      projectId: "dodontofauth",
      storageBucket: "dodontofauth.appspot.com",
      messagingSenderId: "494526771402"
    },
    bcdiceUrl: "http://127.0.0.1:8001/",

    APP_PATH: null,

    load: (file) => {
      try{
        let stat = fs.statSync(file);
        let data = JSON.parse(fs.readFileSync(file).toString());
        Config.config = Object.assign(Config.config, data);
      }catch(err){
      }
    }
  };

  static getInstance()
  {
    return Config.config;
  }
}

export default Config.getInstance();
