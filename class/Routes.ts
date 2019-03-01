import Config from './Config';
import * as path from 'path';
import { Nuxt, Builder } from 'nuxt';
import {ClientRequest, ServerResponse} from 'http';
import Logger from './Logger';
import StateHolder from './StateHolder';
import nuxtConfig from '../nuxt.config';
import * as expressWs from 'express-ws';
import Cmd from './cmd/Cmd';

const defaultRoute = (req: ClientRequest, res: ServerResponse) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("\"Server alives.\"");
};


export default class Routes
{
  private _app;
  private _awss;
  private nuxt;

  constructor(server) {
    let app = server.app;
    this._awss = server.getWss('/');
    this._app = app;

    this.nuxt = new Nuxt(nuxtConfig);

    if (this.nuxt.options.dev) {
      new Builder(this.nuxt).build();
    }

    app.ws('/', (ws, req, next) => {
      ws.on('message', (msg) => {
        console.log(msg);
        let data = JSON.parse(msg);
        if(Cmd[data.cmd]){
          Cmd[data.cmd](ws, data.params);
        }
      });
    });
    
    app.use(this.nuxt.render);
  }

  get app(){
    return this._app;
  }
};