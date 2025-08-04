import { deliveryOptions } from './deliveryOptions.js';

const savedCart = localStorage.getItem('cart');
export let cart = savedCart ? JSON.parse(savedCart) : [];

// Function to add item to cart
export function addToCart(productToAdd, quantity) {
  const existingItem = cart.find((item) => item.product.id === productToAdd.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product: productToAdd,
      quantity: quantity,
      deliveryOption: deliveryOptions[0].id,
    });
  }
  saveToStorage();
}

// Function to calculate total cart quantity
export function calculateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}

// Function to update cart quantity display
export function updateCartQuantityDisplay() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function removeItem(productID) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === productID) {
      cart.splice(i, 1);
      break;
    }
  }
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/*
export function updateQuantity(productID, ) {
    cart.forEach((cartItem) => {
      if (productID === cartItem.product.id) {

      }
    }
}
    */
