import '@/styles/index.scss';
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Popup } from "@/components/Popup";


const header = new Header();
const cart = new Cart();
const footer = new Footer();
const popup = new Popup()

let retina = window.devicePixelRatio > 1;
