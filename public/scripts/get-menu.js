import {dataOrder} from './temp-data.js';
import {menuArray} from './temp-data.js';
import {renderOrder} from './current-order.js';
$(() => {



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

  const $orderEntries = $('.order-entries');
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



})

