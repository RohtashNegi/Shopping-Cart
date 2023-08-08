let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("DATA ")) || [];
// console.log(basket);

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((basketObj) => basketObj.item)
    .reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length != 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopDataItem.find((y) => y.id === id) || [];
        return ` 
        <div class ="cart-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">
        <div class="title-price-x">
        <h4 class= "title-price">
        <p>${search.name}</p>
        <p class="cart-item-price">Rs ${search.price}</p>
        </h4>
        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        </div>
        
        <div class="button">
        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i> 
          <div id=${id} class="quantity">${item}</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>
        
        <h3>Rs ${item * search.price}</h3>
        </div>
        </div>
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart Is Empty<h2>
    <a href="index.html"><button class="homeButton"> Back To Home</button> </a>
    `;
  }
};

generateCartItems();

let increment = (objId) => {
  let selectedItem = objId;
  let search = basket.find((x) => x.id === selectedItem.id);
  // console.log(search);  // checking the code
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
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

  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("DATA ", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopDataItem.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
    <h2>Total Bill : Rs ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};
totalAmount();
