import {ADDRESSES, POPUP_SELECTOR, CARDS, CARDS_NUMBER} from "@/config/constants";


export class Popup {

  popupContainer = document.querySelector(POPUP_SELECTOR);

  constructor() {
    this._render();
    this._init();
  }

  _render() {
    this.popupContainer.insertAdjacentHTML('afterbegin', this._markUp());
  }

  _setDeliveryText(type) {
    let invoiceTitleContainer = document.querySelector('.invoice__delivery .invoice__title');
    let invoiceAddressContainer = document.querySelector('.invoice__delivery .invoice__address');
    let deliveryTitleContainer = document.querySelector('.delivery__type');
    let deliveryAddressContainer = document.querySelector('.delivery__address');
    let options = document.querySelectorAll('.popup__delivery input[type="radio"]');
    let addr = '';

    options.forEach(el => {
      if (el.checked) {
        addr = el.value;
      }
    });

    if (type === 'courier') {
      invoiceTitleContainer.textContent = 'Доставка курьером';
      deliveryTitleContainer.textContent = 'Курьер';
    } else {
      invoiceTitleContainer.textContent = 'Доставка в пункт выдачи';
      deliveryTitleContainer.textContent = 'Пункт выдачи';
    }

    invoiceAddressContainer.textContent = ADDRESSES[addr] ?? ADDRESSES.default;
    deliveryAddressContainer.textContent = ADDRESSES[addr] ?? ADDRESSES.default;

    if (!addr) {
      invoiceTitleContainer.textContent = 'Доставка в пункт выдачи';
      deliveryTitleContainer.textContent = 'Пункт выдачи';
    }
  }

  // Установить выбранную карту в инвойс и часть про оплату
  _setPaymentCard() {
    let invoiceCardContainer = document.querySelector('.invoice__logo');
    let invoiceCardNumberContainer = document.querySelector('.invoice__card');
    let paymentCardNumberContainer = document.querySelector('.payment__card');
    let paymentCardContainer = document.querySelector('.payment__logo');
    let options = document.querySelectorAll('.popup__payment input[type="radio"]');
    let card = '';
    let cardNumber = '';

    options.forEach(el => {
      if (el.checked) {
        card = el.value;
        cardNumber = CARDS_NUMBER[card];
      }
    });

    invoiceCardContainer.style.background = `url(${CARDS[card]})`;
    paymentCardContainer.style.background = `url(${CARDS[card]})`;
    invoiceCardNumberContainer.textContent = cardNumber;
    paymentCardNumberContainer.textContent = cardNumber;
  }

  _init() {

    let deliveryCont = document.querySelector('.popup__delivery');
    let paymentCont = document.querySelector('.popup__payment');

    // КЛИК В КОНТЕЙНЕРЕ ДОСТАВКИ
    deliveryCont.addEventListener('click', e => {
      let classList = e.target.classList;

      // Выбрать доставку курьером или в пункт выдачи
      if (e.target.classList.contains('popup__option')) {
        let info = deliveryCont.querySelectorAll('.popup__pickup');

        if (e.target.attributes['data-name'].value === 'courier') {
          this._addClass('.popup__option[data-name="courier"]', 'popup__opted');
          this._removeClass('.popup__option[data-name="pickup"]', 'popup__opted');
          info.forEach(el => {
            el.classList.add('invisible');
          });
        } else {
          this._addClass('.popup__option[data-name="pickup"]', 'popup__opted');
          this._removeClass('.popup__option[data-name="courier"]', 'popup__opted');
          info.forEach(el => {
            el.classList.remove('invisible');
          });
        }
      }

      // Закрытие popup доставка БЕЗ СОХРАНЕНИЯ
      if (classList.contains('popup__close')) {
        this._closePopup('.popup__delivery');
      }

      // ЗАКРЫТЬ И СОХРАНИТЬ popup доставка
      if (classList.contains('popup__btn')) {

        this._closePopup('.popup__delivery');

        let deliveryType = deliveryCont.querySelector('.popup__opted').getAttribute('data-name');
        this._setDeliveryText(deliveryType);
      }

      // Удалить адрес доставки из списка
      if (classList.contains('popup__delete-addr')) {
        let addr = e.target.getAttribute('data-address');
        document.querySelector(`.popup__grid[data-address=${addr}]`).remove();
      }

    });


    // КЛИК В КОНТЕЙНЕРЕ ОПЛАТЫ
    paymentCont.addEventListener('click', e => {
      let classList = e.target.classList;

      // КНОПКА ЗАКРЫТЬ БЕЗ СОХРАНЕНИЯ
      if (classList.contains('popup__close')) {
        this._closePopup('.popup__payment');
      }

      //КНОПКА ВЫБРАТЬ (СОХРАНИТЬ И ЗАКРЫТЬ)
      if (classList.contains('popup__btn')) {
        this._closePopup('.popup__payment');
        this._setPaymentCard();
      }
    });

  }

  _closePopup(selector) {
    this._addClass('.popup', 'invisible');
    this._addClass(selector, 'invisible');
  }

  _addClass(selector, className) {
    document.querySelector(selector).classList.add(className);
  }

  _removeClass(selector, className) {
    document.querySelector(selector).classList.remove(className);
  }

  _markUp() {
    return `
      <div class="popup__delivery invisible">
        <header class="popup__header">
          <span class="popup__title">Способ доставки</span>
          <div class="popup__close"></div>
        </header>

        <main class="popup__main">
          <div class="popup__options">
            <div class="popup__option" data-name="pickup">В пункт выдачи</div>
            <div class="popup__option popup__opted" data-name="courier">Курьером</div>
          </div>

          <div class="popup__my-addresses">
            <div class="popup__subtitle">Мои адреса</div>

            <div class="popup__grid" data-address="tabyshalieva">
              <label class="popup__label">
                <input  type="radio" name="address-delivery" value="tabyshalieva" checked>
                <div class="popup__fake"></div>
                <div class="popup__addr">
                  Бишкек, улица Табышалиева, 57
                  <div class="popup__pickup invisible">
                    <div class="delivery__star popup__star"></div>
                    <span class="delivery__rating">4.99</span>
                    <span class="popup__pickup_gr">Пункт выдачи</span>
                  </div>
                </div>
              </label>

              <svg class="popup__delete popup__delete-addr" width="20" height="20" viewBox="0 0 20 20" fill="none" data-address="tabyshalieva">
                <path class="popup__delete-addr" data-address="tabyshalieva" fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                <path class="popup__delete-addr" data-address="tabyshalieva" fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                <path class="popup__delete-addr" data-address="tabyshalieva" fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
              </svg>      
            </div>

            <div class="popup__grid" data-address="jukeeva">
              <label class="popup__label">
                <input  type="radio" name="address-delivery" value="jukeeva">
                <div class="popup__fake"></div>
                <div class="popup__addr">
                  Бишкек, улица Жукеева-Пудовкина, 77/1
                  <div class="popup__pickup invisible">
                    <div class="delivery__star popup__star"></div>
                      <span class="delivery__rating">4.99</span>
                      <span class="popup__pickup_gr">Пункт выдачи</span>
                    </div>
                  </div>
              </label>

              <svg class="popup__delete popup__delete-addr" width="20" height="20" viewBox="0 0 20 20" fill="none" data-address="jukeeva">
                <path class="popup__delete-addr" data-address="jukeeva" fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                <path class="popup__delete-addr" data-address="jukeeva" fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                <path class="popup__delete-addr" data-address="jukeeva" fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
              </svg>
            </div>

            <div class="popup__grid" data-address="ahunbaeva">
              <label class="popup__label">
                <input  type="radio" name="address-delivery" value="ahunbaeva">
                <div class="popup__fake"></div>
                <div class="popup__addr">
                  Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1
                  <div class="popup__pickup invisible">
                    <div class="delivery__star popup__star"></div>
                    <span class="delivery__rating">4.99</span>
                    <span class="popup__pickup_gr">Пункт выдачи</span>
                  </div>
                </div>
              </label>

              <svg class="popup__delete popup__delete-addr" width="20" height="20" viewBox="0 0 20 20" fill="none" data-address="ahunbaeva">
                <path class="popup__delete-addr" data-address="ahunbaeva" fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                <path class="popup__delete-addr" data-address="ahunbaeva" fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                <path class="popup__delete-addr" data-address="ahunbaeva" fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
              </svg>
            </div>
          </div>

        </main>

        <button class="popup__btn" type="button">Выбрать</button>
      </div>
      
      <div class="popup__payment invisible">
        <header class="popup__header">
          <span class="popup__title">Способ оплаты</span>
          <div class="popup__close"></div>
        </header>
        
        <div class="popup__payment-options">
          <label class="popup__label popup__label_mb">
            <input  type="radio" name="payment-option" value="mir" checked>
            <div class="popup__fake"></div>
            <div class="popup__mir"></div>
            <div class="popup__number">
              ${CARDS_NUMBER.mir}
            </div>
          </label>
              
          <label class="popup__label popup__label_mb">
            <input  type="radio" name="payment-option" value="visa">
            <div class="popup__fake"></div>
            <div class="popup__visa"></div>
            <div class="popup__number">
              ${CARDS_NUMBER.visa}
            </div>
          </label>
              
          <label class="popup__label popup__label_mb">
            <input  type="radio" name="payment-option" value="mastercard">
            <div class="popup__fake"></div>
            <div class="popup__mastercard"></div>
            <div class="popup__number">
              ${CARDS_NUMBER.mastercard}
            </div>
          </label>
              
          <label class="popup__label popup__label_mb">
            <input  type="radio" name="payment-option" value="maestro">
            <div class="popup__fake"></div>
            <div class="popup__maestro"></div>
            <div class="popup__number">
              ${CARDS_NUMBER.maestro}
            </div>
          </label>
        </div>
        
        <button class="popup__btn popup__btn_mt" type="button">Выбрать</button>
      </div>
    `;
  }
}
