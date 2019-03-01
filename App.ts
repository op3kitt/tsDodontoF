import Logger from './class/Logger';
import Config from './class/Config';
import * as path from 'path';
import * as express from 'express';
import * as expressWs from 'express-ws';
import Routes from './class/Routes';

Config.load('config.json');
Config.APP_PATH = path.resolve('.');

console.log('Application launched at', new Date());
Logger.debug(JSON.stringify(Config));

const server = expressWs(new express());
const app = new Routes(server).app;

export default app.listen(Config.server.port);