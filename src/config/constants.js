export const ORDER = {
  client: {
    name: 'Константин',
    surname: 'Константинопольский',
    phone: '+7 988 123-45-67',
    email: 'kostya@gmail.com',
    inn: '1234567890',
    creditCard: '1234 12•• •••• 1234',
    address: 'Бишкек, улица Ахматбека Суюмбаева, 12/1'
  },
  available: [
    {
      id: 1,
      title: 'Футболка UZcotton мужская',
      manufacturer: '',
      color: 'белый',
      size: 56,
      stock: 'Коледино WB',
      shop: 'OOO Вайлдберриз',
      inStock: 2,
      price: 1051,
      discount: 529,
      quantity: 1
    },
    {
      id: 2,
      title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR,',
      manufacturer: 'MobiSafe',
      color: 'прозрачный',
      size: null,
      stock: 'Коледино WB',
      shop: 'OOO Мегапрофстиль',
      inStock: 5000,
      price: 11500,
      discount: 1000,
      quantity: 200
    },
    {
      id: 3,
      title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,',
      manufacturer: 'Faber-Castell',
      stock: 'Коледино WB',
      shop: 'OOO Вайлдберриз',
      inStock: 2,
      price: 475,
      discount: 228,
      quantity: 2
    }
  ],
  unavailable: [
    {
      id: 4,
      title: 'Футболка UZcotton мужская',
      manufacturer: '',
      color: 'белый',
      size: 56,
      stock: 'Коледино WB',
      shop: 'OOO Вайлдберриз',
      inStock: 0,
      price: 1051,
      discount: 529,
    },
    {
      id: 5,
      title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, ',
      manufacturer: 'MobiSafe',
      color: 'прозрачный',
      size: null,
      stock: 'Коледино WB',
      shop: 'OOO Мегапрофстиль',
      inStock: 0,
      price: 11500,
      discount: 1000,
    },
    {
      id: 6,
      title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,',
      manufacturer: 'Faber-Castell',
      stock: 'Коледино WB',
      shop: 'OOO Вайлдберриз',
      inStock: 0,
      price: 475,
      discount: 228,
    }
  ]
}

export const RETINA = window.devicePixelRatio > 1;
export const MAIN_SELECTOR = '.main';
export const HEADER_SELECTOR = '.header';
export const FOOTER_SELECTOR = '.footer';
export const INVOICE_SELECTOR = '.invoice';
export const POPUP_SELECTOR = '.popup';
export const ORDER_SELECTOR = '.order';
export const CART_AVAILABLE_SELECTOR = '.cart__available';
export const CART_UNAVAILABLE_SELECTOR = '.cart__unavailable';
export const PRODUCT_SELECTOR = '.product';
export const QUANTITY_SELECTOR = '.cart__num';
export const TOTAL_SELECTOR = '.total';
export const FULL_TOTAL_SELECTOR = '.cart__full';
export const ICON_FAVORITE_SELECTOR = 'cart__favorite';
export const ADD_CLASSNAME = 'cart__plus';
export const DELETE_ONE_CLASSNAME = 'cart__minus';
export const DELETE_CLASSNAME = 'delete';
export const DELETE_UNAVAILABLE_CLASSNAME = 'delete-unavailable';
export const DELIVERY_SELECTOR = '.delivery';
export const PAYMENT_SELECTOR = '.payment';
export const CUSTOMER_SELECTOR = '.customer';
export const QUANTITY = '.quantity';

export const ADDRESSES = {
  tabyshalieva: 'Бишкек, улица Табышалиева, 57',
  jukeeva: 'Бишкек, улица Жукеева-Пудовкина, 77/1',
  ahunbaeva: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
  default: "Бишкек, улица Ахматбека Суюмбаева, 12/1",
}

export const CARDS = {
  mir: "../cards/icon_pay.svg",
  visa: "../cards/icon_visa.svg",
  mastercard: "../cards/icon_mastercard.svg",
  maestro: "../cards/icon_maestro.svg"
}

export const CARDS_NUMBER = {
  mir: "1234 12•• •••• 1234",
  visa: "1234 78•• •••• 1234",
  mastercard: "1234 98•• •••• 7534",
  maestro: "1234 96•• •••• 6531"
}
