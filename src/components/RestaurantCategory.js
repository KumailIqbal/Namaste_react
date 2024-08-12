import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data, showItems, setShowIndex}) => {

    const handleClick = () => {
        setShowIndex();
    };
    return(
        <div>
            <div className="bg-gray-100 rounded-md shadow-lg w-6/12 my-6 mx-auto p-3">
            <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                <span className="font-bold">{data.title} ({data.itemCards.length})</span>
                <span>🔽</span>
            </div>
            {showItems && <ItemList items={data.itemCards}/>}
        </div>
        </div>
        
    )
}
export default RestaurantCategory;