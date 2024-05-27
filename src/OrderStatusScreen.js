import "./OrderStatusScreen.css";
import {useState} from "react";
import db from "./firebase";
import firebase from "firebase/compat/app";

function OrderStatusScreen(){

	const [position,setPosition] = useState("-200vw");
	const [userOrder,setUserOrder] = useState([{
			        product_name : "",
			        product_price : "",
			        product_detail : "" ,
			        leading_image : "",
			        first_image : "",
			        second_image : "",
			        third_image : "",
			        forth_image : "",
			        quantity : 1,
			        sizes : "",
			        timestamp : firebase.firestore.FieldValue.serverTimestamp()
	        	}]);
	const [orderID,setOrderID] = useState("");
	const [orderStatus,setOrderStatus] = useState("");
	const [orderFound,setOrderFound] = useState();

	const showOrderStatusArea = (item)=>{


		if(orderID === ""){
			alert("Enter your order ID");
			return;
		}

	    db.collection('orders').onSnapshot(snapshot=>{
	      snapshot.docs.map(doc => {
	        if(doc.data().checkoutID === orderID){
	        	setOrderFound(true);
	          const temp = doc.data().products;
	          setUserOrder(temp);
	          setOrderStatus("Your Order has been PLACED successfully , your order will be delivered within 7 days. In sha allah");
	        }
	      })

	    })
	      console.log(orderFound);
      if(orderFound != true) {console.log(orderFound); setOrderFound(false) ; setOrderStatus("Your Order has been been DELIVERED")}
		setPosition("0");
		setOrderID("");
	}
	const hideOrderStatusArea = ()=>{
		setPosition("-200vw");
	}


	const handle_orderID = (e)=>{
		setOrderID(e.target.value);
	}

	return (
		<div className="OrderStatusScreen">
		<link href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap" rel="stylesheet"/>
			<input type="text" placeholder="Enter your Order ID" className="order_status_input"  onChange={(e)=>{handle_orderID(e)}} value={orderID}/>
			<div className="order_status_btn" onClick={()=>{showOrderStatusArea()}}>See Status</div> 


    	{orderFound? 
			<div style={{ left: position }} className="order_area">
		        <div className="close_detail_Area_btn" onClick={()=>{hideOrderStatusArea()}} ><i class="fa fa-times" ></i> </div>
		             <div className="products_area">
			        	<div className="order_status">{orderStatus}</div>
				        {userOrder.map((item,index) =>{
				          return <div key={index} className="product">
				            <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="image"></div>
				            <div className="product_name">{item.product_name}</div>
				            <div className="price">৳ {item.product_price}</div>
				          </div>
				        })}
			      	</div>
			</div>
        	:
			<div className="order_status">{orderStatus}</div>
		}


		</div>
		);
}

export default OrderStatusScreen;

// 49afd1dd-5134-40b6-b11f-7105e1d4fab5