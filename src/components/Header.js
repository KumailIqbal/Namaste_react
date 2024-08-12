import { LOGO } from "../utils/constants";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
const [btnName, setBtnName] = useState("Login");

const onlineStatus = useOnlineStatus();

const { loggedInUser } = useContext(UserContext);

const cartItems = useSelector((store) => store.cart.items);


return (
    <div className="flex justify-between bg-pink-100 m-2 hover:bg-gray-300 ">
        <img alt="Company Logo" className="w-12" src={LOGO} />
        <div className="">
            <ul className="flex m-4 p-4 ">
                <li className="px-2">Online Status
                    {onlineStatus === true ? "🟢" : "🔴"}
                </li>
                <li className="px-2"><Link to="/">Home</Link></li>
                <li className="px-2"><Link to="/about">About Us</Link></li>
                <li className="px-2"><Link to="/contact">Contact</Link></li>
                <li className="px-2"><Link to="/cart">Cart - ({cartItems.length})</Link></li>
                <li className="px-2"><Link to = "/Grocery">Grocery</Link></li>
                <li>
                    <button className="Login" onClick={()=>{
                        return btnName==="Login" ? 
                        setBtnName("Logout") : 
                        setBtnName("Login");
                    }}>
                        {btnName}
                        </button>
                </li>
                <li className="px-2 font-bold">{loggedInUser}</li>  
            </ul>
        </div>
    </div>
)
}

export default Header;