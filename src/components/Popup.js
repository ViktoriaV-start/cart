import {POPUP_SELECTOR} from "@/config/constants";


export class Popup {

  popupContainer = document.querySelector(POPUP_SELECTOR);

  constructor() {
    this._render();
    this._init();
  }

  _render() {
    this.popupContainer.insertAdjacentHTML('afterbegin', this._markUp());

  }

  _init() {

    this.popupContainer.addEventListener('click', e => {
      if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup__btn')) {
        document.querySelector('.popup').classList.add('invisible');
        document.querySelector('.popup__delivery').classList.add('invisible');
        document.querySelector('.popup__payment').classList.add('invisible');
      }

      if (e.target.classList.contains('popup__option')) {
        let info = this.popupContainer.querySelectorAll('.popup__pickup');

        if (e.target.attributes['data-name'].value === 'courier') {
          this.popupContainer.querySelector('.popup__option[data-name="courier"]').classList.add('popup__opted');
          this.popupContainer.querySelector('.popup__option[data-name="pickup"]').classList.remove('popup__opted');
          info.forEach(el => {
            el.classList.add('invisible');
          });
        } else {
          this.popupContainer.querySelector('.popup__option[data-name="pickup"]').classList.add('popup__opted');
          this.popupContainer.querySelector('.popup__option[data-name="courier"]').classList.remove('popup__opted');
          info.forEach(el => {
            el.classList.remove('invisible');
          });
        }
      }
    });



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

            <div class="popup__grid">

                <label class="popup__label">
                  <input  type="radio" name="address-delivery" value="Tabyshalieva" checked>
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

                <svg class="popup__delete" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                </svg>
                
                
            </div>

            <div class="popup__grid">
              <label class="popup__label">
                <input  type="radio" name="address-delivery" value="Jukeeva-Pudovkina">
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

              <svg class="popup__delete" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
              </svg>
            </div>

            <div class="popup__grid">
              <label class="popup__label">
                <input  type="radio" name="address-delivery" value="Ahunbaeva">
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

              <svg class="popup__delete" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
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
                  1234 56•• •••• 1234
                </div>
              </label>
              
              <label class="popup__label popup__label_mb">
                <input  type="radio" name="payment-option" value="visa">
                <div class="popup__fake"></div>
                <div class="popup__visa"></div>
                <div class="popup__number">
                  1234 56•• •••• 1234
                </div>
              </label>
              
              <label class="popup__label popup__label_mb">
                <input  type="radio" name="payment-option" value="mastercard">
                <div class="popup__fake"></div>
                <div class="popup__mastercard"></div>
                <div class="popup__number">
                  1234 56•• •••• 1234
                </div>
              </label>
              
              <label class="popup__label popup__label_mb">
                <input  type="radio" name="payment-option" value="maestro">
                <div class="popup__fake"></div>
                <div class="popup__maestro"></div>
                <div class="popup__number">
                  1234 56•• •••• 1234
                </div>
              </label>
        </div>
        
        <button class="popup__btn popup__btn_mt" type="button">Выбрать</button>
      
      
      </div>
    `;
  }

}