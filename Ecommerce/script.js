var products = [];
var productListHtml = [];
var categoryListHtml = [];
var carouselHtml = [];
var priceTable = [];
var listProductId = [];

var cartList = [];
var cartListHtml = [];

// récupére la liste de produit en API
function getProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      products = json;
      generateProductsCard(products);
    });
}

// génére la liste de card produit en HTML
function generateProductsCard(products) {
  productListHtml = [];
  products.forEach((product, index) => {
    generateProductCategory(product);
    productListHtml.push(
      "<div class='col-lg-4 col-md-6 mb-4'>" +
        "<div class='card h-100'>" +
        "<a href='#'>" +
        "<img class='card-img-top' src=" +
        product.image +
        ">" +
        "</a>" +
        "<div class='card-body'>" +
        "<h4 class='card-title'>" +
        "<a href='#'>" +
        product.title +
        "</a>" +
        "</h4>" +
        "<h5>" +
        product.price +
        " €</h5>" +
        "<p class='card-text'>" +
        product.description +
        "</p>" +
        "</div>" +
        "<div class='card-footer'>" +
        product.category +
        '   <button type="button" onClick="setProductInCart(\'' +
        product.id +
        "')\">" +
        "Add to Cart" +
        "</button>" +
        "</div></div></div>"
    );
  });

  categoryListHtml = [...new Set(categoryListHtml)];
  document.getElementById("categoryList").innerHTML = categoryListHtml.join("");
  document.getElementById("cardSection").innerHTML = productListHtml.join("");
}

function setProductInCart(selectedProduct) {
  listProductId.push(parseInt(selectedProduct));
}

function openCart() {
  var filterById;

  listProductId.forEach((product, index) => {
    filterById = products.filter((item) => item.id === product)[0];
    cartList.push(filterById);
  });

  cartList.forEach((list, index) => {
    cartListHtml.push("<li>" + list.title + "</li>");
  });

  document.getElementById("cartSection").innerHTML = cartListHtml.join("");
}

function accessPayment() {
  console.log("Pass");
  sessionStorage.setItem("cart", JSON.stringify(cartList));
  window.location.href = "./basket.html";
}

// I generate the category list in HTML with the name of the category as a parameter
function generateProductCategory(product) {
  categoryListHtml.push(
    '<button type="button" onClick="getCategory(\'' +
      product.category +
      "')\">" +
      product.category +
      "</button>"
  );
}

// when clicking on a category, I retrieve the name of this category and I make an HTTP call to this category
function getCategory(categoryName) {
  fetch("https://fakestoreapi.com/products/category/" + categoryName)
    .then((res) => res.json())
    .then((json) => {
      products = json;
      // I generate the list of maps in HTML with my new product list
      generateProductsCard(products);
    });
}

//filter products in ascending order
function filterBy(param) {
  var filterTable = products;
  if (priceTable.length > 0) {
    filterTable = priceTable;
  }
  if (param === "asc") {
    filterTable.sort((a, b) => {
      return a.price - b.price;
    });
  }
  if (param === "desc") {
    filterTable.sort((a, b) => {
      return b.price - a.price;
    });
  }
  generateProductsCard(filterTable);
}

// filter products by min and max price
function filterByPrice() {
  priceTable = [];
  // products =products List
  // product = each product
  var priceMin = document.getElementById("prixMin").value;
  var priceMax = document.getElementById("prixMax").value;

  if (priceMin > priceMax) {
    alert("The minimum price cannot be higher than the maximum");
    document.getElementById("prixMin").value = "";
    document.getElementById("prixMax").value = "";
    return;
  }

  products.forEach((product, index) => {
    if (product.price >= priceMin && product.price <= priceMax) {
      priceTable.push(product);
    }
  });
  generateProductsCard(priceTable);
}

getProducts();
