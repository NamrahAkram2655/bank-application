import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanpurpose: '',
    openAccount: true,
    isLoading: false,
}

const AccountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {

        deposit(state, action) {
            state.balance = state.balance + action.payload;
            state.isLoading = false;
        },

        withdraw(state, action) {
            if (state.balance === 0) return;
            state.balance = state.balance - action.payload;
        },

        request:
        {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose },
                }
            },

            reducer(state, action) {
                if (state.loan > 0) return;
                state.balance = state.balance + action.payload.amount;
                state.loan = action.payload.amount;
                state.loanpurpose = action.payload.purpose;
            }
        },

        pay(state) {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanpurpose = '';
        },

        loading(state) {
            state.isLoading = true;
        }
    }
})

export const { withdraw, request, pay } = AccountSlice.actions;

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
            // dispatch({ type: "account/deposit", payload: 0 });
        }
    }
}

export default AccountSlice.reducer;
