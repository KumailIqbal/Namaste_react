import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice";

const ItemList = ({ items }) => {
    const dispatch = useDispatch();

    const handleCart = (item) => {
        dispatch(addItems(item));
    }
    return (
        <div>
            {
                items.map((item) =>(
                    <div data-testid="foodItems" key={item.card.info.id}
                        className="m-2 py-2 text-left border-gray-300 border-b-2">
                        <div className="text-s flex justify-between">
                            <div className="">
                            <span>{item.card.info.name} - </span>
                            <span>₹{item.card.info.price ? item.card.info.price/100 : item.card.info.defaultPrice/100}</span>
                            </div>
                            <button onClick={() => handleCart(item)} className="bg-black shadow-lg text-white px-2 rounded-lg ">
                                Add +
                                </button>
                        </div>
                        <p className="text-xs">
                        {item.card.info.description}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}
export default ItemList;