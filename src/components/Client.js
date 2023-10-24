import {ORDER_SELECTOR} from "@/config/constants";
import {Delivery} from "@/components/Delivery";


export class Client {
  orderContainer = document.querySelector(ORDER_SELECTOR);


  constructor(client) {
    this.name = client.name;
    this.surname =  client.surname;
    this.phone = client.phone;
    this.email = client.email;
    this.inn = client.inn;
    this.creditCard = client.creditCard;
    this.address = client.address;

    this._render();

    this.delivery = new Delivery();


  }

  x() {
    this.address = 'xxx';
  }

  _render() {
    this.orderContainer.insertAdjacentHTML('beforeend', this._markUp());

  }

  _markUp() {
      return `
        <section class="delivery"><div class="delivery__bg"></div> </section>
        <section class="payment"></section>
        <section class="client"></section>
      `;
  }

}

