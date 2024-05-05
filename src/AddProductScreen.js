import "./AddProductScreen.css";
import {useState,useEffect} from "react";
import db from "./firebase";
import firebase from "firebase/compat/app";

function AddProductScreen() {


  const [products,setProducts] = useState([]);
  const [positionOfInputArea,setPositionOfInputArea] = useState("-200vw");
  const [leadingImage,setLeadingImage] = useState("");

  useEffect(()=>{
    db.collection('products').orderBy("timestamp","desc").onSnapshot(snapshot=>{
      setProducts(snapshot.docs.map(doc => doc.data()));
    });
  },[]);


  const showInputArea = ()=>{
    setPositionOfInputArea("0vw");
  }

  const addNewProductToDB = ()=>{

    db.collection('products').add(
      {
        product_name : "Product Name",
        product_detail : " Product detail" ,
        leading_image : leadingImage,
        first_image : "first image",
        second_image : "second image",
        third_image : "third image",
        forth_image : "forth image",
        quantity : 1,
        sizes : "s",
        timestamp : firebase.firestore.FieldValue.serverTimestamp()
    }) ;
  }

  const hideInputArea = ()=>{
    setPositionOfInputArea("-200vw");
  }

  const deleteItem = (item) => {

    db.collection('products').onSnapshot(snapshot=>{
      snapshot.docs.map(doc => {
        if(doc.data().leading_image === item.leading_image){
          const temp = doc.ref;
          temp.delete();
        }
      })
    })

  };


  const handle_leading_image = (e)=>{
    setLeadingImage(e.target.value);
  }


  return (
    <div className="AddProductScreen">
      <div style={{ left: positionOfInputArea}}  className="new_product_input_area">
        <div className="close_input_Area_btn" onClick={()=>{hideInputArea()}}><i class="fa fa-times" ></i> </div>
        <input type="text" className="product_name_input" placeholder="Enter product name" />
        <input type="text" className="product_price_input" placeholder="Enter product price" />
        <input type="text" className="leading_image_input" placeholder="Enter leading Image Link" onChange={(e)=>{handle_leading_image(e)}} value={leadingImage} />
        <input type="text" className="first_image_input" placeholder="Enter FIRST Image Link" />
        <input type="text" className="second_image_input" placeholder="Enter SECOND Image Link" />
        <input type="text" className="third_image_input" placeholder="Enter THIRD Image Link" />
        <input type="text" className="forth_image_input" placeholder="Enter FORTH Image Link" />
        <textarea type="text" className="product_description_input" placeholder="Enter Image Desctiption"></textarea>
        <div className="add_product_btn" onClick={()=>{addNewProductToDB()}}>Add Product</div>
      </div>
      <div className="add_new_product_btn" onClick={()=>{showInputArea()}}>Add New Product</div>
      <div className="products_area">
        {products.map((item,index) =>{
          return <div key={index} className="product" >
            <div className="delete_product_btn" onClick={()=>{ deleteItem(item) }}><i class="fa fa-times" ></i> </div>
            <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="image"></div>
            <div className="product_name">Product Name</div>
            <div className="price">$55</div>
          </div>
        })}
      </div>
    </div>
  );
}

export default AddProductScreen;
