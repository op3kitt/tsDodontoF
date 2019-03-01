import * as chai from 'chai';
import * as mocha from 'mocha';
import Config from '../class/Config';

describe('#class Config', () => {
  it('call load', () => {
    Config.load('config.json');

    chai.assert.ok(true);
  });

  it('load file not exists', () => {
    Config.load('noconfig.json');

    chai.assert.ok(true);
  });
});