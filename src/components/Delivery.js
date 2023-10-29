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


  /**
  * Это заготовки для рендера товаров на доставке в зависимости от того, какие
   * товары в корзине, дат доставки и количества.
  */

  // _render5Feb() {
  //   let place = document.getElementById('5Feb');
  //   for (let i = this.availableProducts - 1; i >= 0; i--) {
  //     place.insertAdjacentHTML('afterbegin', this._markUp5Feb(this.availableProducts[i]));
  //   }
  // }
  //
  // _markUp5Feb(item) {}
  //
  // _render7Feb() {}

  _markUp() {
    return `
      <header class="delivery__header">
        <h2 class="delivery__h2">Способ доставки</h2>
        <span class="delivery__edit edit-dlv">Изменить</span>
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
          <div class="delivery__images" id="5Feb">
            <div class="delivery__img1 dlv" data-id="1"><div class="delivery__quantity"></div></div>
            <div class="delivery__img2 dlv" data-id="2"><div class="delivery__quantity">184</div></div>
            <div class="delivery__img3 dlv" data-id="3"><div class="delivery__quantity">2</div></div>
          </div>
            
          <span class="delivery__title delivery__title_dt">7—8 февраля</span>
          <div class="delivery__images" id="7Feb">
            <div class="delivery__img2 dlv" data-id="2"><div class="delivery__quantity">16</div></div>
          </div>
        </div>
        
      </main>
      
      
      
      <footer class="delivery__footer">
        <div class="delivery__confirm"></div>
        <span class="delivery__price">Обратная доставка товаров на склад при отказе —</span><span class="delivery__price_cl">бесплатно</span>
      </footer>
    `;
  }
}
