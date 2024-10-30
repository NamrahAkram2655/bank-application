import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createCustomer } from './CustomerSlice';

const CreateCustomer = () => {

    const [customerName, setCustomerName] = useState("");
    const [nationalIDValue, setnationalIdValue] = useState("");

    const dispatch = useDispatch();

    const customerCreateHandler = () => {
        if (!customerName || !nationalIDValue) return;
        dispatch(createCustomer(customerName, nationalIDValue));
    }

    return (
        <div>

            <h2>Create New Customer</h2>
            <div className='customerdata'>


                <div>

                    <label htmlFor="">Customer Full Name : </label>

                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

                </div>

                <div>

                    <label htmlFor="">National ID </label>

                    <input type="text" value={nationalIDValue} onChange={(e) => setnationalIdValue(e.target.value)} />

                </div>

                <button onClick={customerCreateHandler}>Create New Customer</button>

            </div>
        </div>
    )
}

export default CreateCustomer
