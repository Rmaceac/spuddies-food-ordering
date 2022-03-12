

$(() => {


const dataOrder = [
  {
    id: 1,
    name: 'Tot pop',
    quantity: 1,
    price: 5
  },
  {
    id: 2,
    name: 'iced tea',
    quantity: 2,
    price: 2
  },
  {
    id: 3,
    name: 'tater-shake',
    quantity: 3,
    price: 6
  }
];



const $orderEntries = $('.order-entries');
const $removeBtn = $('.remove-btn');

// REMOVE ORDER ITEM
const handleItemRemoval = (removebtn) => {
    $removeBtn.on('click', (e => {
    e.preventDefault();
    const tr = e.target.parentElement.parentElement;
    tr.remove();
  }));
 }



const renderOrder = (order) => {
  for (let item of order) {
    const newItem = addOrderItem(item);
    handleItemRemoval(newItem);
    $orderEntries.append(newItem);
  }
};


// CREATE NEW ORDER
const addOrderItem = (object) => {
  const $orderItem =
    `
    <tr>
      <td>Potato Milkshake</td>
      <td>x 1</td>
      <td>$1.00</td>
      <td><button class="remove-btn">Remove</button></td>
    </tr>
  `;
  return $orderItem;
};

renderOrder(dataOrder);





});
