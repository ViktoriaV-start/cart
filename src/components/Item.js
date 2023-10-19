import { RETINA } from "@/config/constants";

export class Item {
  rendered = false;

  constructor(product) {
    this.productId           = product.id;
    this.productTitle        = product.title;
    this.productColor        = product.color ?? '';
    this.productSize         = product.size ?? '';
    this.productStock        = product.stock;
    this.productShop         = product.shop;
    this.productInStock      = product.inStock;
    this.productPrice        = product.price;
    this.productDiscount     = product.discount;
    this.productCurrentPrice = product.price - product.discount;
    this.productQuantity     = product.quantity;
    this.productImg          = RETINA ? '../img_retina/prod' + product.id + '.jpg' : '../img/prod' + product.id + '.jpg';
  }

  markUp() {
    this.rendered = true;
    return `
      <div>${this.productTitle}</div>
    `;
  }

}
