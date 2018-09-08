[{
        id: ''
    }
]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        room = room.toLowerCase();
        let user = {
            id,
            name,
            room
        };
        this
            .users
            .push(user);
        return user;
    }
    

    removeUser(id) {
        let removed
 
        this.users = this.users.filter(user => {
          if (user.id === id) {
            removed = user;
            return false;
          }
          return true;
        });
     
        return removed
      
    }

    getUser(id) {
        return this.users.filter(user=> user.id===id)[0];
    }


    getUsersList(room) {
        let users = this.users.filter(user => user.room === room);
        let namesArray=users.map(user => user.name);
        return namesArray;
    }

}

module.exports = {
    Users
};
