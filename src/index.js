import '@/styles/index.scss';
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Popup } from "@/components/Popup";


const footer = new Footer();
const cart = new Cart();
const popup = new Popup()

let retina = window.devicePixelRatio > 1;
