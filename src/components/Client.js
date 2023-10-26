import {ORDER_SELECTOR} from "@/config/constants";
import { Delivery } from "@/components/Delivery";
import { Payment } from "@/components/Payment";
import {Customer} from "@/components/Customer";


export class Client {
  orderContainer = document.querySelector(ORDER_SELECTOR);


  constructor(clientData, availableProducts, unavailableProducts) {
    this.availableProducts = availableProducts;
    this.unavailableProducts = unavailableProducts;
    this._render();


    this.delivery = new Delivery(this.availableProducts, this.unavailableProducts);
    this.payment = new Payment(clientData.creditCard);
    this.customer = new Customer(clientData);


  }

  _render() {
    this.orderContainer.insertAdjacentHTML('beforeend', this._markUp());

  }

  _markUp() {
      return `
        <section class="delivery"><div class="delivery__bg"></div></section>
        <section class="payment"><div class="payment__bg"></div></section>
        <section class="customer"><div class="customer__bg"></section>
      `;
  }

}

