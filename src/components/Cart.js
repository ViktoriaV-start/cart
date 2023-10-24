import {
  ADD_CLASSNAME,
  CART_AVAILABLE_SELECTOR,
  CART_UNAVAILABLE_SELECTOR,
  DELETE_CLASSNAME,
  DELETE_ONE_CLASSNAME,
  DELETE_UNAVAILABLE_CLASSNAME,
  ORDER_SELECTOR,
  PRODUCT_SELECTOR,
  ORDER, ICON_FAVORITE_SELECTOR
} from "@/config/constants";
import { Item } from "@/components/Item";
import { Client } from "@/components/Client";

export class Cart {

  availableProducts = [];
  unavailableProducts = [];
  orderContainer = document.querySelector(ORDER_SELECTOR);

  constructor() {
    this.handleData(ORDER.available, this.availableProducts, 'ItemAvailable');
    this.handleData(ORDER.unavailable, this.unavailableProducts, 'ItemUnavailable');
    this._render();
    this._init();

    this.client = new Client(ORDER.client);

  }

  _countUnavailable() {
    return this.unavailableProducts.length;
  }

  _render() {
    this.orderContainer.insertAdjacentHTML('afterbegin', this._markUp());

    let availableContainer = document.querySelector(CART_AVAILABLE_SELECTOR);
    let unavailableContainer = document.querySelector(CART_UNAVAILABLE_SELECTOR);

    for (let product of this.availableProducts) {
      if (!product.rendered) {
        availableContainer.insertAdjacentHTML('beforeend', product.markUp());
      }
    }

    for (let product of this.unavailableProducts) {
      if (!product.rendered) {
        unavailableContainer.insertAdjacentHTML('beforeend', product.markUpUnavailable());
      }
    }
  }

  handleData(data, arr) {
    for (let item of data) {
      arr.push(new Item(item));
    }
  }

  _markUp() {
    return `
      <section class = "cart">
        <h1 class = "cart__heading">Корзина</h1>
        <div class="cart__control">
          <label class="checkbox__label checkbox__all">
            <input type="checkbox" class="cart__checkbox checkbox__input-all" checked>
            <div class="fake-chb fake__all"></div>
             Выбрать все
          </label>
          <div class="arrow"></div>
        </div>
        
        <div class="cart__available"></div>
        
        <div class="cart__unavailable-wrap">
        <div class="cart__unheading-wrap">
          <div class="cart__unavailable-heading">
            <span>Отсутствуют</span>
            <div class="point"></div>
            <span>${this._countUnavailable()} товара</span>
          </div>
          <div class="arrow"></div>
          </div>
         
          <div class="cart__unavailable"></div>
        </div>

        
        




      
      </section>
      

    `;
  }

  getItem(id) {
    return this.availableProducts.find(el => el.productId === id);
  }

  getItemUnavailable(id) {
    return this.unavailableProducts.find(el => el.productId === id);
  }

  deleteItem(item) {
    if (item.productQuantity > 1) {
      item.changeQuantity(-1);
      return;
    }
    this.availableProducts.splice(this.availableProducts.indexOf(item), 1); //удалить сам товар из списка доступных товаров
    this.removeMarkUp(item.productId);
  }

  deleteAll(item) {
    this.availableProducts.splice(this.availableProducts.indexOf(item), 1); //удалить сам товар из списка доступных товаров
    this.removeMarkUp(item.productId);
  }

  deleteUnavailable(item) {
    this.unavailableProducts.splice(this.unavailableProducts.indexOf(item), 1);
    this.removeMarkUp(item.productId);
  }

  removeMarkUp(id) {
//удалить разметку товара со страницы
    document.querySelector(`${PRODUCT_SELECTOR}[data-id="${id}"]`).remove();
  }

  _init() {
    this.orderContainer.addEventListener('click', e => {

      if (e.target.classList.contains(ADD_CLASSNAME)) {
        const id = +e.target.dataset['id'];
        let item = this.getItem(id);
        item.changeQuantity(1);
        // this.updateCart();
      }

      if (e.target.classList.contains(DELETE_ONE_CLASSNAME)) {
        const id = +e.target.dataset['id'];
        let item = this.getItem(id);
        this.deleteItem(item);
        // this.updateCart();
      }

      if (e.target.classList.contains(DELETE_CLASSNAME)) {
        const id = +e.target.dataset['id'];
        let item = this.getItem(id);
        this.deleteAll(item);
        // this.updateCart();
      }

      if (e.target.classList.contains(DELETE_UNAVAILABLE_CLASSNAME)) {
        const id = +e.target.dataset['id'];
        let item = this.getItemUnavailable(id);
        this.deleteUnavailable(item);
      }
//---------------
      if (e.target.classList.contains(ICON_FAVORITE_SELECTOR)) {
        e.target.classList.toggle('cart__favorite_colored');
      }

      if (e.target.classList.contains('checkbox__input-all')) {
        let checkboxes = document.getElementsByClassName('checkbox__input');
        if (document.querySelector('.checkbox__input-all').checked) {
          for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
          }
        } else {
          for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
          }
        }
      }

      if (e.target.classList.contains('checkbox__input')) {
        if (!e.target.checked) {
          document.querySelector('.checkbox__input-all').checked = false;
        }
      }
    });
  }


}