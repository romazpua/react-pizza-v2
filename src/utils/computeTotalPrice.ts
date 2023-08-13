import {CartItem} from "../redux/cart/types";


export const computeTotalPrice = (items: CartItem[]) => {
    return items.reduce((total, obj) => total + obj.price * obj.count, 0)
}