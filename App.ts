import Logger from './class/Logger';
import Config from './class/Config';
import StateHolder from './class/StateHolder';
import Routes from './class/Routes';
import * as path from 'path';
import * as express from 'express';
import * as expressWs from 'express-ws';
import * as https from 'https';
import * as fs from 'fs';

Config.APP_PATH = path.resolve('.');

console.log('Application launched at', new Date());
Logger.debug(JSON.stringify(Config));

const server = expressWs(new express());
const app = new Routes(server).app;

export default app.listen(Config.server.port);

StateHolder.load("save/saveData.json");
setInterval(StateHolder.save, 30000);