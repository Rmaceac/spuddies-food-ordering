$(() => {

  console.log('checkout SPA Page')

  const $submit = $('.check-out')
  const $add = $('.add')
  const $minus = $('.minus')
  const $remove = $('.remove-btn')


  $submit.on('click', (e) => {
    console.log(e);
    //SET TIMEOUT & ADD SPINNER
    setTimeout(checkout, 3000);
    let spinner = $('<i class="fa-solid fa-spinner spinner"></i>');
    $('.check-out').append(spinner);

    // REPLACE SUBMIT WITH ORDER CONFIRMATION
    console.log('Button clicked, performing ajax call...');
    function checkout() {
    $.ajax('checkout.html', { method: 'GET' })
    .then(function (checkout) {
      console.log('Success: ', checkout);
      $submit.replaceWith(checkout);
    // REMOVE CURRENT ORDER BUTTONS
    $add.hide();
    $minus.hide();
    $remove.hide();
    // ADD LOADING BAR
    let loadingBar = $('<i class="fa-solid fa-bars-progress"></i>');
    var txt2 = $("<p></p>").text("Text.");
    console.log($('check-out'))
    $('.loading-bar').append(loadingBar);
    $('.loading-bar').append(txt2);



    // function appendText() {
    //   var txt1 = "<p>Text.</p>";               // Create element with HTML
    //   var txt2 = $("<p></p>").text("Text.");   // Create with jQuery
    //   var txt3 = document.createElement("p");  // Create with DOM
    //   txt3.innerHTML = "Text.";
    //   $("body").append(txt1, txt2, txt3);      // Append the new elements
    // }
  });
  }
})






});