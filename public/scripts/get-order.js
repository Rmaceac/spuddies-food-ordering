$(() => {

  const $fetchOrder = $('#fetch-order');
  const $orderID = $('#fetch');
  const $orderEntries = $('.order-entries');

  const renderOrder = (order) => {
  
    $orderEntries.empty();
  
    for (const item of order) {
      // Create new jquery object newItem
      const newItem = addOrderItem(item);
  
      $orderEntries.append(newItem);
    }

    const date = String(order[0].order_time).slice(0, 9);
    console.log("🚀 ~ file: get-order.js ~ line 19 ~ renderOrder ~ date", date)
    const time = String(order[0].order_time).slice(14, 22);
    console.log("🚀 ~ file: get-order.js ~ line 21 ~ renderOrder ~ time", time)
    
    const $total = $(`
      <tr>
        <td></td>
        <td>Total:</td>
        <td>$${order[0].total_price}.00</td>
        <td>Ordered at:</td>
        <td>${date} ${time}</td>        
      </tr>
    `);

    $orderEntries.append($total);
  };
  
  
  // CREATE NEW JQUERY ORDER OBJECT
  const addOrderItem = (object) => {
    const $orderItem = $(`
      <tr>
        <td>${object.item}</td>
        <td>${object.quantity}</td>
        <td>$${object.sub_total}</td>
      </tr>
    `);
    return $orderItem;
  };
  
  $fetchOrder.on('click', (e) =>  {
    e.preventDefault();

    console.log("Fetch Order button pressed");
    
    $.ajax({
      url: `http://localhost:8084/orders/${$orderID.val()}`,
      method: 'GET',
      dataType: "json"
    })
      .then((data) => {
        console.log("DATA:", data);
        renderOrder(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    
    console.log("Order ID:", $orderID.val());
    $orderID.val("");
  });


});