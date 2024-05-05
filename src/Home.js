import './Home.css';
import {useState,useEffect} from "react";
import db from "./firebase";
import firebase from "firebase/compat/app";
import {useSelector,useDispatch} from "react-redux";
import {add_to_cart_action} from "./redux_file"

function Home() {


  const [products,setProducts] = useState([]);
  const [positionOfDetailArea,setPositionOfDetailArea] = useState("-200vw");
  const [tempNewItemForCart,setTempNewItemForCart] = useState();
  const [tempLeadingImage,setTempLeadingImage] = useState("https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/438216908_990245046437412_764419811823206966_n.jpg?stp=cp6_dst-jpg&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4kFdMbs7jXwAb6jmRp9&_nc_ht=scontent.fdac41-1.fna&oh=00_AfBc9w3xDgUjGjP9zpoY-cri1zMj7RcFkrXVFmzdB7R3OQ&oe=6636DC71");
  const items = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    db.collection('products').orderBy("timestamp","desc").onSnapshot(snapshot=>{
      setProducts(snapshot.docs.map(doc => doc.data()));
    });
  },[]);


  const showDetailArea = (item)=>{
    setPositionOfDetailArea("0vw");
    setTempLeadingImage(item.leading_image);
    setTempNewItemForCart(item);
  }
  const hideDetailArea = ()=>{
    setPositionOfDetailArea("-200vw");
  }
  const addItemToCart = ()=>{
  
  let alreadyAdded = false;
  for(let i=0;i<items.length;i++){
    if(items[i].leading_image === tempNewItemForCart.leading_image){
      alreadyAdded = true;
      break;
    }
    else{
      continue;
    }
  }
  if(!alreadyAdded) {
    dispatch(add_to_cart_action(tempNewItemForCart))
  }

}




  return (
    <div className="Home">
      <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      <link rel="styleSheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

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
          <div className="add_to_cart_btn" onClick={()=>{addItemToCart()}}>Add to cart</div>
        </div>
      </div>

      <div className="header">
        <div className="header_text">Medium length section heading goes here  </div>
        <div className="sub_header_text">The term business refers to an organization or enterprising entity engaged in commercial, industrial, or professional activities. The purpose of a business is to organize some sort of economic production of goods or services. Businesses can be for-profit entities or non-profit organizations fulfilling a charitable mission or furthering a social cause. Businesses range in scale and scope from sole proprietorships to large, international corporations. </div>
        <div className="cart_btn" >Cart</div>
      </div>

      <div className="products_area">
        {products.map((item,index) =>{
          return <div key={index} className="product" onClick={()=>{showDetailArea(item)}}>
            <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="image"></div>
            <div className="product_name">Product Name</div>
            <div className="price">$55</div>
          </div>
        })}
      </div>

      <div className="footer">
          <div className="footer_header">
            <div className="gap"></div>
            <div className="logo_a">Logo </div>
            <div className="nev"></div>
            <div className="socials">
              <a href="https://www.google.com/" className="facebook_btn">Facebook</a>
              <a href="https://www.google.com/" className="instagram_btn">Instagram</a>
              <a href="https://www.google.com/" className="twitter_btn">Twitter</a>
              <a href="https://www.google.com/" className="thread_btn">Thread</a>
            </div>
          </div>
            <div className="line"></div>
            <div className="copyright">© 2024 CZ. All rights reserved.</div>
        </div>

    </div>
  );
}

export default Home;