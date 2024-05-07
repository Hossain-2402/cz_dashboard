import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart.js";
import AddProductScreen from "./AddProductScreen.js";
import {useState} from "react";

function App() {


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
      <div className="menu_btn" onClick={()=>{showMenuArea()}}><i class="fa fa-bars"></i></div>
      <Link to="/" className="logo"><b>LOGO</b></Link>
      <div  style={{ opacity: opacityOfGreyArea, height:heightOfGreyArea}} className="grey_background"></div>
      <div className="menu_btn" onClick={()=>{showMenuArea()}}><i class="fa fa-bars"></i></div>
      <Link to="/cart" className="cart_in_top">Cart</Link>
       <nav style={{ left: menuAreaPos}} className="nev_area" >
          <div className="close_menu_btn" onClick={()=>{hideMenuArea()}}><i class="fa fa-times" ></i> </div>
          <Link to="/" className="home">
            Home
          </Link>
          <Link to="/add_a-new_product" className="about_us">
            Production
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/add_a-new_product" element={<AddProductScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
