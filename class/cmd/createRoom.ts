import StateHolder from '../StateHolder';
import Room from '../Room';

export default (ws, params) => {
  var roomNo = 0;
  for(var item of StateHolder.roomData){
    if(item == undefined || item.roomNo != roomNo) {
      break;
    }
    roomNo++;
  }
  params.roomNo = roomNo;
  StateHolder.roomData[roomNo] = Room.createRoom(params);
  const data = StateHolder.roomData.map((v) => {
        return {
              roomNo: v.roomNo,
              title: v.title,
              system: v.system,
              password: !!v.password,
              createdDay: v.createdDay,
              updatedDay: v.updatedDay,
              number: v.userList.length
        }
  }).filter((v)=>{return v});
  ws.send(JSON.stringify({event:"getRoomStates", data:data}));
};
