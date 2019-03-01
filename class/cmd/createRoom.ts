import StateHolder from '../StateHolder';
import Room from '../Room';

export default (ws, params) => {
  StateHolder.roomData.push(Room.createRoom(params));
  ws.send(StateHolder.roomData);
};
