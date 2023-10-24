import {DELIVERY_SELECTOR, ORDER_SELECTOR} from "@/config/constants";


export class Delivery {

  deliveryContainer = document.querySelector(DELIVERY_SELECTOR);

  constructor() {

    this._render();
  }

  _render() {
    this.deliveryContainer.insertAdjacentHTML('afterbegin', this._markUp());

  }

  _markUp() {
    return `
      <header class="delivery__header">
        <h2 class="delivery__h2">Способ доставки</h2>
        <span class="delivery__edit">Изменить</span>
      </header>
      
      <main>
        <div class="delivery__info">
          <span class="delivery__title">Пункт выдачи</span>
          <div class="delivery__address">
            <span>Бишкек, улица Ахматбека Суюмбаева, 12/1</span>
            <div class="delivery__hours">
              <div class="delivery__star"></div>
              <span class="delivery__rating">4.99</span>
              <span>Ежедневно с 10 до 21</span>
            </div>
          </div>
            
          <span class="delivery__title">Стоимость доставки</span>
          <span class="delivery__free">Бесплатно</span>
        </div>

        <div class="delivery__dates">           
          <span class="delivery__title delivery__title_dt">5—6 февраля</span>
          <div class="delivery__images">
            <div class="delivery__img1"><div class="delivery__quantity"></div></div>
            <div class="delivery__img2"><div class="delivery__quantity">184</div></div>
            <div class="delivery__img3"><div class="delivery__quantity">2</div></div>
          </div>
            
          <span class="delivery__title delivery__title_dt">7—8 февраля</span>
          <div class="delivery__images">
            <div class="delivery__img2"><div class="delivery__quantity">16</div></div>
          </div>
        
        </div> 
      </main>
      
      <footer class="delivery__footer">
        <div class="delivery__confirm"></div>
        <span class="delivery__price">Обратная доставка товаров на склад при отказе —</span>
        <span class="delivery__price_cl">бесплатно</span>
      </footer>
    `;
  }

}