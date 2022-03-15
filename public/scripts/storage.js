// LOCAL STORAGE EXAMPLE

const currentOrder = {
  "Spud Burger": {
    name: "Spud Burger",
    price: 3.00,
    quantity: 2
  },
  "Tot-Pop": {
    name: "Tot-Pop",
    price: 1.00,
    quantity: 2
  },
  dessert: {
    name: "potato icecream",
    price: 12.00,
    quantity: 2
  }
}

localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
// console.log(localStorage.getItem('currentOrder'));
/*
{"fries":2,"drinks":3,"icecream":1}
*/


let newOrder = localStorage.getItem('currentOrder');
// console.log(JSON.parse(newOrder));
/*
{fries: 2, drinks: 3, icecream: 1}
drinks: 3
fries: 2
icecream: 1
*/

// REMOVE
// localStorage.removeItem('myCat');
// CLEAR
// localStorage.clear();

// window.reload()