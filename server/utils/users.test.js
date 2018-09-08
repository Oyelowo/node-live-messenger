const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    let users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Oyelowo',
                room: 'CodeMonks'
            }, {
                id: '2',
                name: 'Dayo',
                room: 'Music'
            }, {
                id: '3',
                name: 'Juka',
                room: 'CodeMonks'
            }
        ];
    });
    

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: 11,
            name: 'Oyelowo',
            room: 'The coders'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for CodeMonks room users', () => {
        let userList = users.getUsersList('CodeMonks');
        expect(userList).toEqual(['Oyelowo', 'Juka'])
    });

    it('should return names for Music room users', () => {
        let userList = users.getUsersList('Music');
        expect(userList).toEqual(['Dayo']);
    });
});
