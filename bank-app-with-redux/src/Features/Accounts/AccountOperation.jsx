import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deposit, pay, request, withdraw } from './AccountSlice';

const AccountOperation = () => {

    const [depositValue, setDepositValue] = useState('');
    const [withdrawValue, setwithdrawValue] = useState('');
    const [requestloan, setRequestLoan] = useState('');
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");

    const { loan: currentLoan, loanpurpose: reason, isLoading, } = useSelector(store => store.account);

    const dispatch = useDispatch();

    const depositHandler = () => {
        if (!depositValue) return;
        dispatch(deposit(depositValue, currency));
        setDepositValue("");
        setCurrency("USD");
    }

    const withdrawHandler = () => {
        if (!withdrawValue) return;
        dispatch(withdraw(withdrawValue));
        setwithdrawValue("");
    }
    const requestLoanHandler = () => {
        if (!requestloan || !loanPurpose) return;
        dispatch(request(requestloan, loanPurpose));
        setRequestLoan("");
        setLoanPurpose("");
    }

    const payLoanHandler = () => {
        dispatch(pay());
    }

    return (

        <div className='accountdata'>

            <div className='deposit'>

                <label>Deposit</label>

                <input type="number" value={depositValue} onChange={(e) => setDepositValue(Number(e.target.value))} />

                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">US Dollar</option>
                    <option value="EUR">Euro</option>
                    <option value="GBP">British Pound</option>
                </select>

                <button onClick={depositHandler}>{isLoading ? "Converting " : "Deposit"}</button>

            </div>

            <div>

                <label htmlFor="">Withdraw</label>

                <input type="text" value={withdrawValue} onChange={(e) => setwithdrawValue(Number(e.target.value))} />

                <button onClick={withdrawHandler}>Withdraw</button>

            </div>

            <div>

                <label htmlFor="">Request Loan</label>

                <input type="number" value={requestloan} onChange={(e) => setRequestLoan(Number(e.target.value))} />

                <label htmlFor="">Loan Purpose</label>

                <input type="text" value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)} />

                <button onClick={requestLoanHandler}>Request Loan</button>

            </div>

            <div>

                {currentLoan > 0 &&
                    <>
                        <label htmlFor="">Pay Loan {currentLoan} That you take for {reason}</label>

                        <button onClick={payLoanHandler}>Pay</button>
                    </>
                }

            </div>

        </div>
    )
}


export default AccountOperation
