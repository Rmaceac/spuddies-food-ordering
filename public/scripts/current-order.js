

$(() => {


const dataOrder = [
  {
    id: 1,
    name: 'Tot pop',
    quantity: 1,
    price: 300
  },
  {
    id: 2,
    name: 'iced tea',
    quantity: 2,
    price: 200
  },
  {
    id: 3,
    name: 'tater-shake',
    quantity: 3,
    price: 600
  }
];



const $orderEntries = $('.order-entries');
const $removeBtn = $('.remove-btn');

// REMOVE ORDER ITEM
const addRemoveBtnListener = (removeBtn) => {
    removeBtn.on('click', (e => {
    e.preventDefault();
    const tr = e.target.parentElement.parentElement;
    tr.remove();
  }));
}



const renderOrder = (order) => {
  for (let item of order) {
    // Create new jquery object newItem
    const newItem = addOrderItem(item);

    // Retrieve the button element
    const removeBtn = newItem.find('.remove-btn');

    // Add event listener to remove button
    addRemoveBtnListener(removeBtn);
    $orderEntries.append(newItem);
  }
};

// Convert monetary value from cents to dollars
const convertToDollars = (price) => {
  // Strip off last 2 numbers to get dollars
  const dollars = price.slice(0, price.length - 2);
  // Strip off everything but the last 2 numbers to get cents
  const cents = price.slice(price.length - 2);
  return `${dollars}.${cents}`;
};

// CREATE NEW ORDER
const addOrderItem = (object) => {
  const $orderItem = $(`
    <tr>
      <td>${object.name}</td>
      <td>x ${object.quantity}</td>
      <td>$${convertToDollars(String(object.price))}</td>
      <td><button class="remove-btn">Remove</button></td>
    </tr>
  `);
  return $orderItem;
};

renderOrder(dataOrder);





});
