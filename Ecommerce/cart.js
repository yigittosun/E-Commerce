var cart = [];
function getCart() {
  cart = sessionStorage.getItem("cart");
  cart = JSON.parse(cart);
  console.log(cart);
}

getCart();
