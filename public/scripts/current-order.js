

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
      const tempArr = dataOrder;
      console.log(e.target.id);
      tempArr.forEach((item, index) => {
        console.log(item.id);
        if (item.id == e.target.id) {
          dataOrder.splice(index, 1);
          console.log(dataOrder);
        }
      });

      const tr = e.target.parentElement.parentElement;
      tr.remove();
    }));
  };

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
        <td><button  id=${object.id} class="remove-btn">Remove</button></td>
      </tr>
    `);
    return $orderItem;
  };




  class Item {
    constructor(name, quantity, price) {
      this.name = name;
      this.quantity = quantity;
      this.price = price;
      this.id = () => {
        generateRandomID();
      };
    }
  }


  const $burger = $('.burger');

  $burger.on('click', (e) => {
    dataOrder.push({
      id: 3,
      name: 'NEW ITEM',
      quantity: 3,
      price: 6.44
    });
    $orderEntries.empty();
    renderOrder(dataOrder);
  });


  //
  // const author = document.querySelector('#author').value;
  // const pages = document.querySelector('#pages').value;

  // const item = new Item(name, quantity, price, id);


});
