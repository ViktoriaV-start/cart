import '@/styles/index.scss';
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";

const header = new Header();
const cart = new Cart();
const footer = new Footer();

let retina = window.devicePixelRatio > 1;
console.log(retina);