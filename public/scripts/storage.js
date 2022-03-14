// LOCAL STORAGE EXAMPLE

const currentOrder = {
  fries: 2,
  drinks: 3,
  icecream: 1
}

localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
console.log(localStorage.getItem('currentOrder'));
/*
{"fries":2,"drinks":3,"icecream":1}
*/


let newOrder = localStorage.getItem('currentOrder');
console.log(JSON.parse(newOrder));
/*
{fries: 2, drinks: 3, icecream: 1}
drinks: 3
fries: 2
icecream: 1
*/