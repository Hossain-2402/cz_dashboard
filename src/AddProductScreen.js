import "./AddProductScreen.css";
import {useState,useEffect} from "react";
import db from "./firebase";
import firebase from "firebase/compat/app";

function AddProductScreen() {


  const [products,setProducts] = useState([]);
  const [positionOfInputArea,setPositionOfInputArea] = useState("-200vw");
  const [leadingImage,setLeadingImage] = useState("");
  const [firstImage,setFirstImage] = useState("");
  const [secondImage,setSecondImage] = useState("");
  const [thirdImage,setThirdImage] = useState("");
  const [forthImage,setForthImage] = useState("");
  const [productDetail,setProductDetail] = useState("");

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
        product_price : "55",
        product_detail :productDetail,
        leading_image : leadingImage,
        first_image : firstImage,
        second_image : secondImage,
        third_image : thirdImage,
        forth_image : forthImage,
        quantity : 1,
        sizes : "S",
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


  const handle_product_detail = (e)=>{
    setProductDetail(e.target.value);
  }
  const handle_first_image = (e)=>{
    setFirstImage(e.target.value);
  }
  const handle_second_image = (e)=>{
    setSecondImage(e.target.value);
  }
  const handle_third_image = (e)=>{
    setThirdImage(e.target.value);
  }
  const handle_forth_image = (e)=>{
    setForthImage(e.target.value);
  }


  return (
    <div className="AddProductScreen">
      <div style={{ left: positionOfInputArea}}  className="new_product_input_area">
        <div className="close_input_Area_btn" onClick={()=>{hideInputArea()}}><i class="fa fa-times" ></i> </div>
        <div className="input_image_area">
          <input type="text" className="leading_image_input" placeholder="Leading Image " onChange={(e)=>{handle_leading_image(e)}} value={leadingImage} />
          <div className="four_images">
            <input type="text" className="first_image_input" placeholder="FIRST Image " onChange={(e)=>{handle_first_image(e)}} value={firstImage} />
            <input type="text" className="second_image_input" placeholder="SECOND Image " onChange={(e)=>{handle_second_image(e)}} value={secondImage} />
            <input type="text" className="third_image_input" placeholder="THIRD Image " onChange={(e)=>{handle_third_image(e)}} value={thirdImage} />
            <input type="text" className="forth_image_input" placeholder="FORTH Image " onChange={(e)=>{handle_forth_image(e)}} value={forthImage} />
          </div>
        </div>
        <input type="text" className="product_name_input" placeholder="Enter product name" />
        <input type="text" className="product_price_input" placeholder="Enter product price" />
        <textarea type="text" className="product_description_input" placeholder="Enter Image Desctiption" onChange={(e)=>{handle_product_detail(e)}} value={productDetail}> </textarea>
        <div className="add_product_btn" onClick={()=>{addNewProductToDB()}}>Add Product</div>
      </div>
      <div className="add_new_product_btn" onClick={()=>{showInputArea()}}>Add New Product</div>
      <div className="products_area">
        {products.map((item,index) =>{
          return <div key={index} className="product" >
            <div className="delete_product_btn" onClick={()=>{ deleteItem(item) }}><i class="fa fa-times" ></i> </div>
            <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="image"></div>
            <div className="product_name">{item.product_name}</div>
            <div className="price">৳ {item.product_price}</div>
          </div>
        })}
      </div>
    </div>
  );
}

export default AddProductScreen;
