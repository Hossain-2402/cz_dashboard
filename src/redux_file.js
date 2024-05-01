const cart = {
	products : []
};


const ADD_TO_CART = "ADD_TO_CART";



const add_to_cart_action = (product)=>{
	return {
		type: ADD_TO_CART,
		payload : product
	}
}

const cart_reducer = (state = cart, action)=>{
	if(action.type === ADD_TO_CART){
		return {
			...state,
			products : [...state.products,action.payload]
		}
	}
	else{
		return state;
	}
}


export {add_to_cart_action};
export default cart_reducer;