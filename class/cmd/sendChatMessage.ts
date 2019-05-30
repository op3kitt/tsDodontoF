import StateHolder from '../StateHolder';
import Room from '../Room';

export default (ws, params) => {
  let room: Room = StateHolder.roomData.filter((v)=>{return v.roomNo == params.roomNo}).pop();
  if(room){
    room.chatMessages.push({
      channel: params.channel,
      senderName: params.senderName,
      message: params.message,
      color: params.color
    });
    StateHolder.sendMessage(params.roomNo, {
      event: "chatMessage",
      data: [{
        channel: params.channel,
        senderName: params.senderName,
        message: params.message,
        color: params.color
      }]
    });
  }
};
