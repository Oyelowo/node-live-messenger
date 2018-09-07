const moment= require('moment');

let date = new Date();
console.log('date', date.getTime());
// console.log(date.toDateString().split(' ')[1]);

let someTimestamp = moment().valueOf();
console.log('someTimestamp', someTimestamp);

let createdAt = 1234;
let datem= moment(createdAt);
// datem.add(100, 'year').subtract(9, 'months');
console.log(datem.format('h:mm a'));