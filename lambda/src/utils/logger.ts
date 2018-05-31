import * as Winston from 'winston'

let level = 'debug';
if(process.env.NODE_ENV == 'test')
  level = 'error';

let transports = [
  new Winston.transports.Console({ timestamp: true })
];

const options:Winston.LoggerOptions = {
  level     : level,
  transports: transports
};

export const winston = new Winston.Logger(options);