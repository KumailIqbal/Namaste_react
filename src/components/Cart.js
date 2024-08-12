import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";


const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearCart());
    }
    return(
        <div className="text-center m-2 p-2">
            <h1 className=" font-bold text-xl">Cart</h1>
            <div className="w-6/12 m-auto border-gray-300">
                <button onClick={handleClearCart} className="bg-black text-white m-2 p-2 rounded-lg">Clear Cart</button>
                {cartItems.length === 0 && <h1>Cart is empty. Add items to the cart.</h1>}
                <ItemList items={cartItems}/>
            </div>
        </div>
    )
};
export default Cart;