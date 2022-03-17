$(() => {

  const $fetchOrder = $('#fetch-order');
  const $orderID = $('#fetch');

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
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    
    console.log("Order ID:", $orderID.val());
    $orderID.val("");
  });


});