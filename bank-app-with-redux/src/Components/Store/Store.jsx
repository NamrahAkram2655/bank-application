import customerReducer from "../../Features/Customers/CustomerSlice";
import accountReducer from "../../Features/Accounts/AccountSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        account : accountReducer,
        customer : customerReducer,
    }
})
// const rootReducer = combineReducers({
//     account: accountReducer,
//     customer: customerReducer,
// })

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

