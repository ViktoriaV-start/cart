import {FULL_TOTAL_SELECTOR, PRODUCT_SELECTOR, QUANTITY_SELECTOR, RETINA, TOTAL_SELECTOR} from "@/config/constants";
import Bucket from "@/assets/icon_bucket.svg";
import Heart from "@/assets/icon_favorite.svg";

export class Item {
  rendered          = false;


  constructor(product) {
    this.productId           = product.id;
    this.productTitle        = product.title;
    this.productManufacturer = product.manufacturer;
    this.productColor        = product.color ?? '';
    this.productSize         = product.size ?? '';
    this.productStock        = product.stock;
    this.productShop         = product.shop;
    this.productInStock      = product.inStock;
    this.productPrice        = product.price;
    this.productDiscount     = product.discount;
    //this.productCurrentPrice = product.price - product.discount;
    this.productQuantity     = product.quantity ?? 0;
    this.totalPrice          = this.getTotalPrice();
    this.fullTotalPrice      = this.getFullTotalPrice();
    this.productImg          = RETINA ? '../img_retina/prod' + product.id + '.jpg' : '../img/prod' + product.id + '.jpg';
  }

  getTotalPrice() {
    return this.productQuantity * (this.productPrice - this.productDiscount);
  }

  getFullTotalPrice() {
    return this.productQuantity * this.productPrice;
  }

  _getPriceString(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
  }

  changeQuantity(count) {
    this.productQuantity += count;
    this._updateItem();
  }



  _updateItem() {
    this.totalPrice     = this.getTotalPrice();
    this.fullTotalPrice = this.getFullTotalPrice();

    const container = document.querySelector(`${PRODUCT_SELECTOR}[data-id="${this.productId}"]`);

    container.querySelector(QUANTITY_SELECTOR).textContent = `${this.productQuantity}`;
    container.querySelector(TOTAL_SELECTOR).textContent = `${this.totalPrice}`;
    container.querySelector(FULL_TOTAL_SELECTOR).textContent = `${this.fullTotalPrice}`;
  }





    markUp() {
    this.rendered = true;

    return `
      <div class="cart__product product" data-id="${this.productId}">
        <label class="checkbox__label checkbox__product">
          <input type="checkbox" class="cart__checkbox checkbox__input" checked>
          <div class="fake-chb fake__item"></div>
          <img class="cart__img" src="${this.productImg}" alt="Poduct">
          <div class="checkbox__size ${this.productSize ? '' : 'invisible' }">${this.productSize ? this.productSize : '' }</div>
        </label>

        <div class="cart__general">
          <div class="cart__description">
            <span>${this.productTitle}</span>
            <span class="cart__manufacturer">${this.productManufacturer}</span>
          </div>
          <div class="cart__product-info ${!this.productColor && !this.productSize ? 'invisible' : ''}">
            <span>${this.productColor ? 'Цвет: ' + this.productColor : '' }</span>
            <span class="cart__size">${this.productSize ? 'Размер: ' + this.productSize : '' }</span>
          </div>
          <div class="cart__stock ${!this.productInStock ? 'invisible' : ''}">${this.productStock}</div>
          <div class="cart__shop-wrap">
            <div class="cart__shop ${!this.productInStock ? 'invisible' : ''}">${this.productShop}</div>
            <svg class="cart__svg-info" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="7.5" stroke="#9797AF"/>
                <path d="M9.88867 7.58691C9.62826 7.58691 9.41504 7.51042 9.24902 7.35742C9.08301 7.20117 9 7.01074 9 6.78613C9 6.55501 9.08301 6.36621 9.24902 6.21973C9.41504 6.07324 9.62826 6 9.88867 6C10.1523 6 10.3656 6.07324 10.5283 6.21973C10.6943 6.36621 10.7773 6.55501 10.7773 6.78613C10.7773 7.02051 10.6943 7.21257 10.5283 7.3623C10.3656 7.51204 10.1523 7.58691 9.88867 7.58691ZM10.6504 13.3779H9.10742V8.37793H10.6504V13.3779Z" fill="#9797AF"/>
            </svg>
          </div>
          
        </div>
      
        <div class="cart__quantity-info">
          <div class="cart__quantity">
            <div class="cart__minus" data-id="${this.productId}">-</div>
            <span class="cart__num">${this.productQuantity}</span>
            <div class="cart__plus" data-id="${this.productId}">+</div>
          </div>
          <div class="cart__remainder ${this.productInStock > 15 ? 'invisible' : ''}">Осталось ${this.productInStock} шт.</div>
          <div class="cart__quantity-ic">

            <svg class="cart__favorite" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 4.05857C2.26592 4.75224 1.76687 5.83284 1.99496 7.42928C2.22335 9.02783 3.26497 10.6852 4.80439 12.3478C6.25868 13.9184 8.10965 15.4437 9.99999 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.7351 10.6852 17.7767 9.02783 18.005 7.4293C18.2331 5.83285 17.734 4.75224 16.9659 4.05856C16.1767 3.34572 15.055 3 14 3C12.132 3 11.0924 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1583 5.04882 9.84169 5.04882 9.64643 4.85355C9.59644 4.80356 9.54185 4.7466 9.48227 4.68443C8.9076 4.08479 7.868 3 5.99999 3C4.94498 3 3.82328 3.34573 3.03399 4.05857ZM2.36374 3.31643C3.37372 2.40427 4.75205 2 5.99999 2C8.07126 2 9.34542 3.11257 9.99999 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2669 5.66715 18.995 7.5707C18.7233 9.47217 17.515 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87776 18.0333 9.69999 17.9C7.69356 16.3952 5.66446 14.7485 4.07063 13.0272C2.48506 11.3148 1.27668 9.47217 1.00501 7.57072C0.733043 5.66716 1.33253 4.24776 2.36374 3.31643Z"/>
            </svg>
          
            <svg class="cart__delete delete" data-id="${this.productId}" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="delete" fill-rule="evenodd" data-id="${this.productId}" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z"/>
              <path class="delete" fill-rule="evenodd" data-id="${this.productId}" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z"/>
              <path class="delete" fill-rule="evenodd" data-id="${this.productId}" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z"/>
            </svg>
          </div>
        </div>
      
        <div class="cart__sum">
          <div>
            <span class="total ${(this.totalPrice > 10000) ? 'cart__total_sm' : 'cart__total'}">${this._getPriceString(this.totalPrice)}</span><span class="cart__total_sm cart__total-text">сом</span>
          </div>
          <span class="cart__full ${(this.fullTotalPrice > 1000000) ? 'cart__full_sm' : ''}">${this._getPriceString(this.fullTotalPrice)} сом</span>
        </div>
      </div>
      
      
      
      
      

    `;
  }

  markUpUnavailable() {
    this.rendered = true;
    return `
      <div class="cart__product-unavailable product" data-id="${this.productId}">
        <div class="cart__unavailable-img">
          <img class="cart__img_gray" src="${this.productImg}" alt="Poduct">
          <div class="checkbox__size ${this.productSize ? '' : 'invisible' }">${this.productSize ? this.productSize : '' }</div>
          <div class="checkbox__size-sp ${this.productId === 6 ? '' : 'invisible' }">56/54/52/50/48/46</div>
        </div>
             
        <div>
          <div class="cart__description_wider gray">
            <span>${this.productTitle}</span>
            <span>${this.productManufacturer}</span>
        </div>
        <div class="cart__product-info gray ${!this.productColor && !this.productSize ? 'invisible' : ''}">
          <span>${this.productColor ? 'Цвет: ' + this.productColor : '' }</span>
          <span class="cart__size">${this.productSize ? 'Размер: ' + this.productSize : '' }</span>
        </div>
      </div>
      
      <div class="cart__ic">
            <svg class="cart__favorite" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 4.05857C2.26592 4.75224 1.76687 5.83284 1.99496 7.42928C2.22335 9.02783 3.26497 10.6852 4.80439 12.3478C6.25868 13.9184 8.10965 15.4437 9.99999 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.7351 10.6852 17.7767 9.02783 18.005 7.4293C18.2331 5.83285 17.734 4.75224 16.9659 4.05856C16.1767 3.34572 15.055 3 14 3C12.132 3 11.0924 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1583 5.04882 9.84169 5.04882 9.64643 4.85355C9.59644 4.80356 9.54185 4.7466 9.48227 4.68443C8.9076 4.08479 7.868 3 5.99999 3C4.94498 3 3.82328 3.34573 3.03399 4.05857ZM2.36374 3.31643C3.37372 2.40427 4.75205 2 5.99999 2C8.07126 2 9.34542 3.11257 9.99999 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2669 5.66715 18.995 7.5707C18.7233 9.47217 17.515 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87776 18.0333 9.69999 17.9C7.69356 16.3952 5.66446 14.7485 4.07063 13.0272C2.48506 11.3148 1.27668 9.47217 1.00501 7.57072C0.733043 5.66716 1.33253 4.24776 2.36374 3.31643Z"/>
            </svg>

            <svg class="cart__delete delete-unavailable" data-id="${this.productId}" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="delete-unavailable" fill-rule="evenodd" data-id="${this.productId}" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z"/>
              <path class="delete-unavailable" fill-rule="evenodd" data-id="${this.productId}" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z"/>
              <path class="delete-unavailable" fill-rule="evenodd" data-id="${this.productId}" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z"/>
            </svg>
          </div>
      



      
      </div>

    `;
  }



}
