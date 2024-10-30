import { combineReducers, createStore } from "redux"

const rootReducer = combineReducers({
    a: accountReducer,
    b: customerReducer,
})
const store = createStore(rootReducer);

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    openAccount: true,
}

const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: '',

}
const accountReducer = (state = initialStateAccount, action) => {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
            }
        case "account/withdraw":
            return {
                ...state,
                balance: state.balance === 0 ? state.balance : state.balance - action.payload,
            }
        case "account/request":

            if (state.loan > 0) return state;

            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loanPurpose: action.payload.purpose,
                loan: action.payload.amount,
            }

        case "account/pay":
            return {
                ...state,
                loanPurpose: '',
                balance: state.balance - state.loan,
                loan: 0,
            }

        default:
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            }
        case "customer/updateName":
            return {
                ...state,
                fullName: action.payload,
            }
        default:
            return state
    }
}




// console.log(store.getState());

// store.dispatch({ type: "deposit", payload: 5000 });
// console.log(store.getState());

// store.dispatch({ type: "withdraw", payload: 2000 });
// console.log(store.getState());

// store.dispatch({
//     type: "request", payload:
//     {
//         amount: 5000,
//         purpose: "To buy a car",
//     }
// });
// console.log(store.getState());

// store.dispatch({ type: "pay" });
// console.log(store.getState());

//action creators

function deposit(amount) {
    return { type: "account/deposit", payload: amount }
}
function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}
function request(amount, purpose) {
    return {
        type: "account/request", payload:
        {
            amount,
            purpose,
        }
    }
}
function pay() {
    return { type: "account/pay" };
}

store.dispatch(deposit(5000));
console.log(store.getState());

store.dispatch(withdraw(2000));
console.log(store.getState());

store.dispatch(request(5000, "buy a house"));
console.log(store.getState());

store.dispatch(pay());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer", payload: {
            fullName, nationalID, createdAt: new Date().toISOString(),
        }
    }
}

function updateName(fullName) {
    return { type: "customer/updateName", payload: fullName, }
}

store.dispatch(createCustomer("Namrah Akram", 134));
console.log(store.getState());

store.dispatch(updateName("Namrah"));
console.log(store.getState());
