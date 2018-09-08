[{
        id: ''
    }
]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
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
        return this.users.filter(user=> user.id!==id);
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
