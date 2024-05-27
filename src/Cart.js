import "./Cart.css";
import {useSelector} from "react-redux";
import {useState} from "react";
import firebase from "firebase/compat/app";
import db from "./firebase";
import { v4 as uuidv4 } from 'uuid';

function Cart() {

  const items = useSelector(state => state.products);

  const [positionOfDetailArea,setPositionOfDetailArea] = useState("-200vw");
  const [positionOfCustomerInfoArea,setPositionOfCustomerInfoArea] = useState("-200vw");
  const [tempLeadingImage,setTempLeadingImage] = useState("https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/438216908_990245046437412_764419811823206966_n.jpg?stp=cp6_dst-jpg&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4kFdMbs7jXwAb6jmRp9&_nc_ht=scontent.fdac41-1.fna&oh=00_AfBc9w3xDgUjGjP9zpoY-cri1zMj7RcFkrXVFmzdB7R3OQ&oe=6636DC71");
  const [tempIndex,setTempIndex] = useState();  
  const [tempQuantity,setTempQuantity] = useState(1);
  const [tempSize,setTempSize] = useState("");


  const [customerName,setCustomerName] = useState("");
  const [customerLocation,setCustomerLocation] = useState("");
  const [customerNumber,setCustomerNumber] = useState("");
  const [customerEmail,setCustomerEmail] = useState("");

  const [positionOfThis,setPositionOfThis] = useState(0);
  const [checkoutId,setCheckoutId] = useState("");

  const [currentItem,setCurrentItem] = useState({
        product_name : "Product Name",
        product_price : "55",
        product_detail : " Product detail" ,
        leading_image : "Some Image",
        first_image : "first image",
        second_image : "second image",
        third_image : "third image",
        forth_image : "forth image",
        quantity : 1,
        sizes : "S",
        timestamp : firebase.firestore.FieldValue.serverTimestamp()});




  const showDetailArea = (item,index)=>{
    setPositionOfDetailArea("0vw");
    setTempLeadingImage(item.leading_image);
    setTempIndex(index);
    setTempQuantity(item.quantity);
    setTempSize(item.sizes);
    setCurrentItem(item)
  }
  const hideDetailArea = ()=>{
    setPositionOfDetailArea("-200vw");
  }
  const increaseQuantity = ()=>{
    let a = tempQuantity;
    setTempQuantity(a+1);
    items[tempIndex].quantity = items[tempIndex].quantity + 1;
  }
  const decreaseQuantity = ()=>{
    let a = tempQuantity;
    if(tempQuantity > 0){
      setTempQuantity(a-1);
      items[tempIndex].quantity = items[tempIndex].quantity - 1;

    }
  }
  const showDetailInfoArea = ()=>{
    setPositionOfCustomerInfoArea("0vw");
  }

  const hideCustomerInfoArea = ()=>{
    setPositionOfCustomerInfoArea("-200vw");
  }


  const handle_customer_name = (e)=>{
    setCustomerName(e.target.value);
  }

  const handle_customer_location = (e)=>{
    setCustomerLocation(e.target.value);
  }

  const handle_customer_number = (e)=>{
    setCustomerNumber(e.target.value);
  }

  const handle_customer_email = (e)=>{
    setCustomerEmail(e.target.value);
  }


  const smallSize = ()=>{
    items[tempIndex].sizes = "S";
    setTempSize("S");
  }
  const mediumSize = ()=>{
    items[tempIndex].sizes = "M";
    setTempSize("M");
  }
  const largeSize = ()=>{
    items[tempIndex].sizes = "L";
    setTempSize("L");
  }
  const xlSize = ()=>{
    items[tempIndex].sizes = "XL";
    setTempSize("XL");
  }



  const showLeadingImage_leading = (image)=>{
    setTempLeadingImage(image);
  }

  const showLeadingImage_first = (image)=>{
    setTempLeadingImage(image);
  }

  const showLeadingImage_second = (image)=>{
    setTempLeadingImage(image);
  }

  const showLeadingImage_third = (image)=>{
    setTempLeadingImage(image);
  }

  const showLeadingImage_forth = (image)=>{
    setTempLeadingImage(image);
  }
  const placeAnOrder = ()=>{
    if(customerName === "" || customerLocation === "" || customerNumber === "" || customerEmail === ""){
      alert("Fillup the form first");
    }
    else{

      const tempUniqueId = uuidv4();
      setCheckoutId(tempUniqueId);
      db.collection('orders').add({ 
        products: items,
        customerName: customerName,
        customerLocation : customerLocation,
        customerNumber : customerNumber,
        customerEmail : customerEmail,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        checkoutID : tempUniqueId

      });
      setCustomerName("");
      setCustomerLocation("");
      setCustomerEmail("");
      setCustomerNumber("");
      setPositionOfThis(1);
    }
  }


  return (
    <div className="Cart">

      <div style={{ left: positionOfDetailArea}} className="detail_of_product_area">
        <div className="close_detail_Area_btn" onClick={()=>{hideDetailArea()}}><i class="fa fa-times" ></i> </div>
        <div  className="detail_image_area">
          <div style={{ backgroundImage: "url("+tempLeadingImage+")",backgroundRepeat: "no-repeat",backgroundPosition : 'center center'}} className="leading_image"></div>
          <div className="secondary_image">
            <div style={{ backgroundImage: "url("+currentItem.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : 'cover',backgroundPosition : 'center center'}} className="first_image" onClick={()=>{showLeadingImage_leading(currentItem.leading_image)}}></div>
            <div style={{ backgroundImage: "url("+currentItem.first_image+")",backgroundRepeat : 'no-repeat',backgroundSize : 'cover',backgroundPosition : 'center center'}} className="second_image" onClick={()=>{showLeadingImage_first(currentItem.first_image)}}></div>
            <div style={{ backgroundImage: "url("+currentItem.second_image+")",backgroundRepeat : 'no-repeat',backgroundSize : 'cover',backgroundPosition : 'center center'}} className="third_image" onClick={()=>{showLeadingImage_second(currentItem.second_image)}}></div>
            <div style={{ backgroundImage: "url("+currentItem.third_image+")",backgroundRepeat : 'no-repeat',backgroundSize : 'cover',backgroundPosition : 'center center'}} className="forth_image" onClick={()=>{showLeadingImage_third(currentItem.third_image)}}></div>
            <div style={{ backgroundImage: "url("+currentItem.forth_image+")",backgroundRepeat : 'no-repeat',backgroundSize : 'cover',backgroundPosition : 'center center'}} className="fifth_image" onClick={()=>{showLeadingImage_forth(currentItem.forth_image)}}></div>
          </div></div>
        <div className="detail_info_area">
          <div className="detail_product_name">{currentItem.product_name}</div>
          <div className="detail_price">৳ {currentItem.product_price}</div>
          <pre className="detail_info">{currentItem.product_detail}</pre>
          <div className="sizes_header_text">Your Size : {tempSize}</div>
          <div className="sizes_area">
            <div className="small_size_btn" onClick={()=>{smallSize()}}>S</div>
            <div className="medium_size_btn" onClick={()=>{mediumSize()}}>M</div>
            <div className="large_size_btn" onClick={()=>{largeSize()}}>L</div>
            <div className="xl_size_btn" onClick={()=>{xlSize()}}>XL</div>
          </div>

          {/*<div className="quantity_header_text">Quantity</div>*/}
          <div className="quantity_area">
            <div className="decrease_auantity_btn" onClick={()=>{decreaseQuantity()}}>-</div>
            <div className="quantity">{tempQuantity}</div>
            <div className="increase_auantity_btn" onClick={()=>{increaseQuantity()}}>+</div>
          </div>
          <div className="gap"></div>
        </div>
      </div>
      {items.length === 0 ? <div className="no_item_display_area">Cart is empty</div> :
      <div>
        <div className="products_area">
          {items.map((item,index) =>{
            return <div key={index} className="product" onClick={()=>{showDetailArea(item,index)}}>
              <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="image"></div>
              <div className="product_name">{item.product_name}</div>
              <div className="price">৳ {item.product_price}</div>
            </div>
          })}
        </div>
        <div className="checkout_btn" onClick={()=>{showDetailInfoArea()}}>Checkout</div>
        <div className="gap_at_end"></div>
        <div style={{ left: positionOfCustomerInfoArea}} className="customer_info_area">
          <div className="customer_info_header">Customer Informations : </div>
          <div className="close_customer_info_Area_btn" onClick={()=>{hideCustomerInfoArea()}}><i class="fa fa-times" ></i></div>
          <input type="text" placeholder="Your Name " className="customer_name" onChange={(e)=>{handle_customer_name(e)}} value={customerName}/>
          <textarea type="text" placeholder="Your Location" className="customer_location" onChange={(e)=>{handle_customer_location(e)}} value={customerLocation}></textarea >
          <input type="number" placeholder="Your Number " className="customer_number" onChange={(e)=>{handle_customer_number(e)}} value={customerNumber}/>
          <input type="email" placeholder="Your Email " className="customer_email" onChange={(e)=>{handle_customer_email(e)}} value={customerEmail}/>
          <div className="confirm_order_btn" onClick={()=>{placeAnOrder()}}>Confirm Oder</div>
          <div style={{opacity : positionOfThis}} className="checkoutId">Your Id is : {checkoutId}</div>
          <div style={{opacity : positionOfThis}} className="note">Remember This id and go to "Order Status" from "Menu" to see status of your order</div>
        </div>
      </div>
      }

    </div>
  );
}

export default Cart;