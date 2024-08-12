import RestaurantCard from "../RestaurantCard";
import { screen, render } from "@testing-library/react";
import MOCK from "../mock/restaurantCardMock.json";
import "@testing-library/jest-dom";


it("should render the name of the restaurant", ()=>{
    render(<RestaurantCard resData={MOCK}/>);

    const name = screen.getByText("Pizza Hut");
    expect(name).toBeInTheDocument();
})