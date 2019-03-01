import Config from './Config';
import * as Log4js from 'log4js';
Log4js.configure(Config.logger);

export default Log4js.getLogger('all');