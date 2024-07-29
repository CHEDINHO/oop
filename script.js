// Product Class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem Class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  calculateTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart Class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    let existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.updateCartDisplay();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.updateCartDisplay();
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
  }

  updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartSummary = document.getElementById('cart-summary');
    
    cartList.innerHTML = '';
    this.items.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerText = `Product: ${item.product.name}, Quantity: ${item.quantity}, Total Price: ${item.calculateTotalPrice()}`;
      cartList.appendChild(div);
    });
    
    cartSummary.innerHTML = `
      <p>Total Items: ${this.getTotalItems()}</p>
      <p>Total Cart Price: ${this.getTotalPrice()}</p>
    `;
  }
}

// Instantiate products
const laptop = new Product(1, 'Laptop', 1000);
const smartphone = new Product(2, 'Smartphone', 500);

// Instantiate shopping cart
const cart = new ShoppingCart();

// Display products
document.getElementById('product-list').innerHTML = `
  <div class="product-item">Product: ${laptop.name}, Price: ${laptop.price}</div>
  <div class="product-item">Product: ${smartphone.name}, Price: ${smartphone.price}</div>
`;

// Add event listeners for buttons
document.getElementById('add-laptop').addEventListener('click', () => {
  cart.addItem(laptop, 1);
});

document.getElementById('add-smartphone').addEventListener('click', () => {
  cart.addItem(smartphone, 1);
});

document.getElementById('remove-laptop').addEventListener('click', () => {
  cart.removeItem(laptop.id);
});
document.getElementById('remove-smartphone').addEventListener('click', () => {
  cart.removeItem(smartphone.id);
});

 
