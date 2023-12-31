import { DELIVERY_SELECTOR } from "@/config/constants";


export class Delivery {

  deliveryContainer = document.querySelector(DELIVERY_SELECTOR);

  constructor(availableProducts, unavailableProducts) {
    this.availableProducts = availableProducts;
    this.unavailableProducts = unavailableProducts;

    this._render();
  }

  _render() {
    this.deliveryContainer.insertAdjacentHTML('afterbegin', this._markUp());
  }

  _markUp() {
    return `
      <header class="delivery__header">
        <h2 class="delivery__h2">Способ доставки</h2>
        <span class="delivery__edit edit-dlv">Изменить</span>
      </header>
      
      <main>
        <div class="delivery__info">
          <span class="delivery__title delivery__type">Пункт выдачи</span>
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
          <div class="delivery__images" id="feb5">
            <div class="delivery__img1 dlv" data-id="1"><div class="delivery__quantity" data-id="1"></div></div>
            <div class="delivery__img2 dlv" data-id="2"><div class="delivery__quantity" data-id="2">184</div></div>
            <div class="delivery__img3 dlv" data-id="3"><div class="delivery__quantity" data-id="3">2</div></div>
          </div>
            
          <span class="delivery__title delivery__title_dt">7—8 февраля</span>
          <div class="delivery__images" id="feb7">
            <div class="delivery__img2 dlv" data-id="2"><div class="delivery__quantity">16</div></div>
          </div>
        </div>
        
      </main>
      
      <footer class="delivery__footer">
        <div class="delivery__confirm"></div>
        <div class="delivery__text-wrap">
          <span class="delivery__price">Обратная доставка товаров на склад при отказе &mdash;</span><span class="delivery__price_cl">бесплатно</span>
          <div class="delivery__return-info">Если товары вам не подойдут, мы вернем иx обратно на склад — это бесплатно</div>
        </div>
      </footer>
    `;
  }
}
