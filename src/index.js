import '@/styles/index.scss';
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Popup } from "@/components/Popup";


const header = new Header();
const footer = new Footer();
const cart = new Cart();
const popup = new Popup()

let retina = window.devicePixelRatio > 1;
