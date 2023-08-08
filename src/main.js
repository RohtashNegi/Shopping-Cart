let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("DATA ")) || [];
let generateShop = () => {
  return (shop.innerHTML = shopDataItem
    .map((objShop) => {
      let { id, name, price, description, img } = objShop; // destructuring
      let search = basket.find((x) => x.id === id) || [];

      return ` 
    <div id=product-id-${id} class="item">
    <img width="230" src=${img} alt="" />
    <div class="details">
      <h3>${name}</h3>
      <p>${description}</p>
      <div class="prince-quantity">
        <h2>RS ${price}</h2>
        <div class="button">
        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i> 
          <div id=${id} class="quantity">
          ${search.item === undefined ? 0 : search.item}
          </div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
   </div>`;
    })
    .join(""));
};
generateShop();

let increment = (objId) => {
  let selectedItem = objId;
  // console.log(selectedItem.id);
  let search = basket.find((x) => x.id === selectedItem.id);

  // console.log(search); // checking the code
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("DATA ", JSON.stringify(basket));
};
let decrement = (objId) => {
  let selectedItem = objId;
  let search = basket.find((x) => x.id === selectedItem.id);
  // console.log(search);  // checking the
  if (search === undefined) return;
  else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  update(selectedItem.id);
  // console.log(basket);

  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("DATA ", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((basketObj) => basketObj.item)
    .reduce((x, y) => x + y, 0);
};

calculation();
