import {dataOrder} from './temp-data.js';
import {menuArray} from './temp-data.js';


$(() => {

console.log(menuArray);

  const $orderEntries = $('.order-entries');

// REMOVE ORDER ITEM
const addRemoveBtnListener = (removeBtn) => {
    removeBtn.on('click', (e => {
    e.preventDefault();
    const tempArr = dataOrder;
    tempArr.forEach((item, index) => {
      if(item.id == e.target.id) {
        dataOrder.splice(index, 1);
        console.log(dataOrder);
      }
    });

    const tr = e.target.parentElement.parentElement;
    tr.remove();
  }));
}

const addIncreaseQuantityListener = (plusBtn) => {
  plusBtn.on('click', function(e) {
    const input = $(this).siblings('.quantity');

    // console.log($(this).parent().parent()[0].id);
    const orderItemName = $(this).parent().parent()[0].id;

    


    const prevQuantity = Number(e.target.parentElement.children[1].value) + 1;

    

    if (prevQuantity <= 9) {
      input.val(prevQuantity);
    }

    for (const orderItem of dataOrder) {    
      if (orderItem.name === orderItemName) {
        orderItem.quantity = Number(e.target.parentElement.children[1].value);
        console.log(orderItem.quantity);
      }
    }
    renderOrder(dataOrder);
    

  });
};

const addDecreaseQuantityListener = (minusBtn) => {
  minusBtn.on('click', function(e) {
    const input = $(this).siblings('.quantity');
    const prevQuantity = Number(e.target.parentElement.children[1].value) - 1;
    if(prevQuantity >=1) {
    input.val(prevQuantity);
    }
  });
};

const renderOrder = (order) => {
  let totalCost = 0;

  $orderEntries.empty();

  for (const item of order) {
    // Create new jquery object newItem
    const newItem = addOrderItem(item);

    // Retrieve the button elements
    const removeBtn = newItem.find('.remove-btn');
    const plusBtn = newItem.find('.add');
    const minusBtn = newItem.find('.minus');

    // Add event listener to remove button
    addRemoveBtnListener(removeBtn);
    addIncreaseQuantityListener(plusBtn);
    addDecreaseQuantityListener(minusBtn);
    $orderEntries.append(newItem);
  }
};


// CREATE NEW JQUERY ORDER OBJECT
const addOrderItem = (object) => {
  const $orderItem = $(`
    <tr id="${object.name}">
      <td>${object.name}</td>
      <td><button class="minus">-</button><input class='quantity' type="text" value="${object.quantity}" min="1" max="9" /><button class="add">+</button></td>
      <td>${object.price}</td>
      <td>$${(Number(object.price.slice(1)) * object.quantity).toFixed(2)}</td>
      <td><button id=${object.id} class="remove-btn">Remove</button></td>
    </tr>
  `);
  return $orderItem;
};


// Convert backend menu data to html
const renderMenu = (menuItems) => {
  let currCount = 0;
  let $carouselRow;
  let $rowItems;
  for (const item of menuItems) {

    menuArray.push(item);
    currCount++;
    // console.log(`CurrCount: ${currCount} -- Item: ${item}`)

    // Create new row for every overflow item
    if (currCount % 3 === 1) {
      // console.log(`RowNum: ${Math.ceil(currCount / 3)}`);
      $carouselRow = renderRow(Math.ceil(currCount / 3));
      // console.log(`Carousel row: ${$carouselRow}`)
      $rowItems = $carouselRow.find('.menu-items');
      // console.log(`Row items: ${$rowItems}`)
    }

    const $renderedItem = renderItem(item);
    $rowItems.append($renderedItem);
    addMenuItemListener($renderedItem, item);
    if (currCount % 3 === 0) {
      $('.carousel-inner').append($carouselRow);
    }


  }

  //console.log(menuArray);

  // If items didn't fully fill a row, add the partial row
  if (currCount % 3 !== 0) {
    $('.carousel-inner').append($carouselRow);
  }
};


let genID = 4;

const addMenuItemListener = (item, itemData) => {
  item.on('click', function(e) {
    console.log(`Price: ${itemData.price} -- Type: ${typeof itemData.price}`)
    dataOrder.push({
      id: genID++,
      name: itemData.item,
      quantity: 1,
      price: itemData.price
    });
    $orderEntries.empty();
    renderOrder(dataOrder);
  })
};

// CREATE NEW CAROUSEL ROW
const renderRow = (rowNum) => {
  const activeStatus = rowNum === 1 ? "carousel-item active": "carousel-item";
  return $(`
  <div class="${activeStatus}" data-bs-interval="false">
    <div class="menu-items">

    </div>
  </div>
  `)
};

// CREATE SINGLE MENU ITEM
const renderItem = (itemObj) => {
  const $menuItem = $(`
  <img id=${itemObj.id} class="item" src="${itemObj.thumbnail_url}">
`);
return $menuItem;
};

const loadItems = () => {
  $.ajax({
    url: "http://localhost:8084/api/menu/",
    method: 'GET',
    dataType: "json"
  })
    .then((data) => {
      renderMenu(data);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

loadItems();

  // NOT USING YET - IMPLEMENT LATER
  // class Item {
  //   constructor(name, quantity, price) {
  //     this.name = name;
  //     this.quantity = quantity;
  //     this.price = price;
  //     this.id = () => {
  //       generateRandomID();
  //     }
  //   }
  // };

  // const item = new Item(name, quantity, price, id);


  // Carousel testing, will need to put in separate js file at some point
  $('.carousel').carousel({
    interval: false
  });



});