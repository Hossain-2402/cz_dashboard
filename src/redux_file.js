const cart = {
	number_of_items : 0,
	products : []
};


const ADD_TO_CART = "ADD_TO_CART";

const INCREASE_NUMBER = "INCREASE_NUMBER";



const add_to_cart_action = (product)=>{
	return {
		type: ADD_TO_CART,
		payload : product
	}
}

const increase_number = ()=>{
	return {
		type:INCREASE_NUMBER
	}
}


const cart_reducer = (state = cart, action)=>{
	if(action.type === ADD_TO_CART){
		return {
			...state,
			products : [action.payload,...state.products]
		}
	}
	if(action.type === INCREASE_NUMBER){
		return {
			...state,
			number_of_items : state.number_of_items + 1
		}
	}
	else{
		return state;
	}
}


export {add_to_cart_action,increase_number};
export default cart_reducer;