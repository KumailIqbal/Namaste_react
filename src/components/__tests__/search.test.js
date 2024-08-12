import { fireEvent, render,screen  } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../mock/mockResList.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(()=>{
    return Promise.resolve({
            json: ()=> {
                return Promise.resolve(MOCK_DATA);
            },
        });
});

it("should render the body component with a search box and search the text pizza",
async ()=>{
    
    await act(async () =>
         render(<BrowserRouter><Body /></BrowserRouter>));

    const button = screen.getByRole("button", { name: "Search"});
    expect(button).toBeInTheDocument();

    const searchText = screen.getByTestId("searchInput");
    
    fireEvent.change(searchText, {target : { value : "pizza"}});
    fireEvent.click(button);

    const cards = screen.findAllByTestId("resCard");
    expect((await cards).length).toBe(3);
});

it("should render the top rated restaurants only",
async ()=>{
    
    await act(async () =>
         render(<BrowserRouter><Body /></BrowserRouter>));

    const cardsBeforeFilter = screen.getAllByTestId("resCard");

    const topRatedButton = screen.getByRole("button", { name: "Top Rated Restaurants"});
    expect(cardsBeforeFilter.length).toBe(9);

    fireEvent.click(topRatedButton);

    const cardsAfterFilter = screen.getAllByTestId("resCard");
    expect(cardsAfterFilter.length).toBe(7);


});