import {computeTotalPrice} from "./computeTotalPrice";
import {CartItem} from "../redux/cart/types";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = computeTotalPrice(items)
    return {
        items: items as CartItem[],
        totalPrice
    }

}