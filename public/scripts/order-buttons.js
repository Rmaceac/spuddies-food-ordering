$(() => {

  const $minus = $('.minus');
  const $add = $('.add');
  const $quantity = $('.quantity');

  // console.log('order-buttons up')
  // console.log($minus);

  // $minus.on('click', (e) => {
  //   console.log(e.target.parentElement.textContent.length);
  //   console.log($quantity.innerHtml);
  //   $quantity.innerText--;
  // })

  // $add.on('click', (e) => {
  //   console.log(e.target);
  //   console.log($quantity.innerText);
  //   $quantity.innerText++;
  // })

  $('.add').click(function () {
		if ($(this).prev().val() < 3) {
    	$(this).prev().val(+$(this).prev().val() + 1);
		}
});
$('.minus').click(function () {
		if ($(this).next().val() > 1) {
    	if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
		}
});

  // const $burger = $('.burger');
  // let genID = 4;

  // $burger.on('click', (e) => {
  //   dataOrder.push({
  //     id: genID++,
  //     name: 'NEW ITEM',
  //     quantity: 3,
  //     price: 6.44
  //   });
  //   $orderEntries.empty();
  //   renderOrder(dataOrder);
  // })



});
