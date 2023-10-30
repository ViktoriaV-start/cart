import {
  ADD_CLASSNAME,
  CART_AVAILABLE_SELECTOR,
  CART_UNAVAILABLE_SELECTOR,
  DELETE_CLASSNAME,
  DELETE_ONE_CLASSNAME,
  DELETE_UNAVAILABLE_CLASSNAME,
  ORDER_SELECTOR,
  PRODUCT_SELECTOR,
  ORDER, ICON_FAVORITE_SELECTOR, MAIN_SELECTOR
} from "@/config/constants";
import { Item } from "@/components/Item";
import { Client } from "@/components/Client";
import {Invoice} from "@/components/Invoice";

export class Cart {

  availableProducts = [];
  unavailableProducts = [];
  orderContainer = document.querySelector(ORDER_SELECTOR);

  constructor() {
    this.handleData(ORDER.available, this.availableProducts);
    this.handleData(ORDER.unavailable, this.unavailableProducts);
    this._render();
    this._init();

    this.client = new Client(ORDER.client, this.availableProducts, this.unavailableProducts);
    this.invoice = new Invoice(this.availableProducts, this.client.customer.customer);
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

  // Создать экземпляр класса Item для каждого товара в заказе
  // Заполнить указанную корзину (this.availableProducts/this.unavailableProducts) товарами
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
            <span class="checkbox__text">Выбрать все</span>
          </label>

          <div class="cart__briefly invisible">
            <span>266 товаров</span>
            <div class="point"></div>
            <span>2 100 269 сом</span>
          </div>
          
          <label class="arrow__available">
            <input type="checkbox" class="cart__arrow-available">
            <div class="fake-arrow"></div>
          </label>
        </div>
        
        <div class="cart__available"></div>
        
        <div class="cart__unavailable-wrap">
        <div class="cart__unheading-wrap">
          <div class="cart__unavailable-heading">
            <span>Отсутствуют</span>
            <div class="point"></div>
            <span>${this._countUnavailable()} товара</span>
          </div>
          
          <label class="arrow__unavailable">
            <input type="checkbox" class="cart__arrow-unavailable">
            <div class="fake-arrow"></div>
          </label>
          </div>
         
          <div class="cart__unavailable"></div>
        </div>
      </section>
    `;
  }

  // Получить товар из this.availableProducts по ID
  getItem(id) {
    return this.availableProducts.find(el => el.productId === id);
  }

  // Получить товар из this.unavailableProducts по ID
  getItemUnavailable(id) {
    return this.unavailableProducts.find(el => el.productId === id);
  }


  // Если товар в корзине = 1 штука - удалить из корзины доступных товаров и удалить разметку товара
  // Если товара в корзине больше 1-го - уменьшить количество на 1 в доступных товарах
  deleteItem(item) {
    if (item.productQuantity > 1) {
      item.changeQuantity(-1);
      return;
    }
    this.availableProducts.splice(this.availableProducts.indexOf(item), 1);
    this.removeMarkUp(item.productId);
  }

  // Удалить товар из корзины доступных товаров и удалить разметку товара
  deleteAll(item) {
    this.availableProducts.splice(this.availableProducts.indexOf(item), 1);
    this.removeMarkUp(item.productId);
  }

  // Удалить товар из корзины недоступных товаров и удалить разметку товара
  deleteUnavailable(item) {
    this.unavailableProducts.splice(this.unavailableProducts.indexOf(item), 1);
    this.removeMarkUp(item.productId);
  }

  // Скрыть или отобразить в разделе доставки даты доставки в зависимости от наличия выбранных товаров
  _handleDatesVisibility() {
    let deliveryContainers = document.querySelectorAll('.delivery__images');

    deliveryContainers.forEach(elem => {
      let elements = elem.querySelectorAll('.dlv');
      let visibility = [];
      elements.forEach(el => {

        if (!el.classList.contains('invisible')) {
          visibility.push(true);
        }

        if (visibility.length === 0) {
          elem.previousElementSibling.classList.add('invisible');
        } else {
          elem.previousElementSibling.classList.remove('invisible');
        }
      })
    });
  }

  //удалить разметку товара со страницы
  removeMarkUp(id) {
    document.querySelector(`${PRODUCT_SELECTOR}[data-id="${id}"]`).remove();
  }

  // Установить слушателей событий и определить действия
  _init() {
    this.orderContainer.addEventListener('click', e => {

      // Открытие/скрытие корзины доступных товаров
      if (e.target.classList.contains('cart__arrow-available')) {
        this.orderContainer.querySelector(CART_AVAILABLE_SELECTOR).classList.toggle('invisible');
        this.orderContainer.querySelector('.cart__briefly').classList.toggle('invisible');
        this.orderContainer.querySelector('.fake__all').classList.toggle('invisible');
        this.orderContainer.querySelector('.checkbox__text').classList.toggle('invisible');
      }

      // Открытие/скрытие корзины недоступных товаров
      if (e.target.classList.contains('cart__arrow-unavailable')) {
        this.orderContainer.querySelector(CART_UNAVAILABLE_SELECTOR).classList.toggle('invisible');
      }

      // Увеличить количество товара в корзине
      if (e.target.classList.contains(ADD_CLASSNAME)) {

        const id = +e.target.dataset['id'];
        let item = this.getItem(id);

        if (item.productQuantity < item.productInStock) {
          item.changeQuantity(1);
        }
        this.invoice.update();
      }

      // Уменьшить количество товара в корзине
      if (e.target.classList.contains(DELETE_ONE_CLASSNAME)) {
        const id = +e.target.dataset['id'];
        let item = this.getItem(id);

        if(item.productQuantity > 1) {
          this.deleteItem(item);
        }
        this.invoice.update();
      }

      // Удалить товар из группы доступных товаров
      if (e.target.classList.contains(DELETE_CLASSNAME)) {
        const id = +e.target.dataset['id'];
        let item = this.getItem(id);
        this.deleteAll(item);

        let elements = document.querySelectorAll(`.dlv[data-id="${id}"]`);
        elements.forEach(elem => elem.remove());
        this.invoice.update();
      }

      // Удалить товар из группы недоступных товаров
      if (e.target.classList.contains(DELETE_UNAVAILABLE_CLASSNAME)) {
        const id = +e.target.dataset['id'];
        let item = this.getItemUnavailable(id);
        this.deleteUnavailable(item);
      }

//---------------

      if (e.target.classList.contains(ICON_FAVORITE_SELECTOR)) {
        e.target.classList.toggle('cart__favorite_colored');
      }

      // СЛУШАТЕЛЬ СОБЫТИЯ НА ОБЩЕМ ЧЕКБОКСЕ - переключает отображение товаров в разделе доставки
      if (e.target.classList.contains('checkbox__input-all')) {
        //let deliveryDatesContainer = document.querySelector('.delivery__dates');
        let elements = document.querySelectorAll(`.dlv`);
        let checkboxes = document.getElementsByClassName('checkbox__input');

        if (document.querySelector('.checkbox__input-all').checked) {
          for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
          }
          elements.forEach(elem => elem.classList.remove('invisible'));
          this.availableProducts.forEach(el => {
            el.confirmed = true;
          });

        } else {
          for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
          }
          elements.forEach(elem => elem.classList.add('invisible'));
          elements.forEach(elem => elem.classList.remove('invisible'));
          this.availableProducts.forEach(el => {
            el.confirmed = false;
          });
        }

        this._handleDatesVisibility();
        this.invoice.update();
      }

      // СЛУШАТЕЛЬ СОБЫТИЯ НА ОТДЕЛЬНОМ ЧЕКБОКСЕ - переключает отображение отдельного товара в разделе доставки
      if (e.target.classList.contains('checkbox__input')) {
        const id = +e.target.dataset['id'];
        let elements = document.querySelectorAll(`.dlv[data-id="${id}"]`);

        const item = this.getItem(id);

        if (!e.target.checked) {
          document.querySelector('.checkbox__input-all').checked = false;
          elements.forEach(elem => elem.classList.add('invisible'));
          item.confirmed = false;

        } else {
          elements.forEach(elem => elem.classList.remove('invisible'));
          item.confirmed = true;
        }

        this._handleDatesVisibility();
        this.invoice.update();
      }
    });

    // Закрыть popup
    document.querySelector(MAIN_SELECTOR).addEventListener('click', e => {

      if (e.target.classList.contains('edit-dlv')) {
        document.querySelector('.popup').classList.remove('invisible');
        document.querySelector('.popup__delivery').classList.remove('invisible');
      }

      if (e.target.classList.contains('edit-pm')) {
        document.querySelector('.popup').classList.remove('invisible');
        document.querySelector('.popup__payment').classList.remove('invisible');
      }

    });
  }
}
