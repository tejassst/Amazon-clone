import { cart, removeItem, calculateCartQuantity } from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

function displayCartItems() {
  let cartItemsHTML = '';

  cart.forEach((cartItem) => {
    cartItemsHTML += `
    <div class="cart-item-container js-cart-item-container-${
      cartItem.product.id
    }">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${cartItem.product.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">${cartItem.product.name}</div>
          <div class="product-price">$${(
            cartItem.product.priceCents / 100
          ).toFixed(2)}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">${
              cartItem.quantity
            }</span> </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              cartItem.product.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(cartItem)}
        </div>
      </div>
    </div>
  </div>
          `;
  });

  document.querySelector('.js-cart-details').innerHTML = cartItemsHTML;
}
displayCartItems();
attachDeleteListeners();

function deliveryOptionsHTML(cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM DD');

    const priceString =
      deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${(deliveryOption.priceCents / 100).toFixed(2)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOption;
    html += `
      <div class="delivery-option">
        <input
          type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${cartItem.product.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString}</div>
        </div>
      </div>
    `;
  });

  return html;
}

function attachDeleteListeners() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productID = link.dataset.productId;
      console.log(productID);
      removeItem(productID);
      const container = document.querySelector(
        `.js-cart-item-container-${productID}`
      );
      if (container) {
        container.remove();
      }
      displayCartItems();
      attachDeleteListeners();
    });
  });
}
document.querySelector('.js-item-count').innerHTML =
  calculateCartQuantity() + ' items';
