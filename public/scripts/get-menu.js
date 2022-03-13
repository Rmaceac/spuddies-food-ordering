$(() => {

  const renderMenu = (menuItems) => {
    for (const item of menuItems) {
      console.log(item);
    }
  };

  const renderMenuItem = () => {

  };
  
  const loadItems = () => {
    $.ajax({
      url: "http://localhost:8084/api/menu/",
      method: 'GET',
      dataType: "json"
    })
      .then((data) => {
        console.log(data);
        let menuTest = JSON.parse(data);
        console.log(menuTest)
        // renderMenu(JSON.parse(data));
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  loadItems();

})