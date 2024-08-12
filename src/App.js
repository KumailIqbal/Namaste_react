import React , { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About"
import Contact from "./components/Contact"
import { createBrowserRouter,RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import Restaunrants from "./components/Restaurants";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

const Grocery = lazy(()=> import("./components/Grocery"));



const AppLayout = () => {
    const [userName, setUserName] = useState();

useEffect(()=>{

    const data ={
        name: "Kumail Iqbal"
    };

    setUserName(data.name);
},[]);

    return (
        <>
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser: userName}}>
        <div className="app">
            <Header />
            <Outlet />
        </div>
        </UserContext.Provider>
        </Provider>
        </>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/Grocery",
                element: <Suspense fallback={<h1>LOADING....</h1>}> 
                <Grocery /> 
                </Suspense>
            },
            {
                path: "/restaurants/:resId",
                element: <Restaunrants />
            }
        ],
        errorElement: <Error />
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<RouterProvider router={appRouter} />);