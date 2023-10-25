import { PAYMENT_SELECTOR } from "@/config/constants";


export class Payment {

  paymentContainer = document.querySelector(PAYMENT_SELECTOR);

  constructor(creditCard) {
    this.creditCard = creditCard;
    this._render();
  }

  _render() {
    this.paymentContainer.insertAdjacentHTML('afterbegin', this._markUp());

  }

  _markUp() {
    return `
      <header class="payment__header">
        <h2 class="payment__h2">Способ оплаты</h2>
        <span class="payment__edit">Изменить</span>        
      </header>
      
      <main class="payment__main">
        <div class="payment__logo"></div>
        <div class="payment__card">${this.creditCard}</div>
        <div class="payment__expiry">01/30</div>
      </main>
      
      <footer class="payment__footer">
        <div class="payment__text">Спишем оплату с карты при получении</div>
      </footer>
    `;
  }

}