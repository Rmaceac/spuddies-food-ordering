import {dataOrder} from './temp-data.js';
import {menuArray} from './temp-data.js';


$(() => {

  const $orderEntries = $('.order-entries');
  const $orderTotal = $('#orderTotal');

// REMOVE ORDER ITEM
const addRemoveBtnListener = (removeBtn) => {
    removeBtn.on('click', (e => {
    e.preventDefault();
    const tempArr = dataOrder;
    tempArr.forEach((item, index) => {
      if(item.id == e.target.id) {
        dataOrder.splice(index, 1);
        renderOrder(dataOrder);
      }
    });
  }));
}

const addIncreaseQuantityListener = (plusBtn) => {
  plusBtn.on('click', function(e) {
    const input = $(this).siblings('.quantity');

    const orderItemName = $(this).parent().parent()[0].id;

    const prevQuantity = Number(e.target.parentElement.children[1].value) + 1;

    if (prevQuantity <= 9) {
      input.val(prevQuantity);
    }

    for (const orderItem of dataOrder) {
      if (orderItem.name === orderItemName) {
        orderItem.quantity = Number(e.target.parentElement.children[1].value);
        orderItem.subtotal = orderItem.price * orderItem.quantity;
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

    const orderItemName = $(this).parent().parent()[0].id;

    for (const orderItem of dataOrder) {
      if (orderItem.name === orderItemName) {
        orderItem.quantity = Number(e.target.parentElement.children[1].value);
        orderItem.subtotal = orderItem.price * orderItem.quantity;
      }
    }
    renderOrder(dataOrder);
  });
};

const renderOrder = (order) => {
  let totalCost = 0;

  $orderEntries.empty();

  for (const item of order) {
    totalCost += item.subtotal;
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
  $orderTotal.text(`$${totalCost.toFixed(2)}`);
};


// CREATE NEW JQUERY ORDER OBJECT
const addOrderItem = (object) => {
  const $orderItem = $(`
    <tr id="${object.name}">
      <td>${object.name}</td>
      <td><button class="minus">-</button><input class='quantity' type="text" value="${object.quantity}" min="1" max="9" /><button class="add">+</button></td>
      <td>$${object.price}</td>
      <td>$${(object.price * object.quantity).toFixed(2)}</td>
      <td><button id=${object.id} class="remove-btn">Remove</button></td>
    </tr>
  `);
  return $orderItem;
};

// Convert backend menu data to html
const renderMenu = (menuItems, filter) => {
  let currCount = 0;
  let $carouselRow;
  let $rowItems;
  $('.carousel-inner').empty();
  for (const item of menuItems) {
    if (item.type === filter) {
      currCount++;
      // Create new row for every overflow item
      if (currCount % 3 === 1) {
        $carouselRow = renderRow(Math.ceil(currCount / 3));
        $rowItems = $carouselRow.find('.menu-items');
      }

      const $renderedItem = renderItem(item);
      $rowItems.append($renderedItem);
      addMenuItemListener($renderedItem, item);
      if (currCount % 3 === 0) {
        $('.carousel-inner').append($carouselRow);
      }
    }
    
  }

  // If items didn't fully fill a row, add the partial row
  if (currCount % 3 !== 0) {
    $('.carousel-inner').append($carouselRow);
  }
};


let genID = 4;

const addMenuItemListener = (item, itemData) => {
  item.on('click', function(e) {
    let checkIfExists = false;
    // Check if item already in orders table
    for (const orderItem of dataOrder) {
      if (orderItem.name === itemData.item) {
        checkIfExists = true;
      }
    }
    // If item not in dataOrder, add it
    if (!checkIfExists) {
      dataOrder.push({
        id: genID++,
        name: itemData.item,
        quantity: 1,
        price: Number(itemData.price),
        subtotal: Number(itemData.price)
      });
      $orderEntries.empty();
      renderOrder(dataOrder);
    }
  })
};

// FILTER MENU BY BUTTON
const menuButtons = $('.menu-header').children('input');
// console.log(menuButtons)
jQuery.each(menuButtons, (index, button) => {
  $(`#${button.id}`).on("click", (e) => {
    const filter = e.target.labels[0].id;
    renderMenu(menuArray, filter);
  })
})

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
  <div class="flip-box">
    <div class="flip-box-inner">
      <div class="flip-box-front">
        <img id=${itemObj.id} class="item" src="${itemObj.thumbnail_url}">
      </div>
      <div class="flip-box-back">
        <h3>${itemObj.item}</h2>
        <p>${itemObj.description}</p>
        <h3>${itemObj.price}</h3>
      </div>
    </div>
  </div>
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
      for (const item of data) {
        for (let i = 0; i < 3; i++) {
          menuArray.push(item);
        }
      }
      renderMenu(menuArray, 'burger');
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

$('.check-out').on('click', (e) => {
  const order = {
    getOrder: dataOrder
  }
  $.ajax({
    url: "http://localhost:8084/api/submit/order",
    method: "POST",
    data: order
  })
    .then((data) => {
      console.log("DATA:", data);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

loadItems();

  // Carousel testing, will need to put in separate js file at some point
  $('.carousel').carousel({
    interval: false
  });

});