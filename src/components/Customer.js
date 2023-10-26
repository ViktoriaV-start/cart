import { CUSTOMER_SELECTOR } from "@/config/constants";


export class Customer {

  customerContainer = document.querySelector(CUSTOMER_SELECTOR);

  constructor(client) {
    this.customer = client;
    this._render();

  }

  _render() {
    this.customerContainer.insertAdjacentHTML('afterbegin', this._markUp());

  }

  _getMailText() {
    if (window. innerWidth <= 1023.9) {
      return 'Электронная почта';
    }
    return 'Почта';
  }

  _markUp() {
    return `
      <header class="customer__header">
        <h2 class="customer__h2">Получатель</h2>
      </header>
      
      <main class="customer__main">
        <form class="customer__form">
        
          <div class="customer__fio">
            <div>
              <div class="customer__title hidden">Имя</div>
              <input class="customer__name" maxlength="45" placeholder="Имя">
              <div class="customer__error hidden">Укажите имя</div>
            </div>
            <div>
              <div class="customer__title hidden">Фамилия</div>
              <input class="customer__name" maxlength="45" placeholder="Фамилия">
              <div class="customer__error hidden">Укажите фамилию</div>
            </div>
          </div>
            

            
              <div class="customer__contact">
            <div>
              <div class="customer__title hidden">${this._getMailText()}</div>
              <input class="customer__mail" maxlength="45" placeholder="${this._getMailText()}">
              <div class="customer__error hidden">Укажите почту</div>
            </div>
            <div>
              <div class="customer__title">Телефон</div>
              <input class="customer__phone" readonly placeholder="${this.customer.phone}">
              <div class="customer__error hidden">Укажите телефон</div>
            </div>
            <div>
              <div class="customer__title">ИНН</div>
              <input class="customer__inn" maxlength="45" placeholder="ИНН">
              <div class="customer__info">Для таможенного оформления</div>
            </div>
            
          </div>
            

        
        </form>
      
      
      
   
      </main>
      
    `;
  }

}