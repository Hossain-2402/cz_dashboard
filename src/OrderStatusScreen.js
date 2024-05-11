import "./OrderStatusScreen.css";
import {useState} from "react";
import db from "./firebase";
import firebase from "firebase/compat/app";

function OrderStatusScreen(){

	const [position,setPosition] = useState("-200vw");
	const [userOrder,setUserOrder] = useState([]);
	const [orderID,setOrderID] = useState("");
	const [orderStatus,setOrderStatus] = useState("");

	const showOrderStatusArea = (item)=>{

		if(orderID === ""){
			alert("Enter your order ID");
			return;
		}

	    db.collection('orders').onSnapshot(snapshot=>{
	      snapshot.docs.map(doc => {
	        if(doc.data().checkoutID === orderID){
	          const temp = doc.data().products;
	          setUserOrder(temp);
	          setOrderStatus("Your Order has been PLACED successfully , your order will be delivered within 7 days");
	        }
	        else{
	        	setUserOrder([{
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
	        	setOrderStatus("Your Order has been been DELIVERED");
	        }
	      })
	    })
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


			<div style={{ left: position }} className="order_area">
		        <div className="close_detail_Area_btn" onClick={()=>{hideOrderStatusArea()}} ><i class="fa fa-times" ></i> </div>
		        	<div className="order_status">{orderStatus}</div>
		             <div className="products_area">
				        {userOrder.map((item,index) =>{
				          return <div key={index} className="product">
				            <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="image"></div>
				            <div className="product_name">{item.product_name}</div>
				            <div className="price">{item.product_price}</div>
				          </div>
				        })}
			      </div>
			</div>


		</div>
		);
}

export default OrderStatusScreen;