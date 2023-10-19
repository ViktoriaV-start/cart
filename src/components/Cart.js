import {HEADER_SELECTOR,
        ORDER,
        ORDER_SELECTOR
} from "@/config/constants";

export class Cart {
  availableProduct = ORDER.available;
  unavailableProduct = ORDER.unavailable;
  orderContainer = document.querySelector(ORDER_SELECTOR);

  constructor() {
    let pr = this.availableProduct[0];
    this._render();

  }

  _render() {
    this.orderContainer.insertAdjacentHTML("afterbegin", this._markUp());
  }

  _markUp() {
    return `
      <section class = "cart">
        <h1 class = "cart__heading">Корзина</h1>

        <label class="checkbox__label checkbox__all">
          <input type="checkbox" class="cart__checkbox">
          <div class="fake-chb fake__all"></div>
          Выбрать все
        </label>


      
      </section>
    `;
  }


}