const moment= require('moment');

let date = new Date();
// console.log(date.toDateString().split(' ')[1]);

let datem= moment();
// datem.add(100, 'year').subtract(9, 'months');
console.log(datem.format('h:mm a'));