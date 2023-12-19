import { HEADER_SELECTOR } from "@/config/constants";

export class Header {

  headerContainer = document.querySelector(HEADER_SELECTOR);

  constructor() {
    this._render();
  }

  _markUp() {
    return `
      <div class="container header__wrap">
        <div class="header__icon-catalog"></div>
        <div class="header__logo">ТОВАРЫ И ТОЧКА</div>
        <div class="header__search">
          <input type="text" name="search" placeholder="Я ищу..." class="header__input">
          <button class="header__btn"></button>
        </div>
        <div class="header__profile">
          <span class="header__label">Профиль</span>
        </div>
        <div class="header__cart">
          <span class="header__label">Корзина</span>
          <div class="header__quantity quantity"></div>
        </div>
      </div>
    `;
  }

  _render() {
    this.headerContainer.insertAdjacentHTML("afterbegin", this._markUp());
  }

}
