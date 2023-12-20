import {CUSTOMER_SELECTOR, INVOICE_SELECTOR} from "@/config/constants";


export class Invoice {

  invoiceContainer = document.querySelector(INVOICE_SELECTOR);

  constructor(products, client) {

    this.products = products;
    this.client = client;
    this._render();
    this._init();
  }

  // Перевести число в формат с пробелами
  getPriceString(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
  }

  // Посчитать количество выбранных товаров в корзине
  getQuantity() {
    let quantity = 0;
    this.products.forEach(el => {
      if (el.confirmed) quantity += el.productQuantity;
    });
    return quantity;
  }

  // Получить стоимость выбранных товаров в корзине
  getTotal() {
    let total = 0;
    this.products.forEach(el => {
      if (el.confirmed) total += el.totalPrice;
    });
    return total;
  }

  // Получить полную стоимость (без скидки) выбранных товаров в корзине
  getFullTotal() {
    let total = 0;
    this.products.forEach(el => {
      if (el.confirmed) total += el.fullTotalPrice;
    });
    return total;
  }

  // Посчитать общую скидку на товары в корзине
  getDiscount() {
    return this.getFullTotal() - this.getTotal();
  }

  // Обновить invoice - итоговая цена, полная цена, количество товаров, скидка
  update() {
    this.invoiceContainer.querySelector('.invoice__quantity').textContent = this.getQuantity();
    this.invoiceContainer.querySelector('.invoice__quantity-caption').textContent = this.getCaption(this.getQuantity());
    this.invoiceContainer.querySelector('.invoice__total-num').textContent = this.getPriceString(this.getTotal());
    this.invoiceContainer.querySelector('.invoice__full-num').textContent = this.getPriceString(this.getFullTotal());
    this.invoiceContainer.querySelector('.invoice__discount').textContent = this.getPriceString(this.getDiscount());
    this._installBtnText();
  }

  _installBtnText() {
    let btn = this.invoiceContainer.querySelector('.invoice__btn');
    if (this.invoiceContainer.querySelector('.invoice__input').checked) {
      btn.textContent = `Оплатить ${this.getPriceString(this.getTotal())} сом`;
      btn.classList.add('invoice__btn_mt');
            this.invoiceContainer.querySelector('.invoice__post').classList.add('invisible');
    } else {
      btn.textContent = 'Заказать';
      btn.classList.remove('invoice__btn_mt');
      this.invoiceContainer.querySelector('.invoice__post').classList.remove('invisible');
    }
  }

  _render() {
    this.invoiceContainer.insertAdjacentHTML('afterbegin', this._markUp());
  }

  moveToCustomer(field) {
    field.classList.add('red');
    field.parentNode.querySelector('.customer__error').classList.remove('hidden');
    document.querySelector(CUSTOMER_SELECTOR).scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    });
  }

  getCaption(num) {
    let words = ['товар', 'товара', 'товаров'];

    switch (num % 10) {

      case 1:
        if (Math.floor((num % 100)/10) !== 1) return words[0];
        return words[2];

      case 2:
      case 3:
      case 4:
        if (Math.floor((num % 100)/10) !== 1) {
          return  words[1];
        } else {
          return  words[2];
        }

      default:
        return words[2];
    }
  }

  _init() {

    this.invoiceContainer.addEventListener('click', e => {

      if (e.target.classList.contains('invoice__btn')) {

        const containers = {
          name: document.querySelector('input[name="name"]'),
          surname: document.querySelector('input[name="surname"]'),
          mail: document.querySelector('input[name="mail"]'),
          inn: document.querySelector('input[name="inn"]'),

        }

        let phoneCont = document.querySelector('input[name="phone"]');
        let phone = phoneCont.value;
        if (phone && phone.length !== 16) {
          this.moveToCustomer(phoneCont);
        }

        for (let key in containers) {
          if (!containers[key].value) {
            this.moveToCustomer(containers[key]);
          }
        }
      }

      if (e.target.classList.contains('invoice__input')) {
        this._installBtnText();
      }
    });
  }

  _markUp() {
    return `
    <form action="#" class="invoice__form">
      <header class="invoice__total-wrap">
        <div>
            Итого
        </div>
        <div class="invoice__total">
            <span class="invoice__total-num">${this.getPriceString(this.getTotal())}</span><span class="invoice__total-currency">сом</span>
        </div>
      </header>
      
      <section class="invoice__details">
        <div><span class="invoice__quantity">${this.getQuantity()}</span> <span class="invoice__quantity-caption">товара</span></div>
        <div class="invoice__sum"><span class="invoice__full-num">${this.getPriceString(this.getFullTotal())}</span> сом</div>
        <div>Скидка</div>
        <div class="invoice__sum">&minus;<span class="invoice__discount">${this.getPriceString(this.getDiscount())}</span> сом</div>
        <div>Доставка</div>
        <div class="invoice__sum">Бесплатно</div>
      </section>
      
      <section class="invoice__delivery">
        <div class="invoice__header">
          <h3 class="invoice__title">Доставка в пункт выдачи</h3>
          <div class="invoice__edit edit-dlv"></div>
        </div>
        <div class="invoice__address">Бишкек, улица Ахматбека Суюмбаева, 12/1</div>
        <span class="invoice__dates">5&ndash;8 фев</span>
        <div class="invoice__return">
          <div class="invoice__confirm"></div>
          <div class="invoice__text-wrap">
            <span class="invoice__text">Обратная доставка товаров на&nbsp;склад при&nbsp;отказе &mdash;</span><span class="invoice__text_cl">бесплатно</span>
            <div class="invoice__return-info">Если товары вам не&nbsp;подойдут, мы вернем иx обратно на&nbsp;склад — это бесплатно</div>
          </div>
        </div>
      </section>
      
      <section class="invoice__payment-wrap">
        <div class="invoice__header">
          <h3 class="invoice__title">Оплата картой</h3>
          <div class="invoice__edit edit-pm"></div>
        </div>
        
        <div class="invoice__payment">
          <div class="invoice__logo"></div>
          <div class="invoice__card">${this.client.creditCard}</div>
        </div>
        
        <div class="invoice__choice">
          <label class="invoice__label">
            <input class="invoice__input" type="checkbox" id="choice">
            <div class="invoice__fake"></div>
            <span class="invoice__payment-txt">Списать оплату сразу</span>
          </label>
          <span class="invoice__payment-txt invoice__post">Спишем оплату с карты при получении</span>
        </div>
      </section>
      <button class="invoice__btn" type="button">Заказать</button>
    </form>
    
    <div class="invoice__rules">
      <div class="invoice__ticking"></div>
      <div class="invoice__agreement">
        Соглашаюсь <span class="invoice__agreement-inderline">с&nbsp;правилами пользования торговой площадкой</span> и&nbsp;<span class="invoice__agreement-inderline">возврата</span>
      </div>
    </div>
    `;
  }
}
