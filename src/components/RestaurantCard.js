import { CDN_LINK } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    console.log(resData);
    const {deliveryTime} = resData.info.sla;
    const {name, cuisines, avgRating,costForTwo} = resData.info;
    return (
        <>
        <div data-testid="resCard" className="m-4 p-4 w-[200] bg-gray-100 hover:bg-gray-300 rounded-lg shadow-lg">
            <img alt="logo" className="rounded-lg" src={CDN_LINK+resData.info.cloudinaryImageId} />
            <h3 className="mt-3 font-bold text-lg">{name}</h3>
            <h4>{(cuisines).join(", ")}</h4>
            <h4>{avgRating}</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
        </>
    )
}
export default RestaurantCard;