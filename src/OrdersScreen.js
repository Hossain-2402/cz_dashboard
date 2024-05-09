import "./OrdersScreen.css";
import {useState,useEffect} from "react";
import db from "./firebase";

function OrdersScreen(){

	const [orders,setOrders] = useState([]);

	const [tempItems,setTempItems] = useState([]);



	useEffect(()=>{
		db.collection('orders').orderBy("timestamp","desc").onSnapshot(snapshot=>{
		  setOrders(snapshot.docs.map(doc => doc.data()));
		  setTempItems(snapshot.docs.map(doc=>doc.data().products));
		});
	},[]);


  const deleteOrder = (order) => {
    db.collection('orders').onSnapshot(snapshot=>{
      snapshot.docs.map(doc => {
        if(doc.data().checkoutID === order.checkoutID){
          const temp = doc.ref;
          temp.delete();
        }
      })
    })

  };




	return (
		<div className="OrdersScreen">
			<div className="OrdersArea">
		        {orders.map((order,index) =>{
		        return (
			       	<div key={index} className="order">
			            <div className="delete_product_btn" onClick={()=>{deleteOrder(order)}}><i class="fa fa-times" ></i> </div>
				       	<div className="productsArea">
				       		{order.products.map((product,id)=>{
				       			 return <div key={index} className="Product">
						            <div style={{ backgroundImage: "url("+product.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="Image"></div>
						            <div className="Product_size">Size : {product.sizes}</div>
						            <div className="Product_quantity">Quantity :{product.quantity}</div>
						          </div>
				       		})}
			       		</div>
			       		<div className="customerInfo">
				       		<div className="name_of_customer">Customer Name : {order.customerName}</div>
				       		<div className="number_of_customer">Customer Number : {order.customerNumber}</div>
				       		<div className="mail_of_customer">Customer E-mail : {order.customerEmail}</div>
				       		<div className="location_of_customer">Customer location :<pre> {order.customerLocation}</pre></div>
			       		</div>
			        </div>)
		        })}
			</div>
		</div>
	);
}

export default OrdersScreen;