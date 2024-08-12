import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const Restaunrants = () => {

    
    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(null);
  
    if(resInfo === null ) return <Shimmer />

    const {name, cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;
    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    
    
    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );


    
    return (
        <div className="m-6 text-center">
            <h1 className="m-4 font-bold text-xl">{name}</h1>
            <h3 className="font-bold ">{cuisines.join(", ")} - {costForTwoMessage}</h3>

            {categories.map((category,index) => 
                <RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card}
                showItems = {index === showIndex ? true : false}
                setShowIndex={()=>{setShowIndex(index)}}
                />
                )
                }
        </div>
    )
}
export default Restaunrants;