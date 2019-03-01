import StateHolder from '../StateHolder';

export default (ws, param) => {
      ws.send(JSON.stringify(StateHolder.roomData));
};
