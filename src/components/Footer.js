import { FOOTER_SELECTOR } from "@/config/constants";

export class Footer {

  headerContainer = document.querySelector(FOOTER_SELECTOR);

  constructor() {
    this._render();
    this._init();
  }

  _markUp() {
    return `
      <div class="footer__wrap">

        <div class="footer__copyright">&copy; 2022</div>
        <div class="footer__brand">ООО «Товары и точка»</div>
        
      </div>  
    `;
  }

  _render() {
    this.headerContainer.insertAdjacentHTML("afterbegin", this._markUp());
  }

  _init() {}
}
