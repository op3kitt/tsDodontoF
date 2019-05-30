import StateHolder from '../StateHolder';

export default (ws, param) => {
  let room = StateHolder.roomData.filter((v)=>{return v.roomNo == param.roomNo}).pop();
  if(room){
    if(room.password == ""){
      delete StateHolder.roomData[room.roomNo];
    }else{
      if(param.password && room.checkPassword(param.password)){
        delete StateHolder.roomData[room.roomNo];
      }
    }
  }
};