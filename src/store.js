import { createStore } from "redux";
import cart_reducer from "./redux_file";

const store = createStore(cart_reducer);

export default store;