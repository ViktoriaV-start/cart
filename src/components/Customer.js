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
  _checkContent(ev, value, regexp) {
    if (!regexp.test(value)) {
      ev.target.parentNode.querySelector('.customer__error').classList.remove('hidden');
      ev.target.classList.add('red');
    } else {
      ev.target.parentNode.querySelector('.customer__error').classList.add('hidden');
      ev.target.classList.remove('red');
    }
  }

  _phoneMask(ev) {
      let el     = ev.target,
        matrix = '+7 ___ ___-__-__',
        i      = 0,
        def    = matrix.replace(/\D/g, ''),
        val    = ev.target.value.replace(/\D/g, '');

      if (ev.type === 'blur') {
        if (val.length < matrix.match(/([\d])/g).length) {
          ev.target.value = '';
          return;
        }
      }

      if (def.length >= val.length) val = def;

      ev.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });

  }

  _init() {

    this.customerContainer.addEventListener('change', ev => {

      if (ev.target.classList.contains('customer__name')) {
        let content = ev.target.value.trim();
        let regexp = /^[а-яА-ЯЁё ]+$/;

        this._checkContent(ev, content, regexp);
      }

      if (ev.target.classList.contains('customer__mail')) {
        let content = ev.target.value.trim();
        let regexp = /^([!#$=%&*+{}|?/~a-zA-Z0-9]+(\.?[!#$%=&*\-+{}|?/~\w]+)*@([\w-]{1,253}\.)[\w-]{2,4})?$/;

        this._checkContent(ev, content, regexp);
      }

      if (ev.target.classList.contains('customer__inn')) {
        let content = ev.target.value.trim();
        let inn = content.replace(/[ -\.]/g, '');
        let regexp = /^[0-9]+$/;

        if (!regexp.test(inn) || inn.length !== 12) {
          ev.target.parentNode.querySelector('.customer__error').classList.remove('invisible');
          ev.target.parentNode.querySelector('.customer__info').classList.add('invisible');
          ev.target.classList.add('red')
        } else {
          ev.target.parentNode.querySelector('.customer__error').classList.add('invisible');
          ev.target.parentNode.querySelector('.customer__info').classList.remove('invisible');
          ev.target.classList.remove('red');
        }
      }
    });

    let phoneCont = document.querySelector('.customer__phone');

      for (let event of ['input', 'focus']) {
        phoneCont.addEventListener(event, this._phoneMask);
      }

    phoneCont.addEventListener('blur', (ev) => {
        if (ev.target.classList.contains('customer__phone')) {
          let content = ev.target.value.trim();
          let phone = content.replace(/[\+ -]/g, '');

          if (phone.length !== 11) {
            ev.target.parentNode.querySelector('.customer__error').classList.remove('hidden');
            ev.target.classList.add('red');
          } else {
            ev.target.parentNode.querySelector('.customer__error').classList.add('hidden');
            ev.target.classList.remove('red');
          }
        }
    })
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
