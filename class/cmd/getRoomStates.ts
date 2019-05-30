import StateHolder from '../StateHolder';

export default (ws, param) => {
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
      ws.send(JSON.stringify({event: "getRoomStates", data: data}));
};
