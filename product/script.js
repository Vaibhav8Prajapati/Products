const productsData = {
  "Cosmetics": [
    { "name": "Hair Oil", "price": 122, "image": "image/hair-oil.png" },
    { "name": "Face wash", "price": 123, "image": "image/face-wash.png" }
  ],
  "Household": [
    { "name": "Hair Oil", "price": 122, "image": "image/hair-oil-2.png" },
    { "name": "Face wash", "price": 123, "image": "image/face-wash-2.png" }
  ]
};

let cart = [];

function renderProducts(category, products) {
  const containerId = category.toLowerCase() + "-products";
  const productContainer = document.getElementById(containerId);
  productContainer.innerHTML = '';

  products.forEach(product => {
    const box = document.createElement('div');
    box.className = 'product-box';
    box.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <p>Name: ${product.name}</p>
      <p>Price: $${product.price}</p>
      <button class="cart-button" onclick="addToCart('${product.name}')"><i class="fa fa-plus-square"></i> Add to Cart</button>
      <button class="cart-button" onclick="removeFromCart('${product.name}')"><i class="	fa fa-minus-square"></i> Remove from Cart</button>
    `;
    productContainer.appendChild(box);
  });
}

function addToCart(productName) {
  const product = findProduct(productName);
  if (product) {
    cart.push(product);
    showPopup(`Product "${productName}" added to the cart.`);
    console.log('Cart:', cart);
  }
}

function removeFromCart(productName) {
  const product = findProduct(productName);
  if (product) {
    cart = cart.filter(item => item.name !== productName);
    showRemovePopup(`Product "${productName}" removed from the cart.`);
    console.log('Cart:', cart);
  }
}

function findProduct(productName) {
  for (const category in productsData) {
    const product = productsData[category].find(item => item.name === productName);
    if (product) {
      return product;
    }
  }
  return null;
}

function showPopup(message) {
  const popupContainer = document.getElementById('popup-container');
  const popupMessage = document.getElementById('popup-message');

  popupMessage.innerText = message;
  popupContainer.style.display = 'flex';

  setTimeout(() => {
    closePopup();
  }, 2000);
}

function showRemovePopup(message) {
  const popupContainer = document.getElementById('popup-container');
  const popupMessage = document.getElementById('popup-message');

  popupMessage.innerText = message;
  popupContainer.style.display = 'flex';

  setTimeout(() => {
    closePopup();
  }, 2000);
}

function closePopup() {
  const popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'none';
}

renderProducts("Cosmetics", productsData["Cosmetics"]);
renderProducts("Household", productsData["Household"]);
