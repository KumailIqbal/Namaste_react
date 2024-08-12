import { fireEvent, render, screen} from "@testing-library/react"
import { Provider } from "react-redux";
import Header from "../Header";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


it("should render header component with a login button", ()=>{
    render(
    <BrowserRouter>
    <Provider store={appStore}>
    <Header/>
    </Provider>
    </BrowserRouter>
);
const button = screen.getByRole("button");
expect(button).toBeInTheDocument();

});

it("should render header component with cart items", ()=>{
    render(
    <BrowserRouter>
    <Provider store={appStore}>
    <Header/>
    </Provider>
    </BrowserRouter>
);
const cartItems = screen.getByText(/Cart/);
expect(cartItems).toBeInTheDocument();

});

it("should toggle the login/logout button onClick", ()=>{
    render(
    <BrowserRouter>
    <Provider store={appStore}>
    <Header/>
    </Provider>
    </BrowserRouter>
);
const loginButton = screen.getByRole("button", {name: "Login"});
expect(loginButton).toBeInTheDocument();

fireEvent.click(loginButton);

const logoutButton = screen.getByRole("button", {name: "Logout"});
expect(logoutButton).toBeInTheDocument();

});