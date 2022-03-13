$(() => {

  // Convert backend menu data to html
  const renderMenu = (menuItems) => {
    for (const item of menuItems) {
      console.log(item);
      const renderedItem = renderMenuItem(item);
      $('.menu-container').append(renderedItem);
    }
  };

  // Create individual menu-item
  const renderMenuItem = (itemObj) => {
    const $menuItem = $(`
    <div>
      <p>${itemObj.item}</p>
      <img id="${itemObj.id}" src="${itemObj.thumbnail_url}">
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
        console.log(data);
        renderMenu(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  loadItems();

})