import { CUSTOMER_SELECTOR } from "@/config/constants";


export class Customer {

  customerContainer = document.querySelector(CUSTOMER_SELECTOR);

  constructor(client) {
    this.customer = client;
    this._render();
    this._init();
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

  // Проверка введенного пользователем текста в input и переключение предупреждения о некорректном вводе
  _checkContent(e, value, regexp) {
    if (!regexp.test(value)) {
      e.target.parentNode.querySelector('.customer__error').classList.remove('hidden');
      e.target.classList.add('red');
    } else {
      e.target.parentNode.querySelector('.customer__error').classList.add('hidden');
      e.target.classList.remove('red');
    }
  }

  _init() {

    this.customerContainer.addEventListener('change', e => {

      if (e.target.classList.contains('customer__name')) {
        let content = e.target.value.trim();
        let regexp = /^[а-яА-ЯЁё ]+$/;

        this._checkContent(e, content, regexp);
      }

      if (e.target.classList.contains('customer__mail')) {
        let content = e.target.value.trim();
        let regexp = /^([!#$%&*-+{}|?/~\w]+(.?[\w]+)*@([\w-]{1,255}\.)[\w-]{2,4})?$/;

        this._checkContent(e, content, regexp);
      }

      if (e.target.classList.contains('customer__inn')) {
        let content = e.target.value.trim();
        let regexp = /^[0-9]+$/;

        if (!regexp.test(content)) {
          e.target.parentNode.querySelector('.customer__error').classList.remove('invisible');
          e.target.parentNode.querySelector('.customer__info').classList.add('invisible');
          e.target.classList.add('red')
        } else {
          e.target.parentNode.querySelector('.customer__error').classList.add('invisible');
          e.target.parentNode.querySelector('.customer__info').classList.remove('invisible');
          e.target.classList.remove('red');
        }
      }
    });
  }

  _markUp() {
    return `
      <header class="customer__header">
        <h2 class="customer__h2">Получатель</h2>
      </header>
      
      <main class="customer__main">
        <form class="customer__form">
        
          <div class="customer__fio">
            <div class="customer__name-wrap">
              <div class="customer__title hidden">Имя</div>
              <input type="text" class="customer__name fio" maxlength="45" placeholder="Имя" name="name">
              <div class="customer__error hidden">Укажите имя</div>
            </div>
            <div class="customer__surname-wrap">
              <div class="customer__title hidden">Фамилия</div>
              <input type="text" class="customer__name fio" maxlength="45" placeholder="Фамилия" name="surname">
              <div class="customer__error hidden">Укажите фамилию</div>
            </div>
          </div>
          
          <div class="customer__contact">
            <div class="customer__mail-wrap">
              <div class="customer__title hidden">${this._getMailText()}</div>
              <input type="email" class="customer__mail" maxlength="45" placeholder="${this._getMailText()}" name="mail">
              <div class="customer__error hidden">Укажите почту</div>
            </div>
            <div class="customer__phone-wrap">
              <div class="customer__title">Телефон</div>
              <input type="text" class="customer__phone" placeholder="${this.customer.phone}" name="phone">
              <div class="customer__error hidden">Укажите телефон</div>
            </div>
            <div class="customer__inn-wrap">
              <div class="customer__title hidden">ИНН</div>
              <input type="text" class="customer__inn" maxlength="45" placeholder="ИНН" name="inn">
              <div class="customer__info">Для таможенного оформления</div>
              <div class="customer__error invisible">Укажите ИНН</div>
            </div>
          </div>
        </form>
      </main>
    `;
  }
}
