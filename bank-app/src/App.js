import { useReducer } from 'react';
import './App.css';


const initialState = {
  balance: 0,
  loan: 0,
  openAccount: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return {
        ...state,
        balance: 500,
        openAccount: false,
      }
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      }
    case "request":

      if (state.loan > 0) return state;

      return {
        ...state,
        balance: state.balance + action.payload,
        loan: action.payload,
      }
    case "withdraw":
      return {
        ...state,
        balance: state.balance === 0 ? state.balance : state.balance - action.payload,
      }
    case "pay":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      }
    case "close":

      if (state.balance !== 0 || state.loan > 0) return state;
      return {
        ...initialState,
      }
    default:
      throw new Error("Invalid");
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { balance, loan, openAccount } = state;

  return (
    <div className='container'>
      <h1>Bank Account</h1>
      <p>Balance {balance}</p>
      <p>Loan {loan}</p>

      <p>
        <button disabled={!openAccount} onClick={() => dispatch({ type: "open" })}>Open Acount</button>
      </p>
      <p>
        <button disabled={openAccount} onClick={() => dispatch({ type: "deposit", payload: 150 })}>Deposit 150</button>
      </p>
      <p>
        <button disabled={openAccount} onClick={() => dispatch({ type: "withdraw", payload: 50 })}>Withdraw 50</button>
      </p>
      <p>
        <button disabled={openAccount} onClick={() => dispatch({ type: "request", payload: 5000 })}>Request a loan of 5000</button>
      </p>
      <p>
        <button disabled={openAccount} onClick={() => dispatch({ type: "pay", payload: true })}>pay Loan</button>
      </p>
      <p>
        <button disabled={openAccount} onClick={() => loan === 0 && balance === 0 && dispatch({ type: "close" })}>Close Account</button>
      </p>
    </div>
  );
}

export default App;
