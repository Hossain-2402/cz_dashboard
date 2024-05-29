import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart.js";
import OrderStatusScreen from "./OrderStatusScreen.js";
import OrdersScreen from "./OrdersScreen.js"
import AboutUsScreen from "./AboutUsScreen.js"
import {useSelector,useDispatch} from "react-redux";
import {useState} from "react";

function App() {

const numberOfItemsInCart = useSelector(state => state.number_of_items);


const [menuAreaPos,setMenuAreaPos] = useState("-100%");
const [ opacityOfGreyArea,setOpacityOfGreyArea] = useState("0");
const [ heightOfGreyArea,setHeightOfGreyArea] = useState("0");

const showMenuArea = ()=>{
  setMenuAreaPos("0%");
  setOpacityOfGreyArea("1")
  setHeightOfGreyArea("200vh")
}
const hideMenuArea = ()=>{
  setMenuAreaPos("-100%");
  setOpacityOfGreyArea("0")
  setHeightOfGreyArea("0")
}

  return (
    <div className="App">
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
      <link rel="styleSheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      <BrowserRouter>
      <div className="menu_btn" onClick={()=>{showMenuArea()}}><i class="fa fa-bars"></i>  </div>
      <Link to="/" className="logo"></Link>
      <div  style={{ opacity: opacityOfGreyArea, height:heightOfGreyArea}} className="grey_background"></div>
      <div className="menu_btn" onClick={()=>{showMenuArea()}}><i class="fa fa-bars"></i></div>
      <Link to="/cart" className="cart_in_top">Cart
        {numberOfItemsInCart > 0 ? <div className="number_of_items_in_cart">{numberOfItemsInCart}</div> : <div></div>}
      </Link>
       <nav style={{ left: menuAreaPos}} className="nev_area" >
          <div className="close_menu_btn" onClick={()=>{hideMenuArea()}}> X </div>
          <Link to="/" onClick={()=>{ hideMenuArea() }} className="home">
            Home
          </Link>
          <Link to="/order_status" onClick={()=>{ hideMenuArea() }} className="order_status_area_btn">
            Order Status
          </Link>
          <Link to="/about_us" onClick={()=>{ hideMenuArea() }} className="about_us">
            About Us
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/order_status" element={<OrderStatusScreen/>} />
          <Route path="/about_us" element={<AboutUsScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
