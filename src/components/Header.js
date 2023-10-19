import { HEADER_SELECTOR } from "@/config/constants";



export class Header {

  headerContainer = document.querySelector(HEADER_SELECTOR);

  constructor() {
    this._render();
    this._init();
  }

  _markUp() {
    return `
      <header class="container header__wrap">
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
          <div class="header__quantity">3</div>
        </div>
        
      </header>
    
    `;
  }

  _render() {
    this.headerContainer.insertAdjacentHTML("afterbegin", this._markUp());
  }
  _init() {}
}