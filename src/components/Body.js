import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () =>{
const [listOfRestaurants, setListOfRestaurant] = useState([]);
const [searchText, setSearchText] = useState("");
const [filteredRestaurant, setFilteredRestaurant] = useState([]);


useEffect(()=>{
  fetchData();
},[]);

const fetchData =  async () =>{
  const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.87560&lng=80.91150&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  const json = await data.json();
  setListOfRestaurant(
    json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  setFilteredRestaurant(
    json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
}
const onlineStatus = useOnlineStatus();

if(onlineStatus === false){
  return <h1>You seems to be offline. Check your internet connection.</h1>
}

return (listOfRestaurants.length ===0) ? 
<Shimmer /> : 
(
        <>
        <div className="body">
        <div className="filter">
        <input data-testid="searchInput" className="mx-2 my-4 border border-solid border-black" 
        value={searchText} 
        onChange={(e)=>{
          setSearchText(e.target.value);
        }
        }></input>
        <button className="mx-4 my-2 w-20 h-8 bg-green-100 shadow-md rounded-lg"
        onClick={()=>{
          const filteredRestaurant =  listOfRestaurants.filter((res) => 
          res.info.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredRestaurant(filteredRestaurant);
        }}>Search</button>
          <button className="my-2 w-40 h-10 bg-red-100 shadow-md rounded-lg" onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.1
            );
              setFilteredRestaurant(filteredList);
            }}
          >Top Rated Restaurants</button>
        </div>
        <div className="flex flex-wrap">
          {filteredRestaurant.map((restaurant) => (
           <Link key={restaurant.info.id}
            to={"restaurants/"+restaurant.info.id}>
               <RestaurantCard  resData={restaurant}/></Link>
          ))}
        </div>
        </div>
        </>
    )
}

export default Body;