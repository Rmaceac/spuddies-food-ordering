$(() => {

  const $fetchOrder = $('.fetch-order');
  const $orderID = $('#fetch').val;

  $fetchOrder.on('click', (e) =>  {
    e.preventDefault();

    console.log("Fetch Order button pressed");

    console.log("Order ID:", $orderID);
  });


});