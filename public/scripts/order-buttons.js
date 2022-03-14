$(() => {

  // INCREASE QUANTITY
  const increaseQuantity = () => {
    $('.add').click(function() {
      if ($(this).prev().val() < 9) {
        $(this).prev().val(+$(this).prev().val() + 1);
      }
    });
  };

  // DECREASE QUANTITY
  const decreaseQuantity = () => {
    $('.minus').click(function() {
        if ($(this).next().val() > 1) {
          if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
        }
    });
  }



});

// export {increaseQuantity};
// export {decreaseQuantity};