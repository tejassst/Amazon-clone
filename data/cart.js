export const cart = [
  {
    product: {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ['socks', 'sports', 'apparel'],
    },
    quantity: 1,
  },
  {
    product: {
      id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      image: 'images/products/intermediate-composite-basketball.jpg',
      name: 'Intermediate Size Basketball',
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ['sports', 'basketballs'],
    },
    quantity: 1,
  },
];

// Function to add item to cart
export function addToCart(productToAdd, quantity) {
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product: productToAdd,
      quantity: quantity,
    });
  }
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
