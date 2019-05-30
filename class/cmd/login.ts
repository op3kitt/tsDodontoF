import StateHolder from '../StateHolder';

export default (ws, param) => {
  let room = StateHolder.roomData.filter((v)=>{return v.roomNo == param.roomNo}).pop();
  if(room){
    if(room.password == ""){
      ws.send(JSON.stringify({event: "loginResult", result: true}));
      room.addUser(ws);
      ws.send(JSON.stringify({
        event: "roomInfo",
        data: {
          chatChannels: room.chatChannels
        }
      }));
      ws.send(JSON.stringify({
        event: "chatMessage",
        data: room.chatMessages
      }));
    }else{
      if(param.password && room.checkPassword(param.password)){
        ws.send(JSON.stringify({event: "loginResult", result: true}));
        room.addUser(ws);
        ws.send(JSON.stringify({
          event: "roomInfo",
          data: {
            chatChannels: room.chatChannels
          }
        }));
        ws.send(JSON.stringify({
          event: "chatMessage",
          data: room.chatMessages
        }));
      }else{
        ws.send(JSON.stringify({event: "loginResult", result: false, password: true}));
      }
    }
  }else{
    ws.send(JSON.stringify({event: "loginResult", result: false}));
  }
};