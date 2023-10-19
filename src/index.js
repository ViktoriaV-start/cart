import '@/styles/index.scss';
import {Header} from "@/components/Header";
import {Cart} from "@/components/Cart";

const header = new Header();
const cart = new Cart();

let retina = window.devicePixelRatio > 1;
console.log(retina);