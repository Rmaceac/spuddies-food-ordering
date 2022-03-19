import {dataOrder} from './temp-data.js';
import {menuArray} from './temp-data.js';


$(() => {

  const $orderEntries = $('.order-entries');
  const $orderTotal = $('#orderTotal');
  const $submitBtn = $('.check-out');
  const $orderContainer = $('#order');

  // ATTACH EVENT LISTENER TO REMOVE ITEM BUTTON
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
  };

  // CREATE EVENT LISTENER FOR PLUS BUTTON
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
  
  // CREATE EVENT LISTENER FOR MINUS BUTTON
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

  /**
   * Renders the order by looping through the input array (order).
   * First checks if there's order items to be rendered.
   * Dynamically calls the custom addEventListener functions
   * as rows are generated. 
   * 
   * @param {array} order 
   */
  const renderOrder = (order) => {
    let totalCost = 0;

    $orderEntries.empty();

    // DISABLE SUBMIT BUTTON IF NO ITEMS IN ORDER
    if ($submitBtn.is(':disabled') && order.length > 0) {
      $submitBtn.prop('disabled', false);
      $orderContainer.removeClass("order-container-disabled");
      $orderContainer.addClass("order-container-enabled");
    } else if (order.length === 0) {
      $submitBtn.prop('disabled', true);
      $orderContainer.removeClass("order-container-enabled");
      $orderContainer.addClass("order-container-disabled re-disabled");
    }

    for (const item of order) {
      // KEEP TRACK OF ORDER TOTAL
      totalCost += item.subtotal;

      // CREATE NEW JQUERY ORDER ITEM OBJECT
      const newItem = addOrderItem(item);

      // RETRIEVE ALL BUTTON ELEMENTS WITHIN NEWITEM
      const removeBtn = newItem.find('.remove-btn');
      const plusBtn = newItem.find('.add');
      const minusBtn = newItem.find('.minus');

      // ADD EVENT LISTENERS TO EACH BUTTON
      addRemoveBtnListener(removeBtn);
      addIncreaseQuantityListener(plusBtn);
      addDecreaseQuantityListener(minusBtn);

      // APPEND NEWITEM TO ORDER TABLE
      $orderEntries.append(newItem);
    }
    $orderTotal.text(`$${totalCost.toFixed(2)}`);
  };


  // CREATION FUNCTION FOR NEW JQUERY ORDER OBJECT
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

  /**
   * Generate menu from backend menu_items data.
   * Loop through passed in array and create menu
   * item jquery objects. 
   * The passed in string is used to filter the type
   * of menu item being passed in for specific categories.
   * 
   * @param {array} menuItems 
   * @param {string} filter 
   */
  const renderMenu = (menuItems, filter) => {
    let currCount = 0;
    let $carouselRow;
    let $rowItems;
    $('.carousel-inner').empty();
    for (const item of menuItems) {
      if (item.type === filter) {
        // KEEP TRACK OF THE FILTERED MENU ITEMS
        currCount++;

        // CURRENTLY SET TO CREATE NEW ROW EVERY 3 ITEMS
        if (currCount % 3 === 1) {
          $carouselRow = renderRow(Math.ceil(currCount / 3));
          $rowItems = $carouselRow.find('.menu-items');
        }

        // CREATE NEW JQUERY OBJECT FOR ITEM AND APPEND TO ROW
        const $renderedItem = renderItem(item);
        $rowItems.append($renderedItem);

        // ADD EVENT LISTENER TO NEW ITEM
        addMenuItemListener($renderedItem, item);

        // IF ROW IS FULL, APPEND TO CAROUSEL
        if (currCount % 3 === 0) {
          $('.carousel-inner').append($carouselRow);
        }
      }
    }

    // IF A PARTIAL ROW IS REMAINING, APPEND IT TO CAROUSEL
    if (currCount % 3 !== 0) {
      $('.carousel-inner').append($carouselRow);
    }
  };

  // CREATE NEW MENU CAROUSEL ROW
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
            <h3 class="item-name">${itemObj.item}</h2>
            <p class="item-description">${itemObj.description}</p>
            <h3 class="item-price">$${itemObj.price}</h3>
          </div>
        </div>
      </div>
    `);
  return $menuItem;
  };
  
  // ADD EVENT LISTENER TO LINK MENU ITEM TO ORDER TABLE
  const addMenuItemListener = (item, itemData) => {
    item.on('click', function(e) {
      let checkIfExists = false;
      // PREVENT DUPLICATE ORDER ENTRIES, CHECK IF ALREADY EXISTS
      for (const orderItem of dataOrder) {
        if (orderItem.name === itemData.item) {
          checkIfExists = true;
        }
      }
      // ONLY ADD ITEM IF IT'S NOT IN THE ORDER TABLE
      if (!checkIfExists) {
        dataOrder.push({
          id: itemData.id,
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

  // ADD EVENT LISTENERS TO MENU FILTER BUTTONS
  const menuButtons = $('.menu-header').children('input');
  jQuery.each(menuButtons, (index, button) => {
    $(`#${button.id}`).on("click", (e) => {
      const filter = e.target.labels[0].id;
      renderMenu(menuArray, filter);
    })
  });

  // RETRIEVE MENU ITEMS FROM DB VIA AJAX CALL
  const loadItems = () => {
    $.ajax({
      url: "http://localhost:8084/api/menu/",
      method: 'GET',
      dataType: "json"
    })
      .then((data) => {
        for (const item of data) {
          menuArray.push(item);
        }
        renderMenu(menuArray, 'burger');
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  
  // EVENT LISTENER FOR SUBMIT ORDER BUTTON, TRIGGERS AJAX CALL
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

  // PREVENT CAROUSEL FROM AUTO-PLAYING
  $('.carousel').carousel({
    interval: false
  });

});