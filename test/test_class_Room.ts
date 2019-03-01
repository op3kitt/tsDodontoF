import * as chai from 'chai';
import * as mocha from 'mocha';
import Room from '../class/Room';

describe('#class Room', () => {
  it('create Room', () => {
    let room = Room.createRoom({});

    let {roomNo, title, system, diceBot, password, createdDay, updatedDay} = room;

    chai.assert.ok(true);
  });

  it('create Room with empty password', () => {
    let room = Room.createRoom(
      {
        password: "" 
      }
    );

    let {roomNo, title, system, diceBot, password, createdDay, updatedDay} = room;

    chai.assert.ok(room.checkPassword("test"));
  });
  it('create Room with params', () => {
    let room = Room.createRoom(
      {
        title   : "test Room",
        system  : "general",
        diceBot : "general",
        password: "test" 
      }
    );

    let {roomNo, title, system, diceBot, password, createdDay, updatedDay} = room;

    chai.assert.equal(room.title, "test Room");
    chai.assert.equal(room.system, "general");
    chai.assert.equal(room.diceBot, "general");
    chai.assert.notEqual(room.password, "test");
    chai.assert.ok(room.checkPassword("test"));
  });
});