$(() => {

  const $submit = $('.check-out')

  $submit.on('click', (e) =>  {
    console.log(e);
    //SET TIMEOUT & ADD SPINNER
    setTimeout(checkout, 3000);
    $potato = $('<p class="spinner">🥔</p>')
    $prepareOrder = $('<p>Preparing your order...</p>')
    $('.check-out').text('');
    $('.check-out').append($prepareOrder, $potato)

    // REPLACE SUBMIT WITH ORDER CONFIRMATION
    function checkout() {
    $.ajax('checkout.html', { method: 'GET' })
    .then(function (checkout) {
      $submit.replaceWith(checkout);

      // REMOVE CURRENT ORDER BUTTONS & STOP SPINNER
      const $add = $('.add')
      const $minus = $('.minus')
      const $remove = $('.remove-btn')
      $add.hide();
      $minus.hide();
      $remove.hide();

      // ADD LOADING BAR
      $loadingBar = $('<i class="fa-solid fa-bars-progress progress-bar"></i>');
      $('.loading-bar').append($loadingBar);
      // //SET TIMEOUT ON PROGRESS BAR
      // $cooking = $('')
      // setTimeout(cooking, 10000);
      // function cooking() {
      //   $loadingBar.replaceWith($packaging)
      // }
      // setTimeout(packaging, 15000);
      // function packaging() {
      //   $packaging.replaceWith($pickup)
      // }
      // setTimeout(pickup, 20000);
      //   $pickup.replaceWith($complete)

    });
    }
  });









});