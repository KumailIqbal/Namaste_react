import { fireEvent, render, screen} from "@testing-library/react";
import Restaurants from "../Restaurants";
import Header from "../Header";
import Cart from "../Cart";
import { act } from "react-dom/test-utils";
import MOCK_DATA from "../mock/mockResMenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";


global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json: ()=>{
            return Promise.resolve(MOCK_DATA);
        },
    });
});

it("should render restaurant menu component ",async ()=>{
    await act(async ()=> 
    render(<Restaurants />));

    const accordianHeader = screen.getByText("Veg Pizza (14)");
    expect(accordianHeader).toBeInTheDocument();
});

it("should render the cart items as 0 ",async ()=>{
    await act(async ()=> 
    render(
    <>
    <BrowserRouter>
    <Provider store={appStore}>
    <Header />
    <Restaurants />
    </Provider>
    </BrowserRouter>
    </>
));
expect(screen.getByText("Cart - (0)")).toBeInTheDocument();
});

it("should render all the items on expanding the accordion ",
async ()=>{
    await act(async ()=> 
    render(
    <>
    <BrowserRouter>
    <Provider store={appStore}>
    <Header />
    <Restaurants />
    </Provider>
    </BrowserRouter>
    </>
));
const accordianHeader = screen.getByText("Veg Pizza (14)");
fireEvent.click(accordianHeader);
const items = screen.getAllByTestId("foodItems");
expect(items.length).toBe(14);
});

it("should render the cart items as 1 on adding 1 item to the cart ",
async ()=>{
    await act(async ()=> 
    render(
    <>
    <BrowserRouter>
    <Provider store={appStore}>
    <Header />
    <Restaurants />
    <Cart />
    </Provider>
    </BrowserRouter>
    </>
));
const accordianHeader = screen.getByText("Veg Pizza (14)");
fireEvent.click(accordianHeader);
const addButton = screen.getAllByRole("button", {name: "Add +"});
fireEvent.click(addButton[0]);
expect(screen.getByText("Cart - (1)")).toBeInTheDocument();

expect(screen.getAllByTestId("foodItems").length).toBe(15);
});

it("should render 2 items in cart and clear the cart on clicking Clear Cart",
async ()=>{
    await act(async ()=> 
    render(
    <>
    <BrowserRouter>
    <Provider store={appStore}>
    <Header />
    <Restaurants />
    <Cart />
    </Provider>
    </BrowserRouter>
    </>
));
const accordianHeader = screen.getByText("Veg Pizza (14)");
fireEvent.click(accordianHeader);
const addButton = screen.getAllByRole("button", {name: "Add +"});
fireEvent.click(addButton[0]);
expect(screen.getByText("Cart - (2)")).toBeInTheDocument();

expect(screen.getAllByTestId("foodItems").length).toBe(16);

const clearCartButton = screen.getByRole("button", { name: "Clear Cart"});
fireEvent.click(clearCartButton);
expect(screen.getAllByTestId("foodItems").length).toBe(14);
expect(screen.getByText("Cart is empty. Add items to the cart.")).toBeInTheDocument();
});
