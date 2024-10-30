

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanpurpose: '',
    openAccount: true,
    isLoading: false,
}

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false,
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
                loanpurpose: action.payload.purpose,
                loan: action.payload.amount,
            }

        case "account/pay":
            return {
                ...state,
                loanpurpose: '',
                balance: state.balance - state.loan,
                loan: 0,
            }

        case "loading":
            return {
                ...state,
                isLoading: true,
            }

        default:
            return state;
    }
}

export function deposit(amount, currency) {

    if (currency === "USD") return { type: "account/deposit", payload: amount };

    return async function (dispatch, getState) {

        dispatch({ type: "loading" });

        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
            const data = await res.json();

            if (data.rates && data.rates.USD) {
                const converted = data.rates.USD;
                dispatch({ type: "account/deposit", payload: converted });
            } 
        } catch (error) {
           
            console.error("Failed to fetch conversion rate", error);
            dispatch({ type: "account/deposit", payload: 0 }); // You can set an appropriate fallback action
        }
    }
}

export function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}
export function request(amount, purpose) {
    return {
        type: "account/request", payload:
        {
            amount,
            purpose,
        }
    }
}
export function pay() {
    return { type: "account/pay" };
}

