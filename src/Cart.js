import {useSelector} from "react-redux";
import {add_to_cart_action} from "./redux_file";
import "./Cart.css";
import {useState} from "react";

function Cart() {

  const items = useSelector(state => state.products);

  const [positionOfDetailArea,setPositionOfDetailArea] = useState("-200vw");
  const [tempLeadingImage,setTempLeadingImage] = useState("https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/438216908_990245046437412_764419811823206966_n.jpg?stp=cp6_dst-jpg&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4kFdMbs7jXwAb6jmRp9&_nc_ht=scontent.fdac41-1.fna&oh=00_AfBc9w3xDgUjGjP9zpoY-cri1zMj7RcFkrXVFmzdB7R3OQ&oe=6636DC71");



  const showDetailArea = (item)=>{
    setPositionOfDetailArea("0vw");
    setTempLeadingImage(item.leading_image);
  }
  const hideDetailArea = ()=>{
    setPositionOfDetailArea("-200vw");
  }


  return (
    <div className="Cart">

      <div style={{ left: positionOfDetailArea}} className="detail_of_product_area">
        <div className="close_detail_Area_btn" onClick={()=>{hideDetailArea()}}><i class="fa fa-times" ></i> </div>
        <div  className="detail_image_area">
          <div style={{ backgroundImage: "url("+tempLeadingImage+")",backgroundRepeat : 'no-repeat',backgroundSize : '50%',backgroundPosition : 'center center'}} className="leading_image"></div>
          <div className="secondary_image">
            <div className="first_image"></div>
            <div className="second_image"></div>
            <div className="third_image"></div>
            <div className="forth_image"></div>
          </div>
        </div>
        <div className="detail_info_area">
          <div className="detail_product_name">Product Name</div>
          <div className="detail_price">$55</div>
          <div className="detail_info">The term business refers to an organization or enterprising entity engaged in commercial, 
              industrial, or professional activities. The purpose of a business is to organize some sort of economic production 
              of goods or services. Businesses can be for-profit entities or non-profit organizations fulfilling a charitable mission or
              furthering a social cause. Businesses range in scale and scope from sole proprietorships to large, international corporations.The term business refers to an organization or enterprising entity engaged in commercial, 
              industrial, or professional activities. The purpose of a business is to organize some sort of economic production 
              of goods or services. Businesses can be for-profit entities or non-profit organizations fulfilling a charitable mission or
              furthering a social cause. Businesses range in scale and scope from sole proprietorships to large, international corporations.The term business refers to an organization or enterprising entity engaged in commercial, 
              industrial, or professional activities. The purpose of a business is to organize some sort of economic production 
              of goods or services. Businesses can be for-profit entities or non-profit organizations fulfilling a charitable mission or
              furthering a social cause. Businesses range in scale and scope from sole proprietorships to large, international corporations.


              furthering a social cause. Businesses range in scale and scope from sole proprietorships to large, international corporations.The term business refers to an organization or enterprising entity engaged in commercial, 
              industrial, or professional activities. The purpose of a business is to organize some sort of economic production 
              of goods or services. Businesses can be for-profit entities or non-profit organizations fulfilling a charitable mission or
              furthering a social cause. Businesses range in scale and scope from sole proprietorships to large, international corporations.
          </div>
          <input type="text" className="sizes" placeholder="Enter your measurements"/>          
          {/*<div className="add_to_cart_btn" onClick={()=>{addItemToCart()}}>Add to cart</div>*/}
        </div>
      </div>
      {items.length === 0 ? <div className="no_item_display_area">Cart is empty</div> :
        <div className="products_area">
          {items.map((item,index) =>{
            return <div key={index} className="product" onClick={()=>{showDetailArea(item)}}>
              <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="image"></div>
              <div className="product_name">Product Name</div>
              <div className="price">$55</div>
            </div>
          })}
        </div>

      }

    </div>
  );
}

export default Cart;
