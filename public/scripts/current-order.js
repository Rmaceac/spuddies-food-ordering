

$(() => {


const dataOrder = [
  {
    id: 1,
    name: 'Tot pop',
    quantity: 1,
    price: 3.00
  },
  {
    id: 2,
    name: 'iced tea',
    quantity: 2,
    price: 2.00
  },
  {
    id: 3,
    name: 'tater-shake',
    quantity: 3,
    price: 6.44
  }
];


const $orderEntries = $('.order-entries');

// REMOVE ORDER ITEM
const addRemoveBtnListener = (removeBtn) => {
    removeBtn.on('click', (e => {
    e.preventDefault();
    const tr = e.target.parentElement.parentElement;
    tr.remove();
  }));
}

const renderOrder = (order) => {
  let totalCost = 0;
  for (const item of order) {
    // Create new jquery object newItem
    const newItem = addOrderItem(item);

    // Retrieve the button element
    const removeBtn = newItem.find('.remove-btn');

    // Add event listener to remove button
    addRemoveBtnListener(removeBtn);

    $orderEntries.append(newItem);
  }
};

// CREATE NEW JQUERY ORDER OBJECT
const addOrderItem = (object) => {
  const $orderItem = $(`
    <tr>
      <td>${object.name}</td>
      <td>x ${object.quantity}</td>
      <td>$${object.price.toFixed(2)}</td>
      <td>$${(object.price * object.quantity).toFixed(2)}</td>
      <td><button class="remove-btn">Remove</button></td>
    </tr>
  `);
  return $orderItem;
};

renderOrder(dataOrder);

});
