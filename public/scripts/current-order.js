import {dataOrder} from './temp-data.js';
import {menuArray} from './temp-data.js';

$(() => {



console.log(menuArray);

const $orderEntries = $('.order-entries');


// orderObject not removing correctly - Take a look at soon
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
      <td><button class="minus">-</button>x ${object.quantity}<button class="add">+</button></td>
      <td>$${object.price.toFixed(2)}</td>
      <td>$${(object.price * object.quantity).toFixed(2)}</td>
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
    addMenuItemListener($renderedItem);
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

const addMenuItemListener = (item) => {
  item.on('click', (e) => {
    console.log(item);
    dataOrder.push({
      id: genID++,
      name: 'NEW ITEM',
      quantity: 3,
      price: 6.44
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
      // console.log(data);
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