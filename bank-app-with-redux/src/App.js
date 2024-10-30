import { useSelector } from 'react-redux';
import './App.css';
import AccountOperation from './Features/Accounts/AccountOperation';
import BalanceDisplay from './Features/Accounts/BalanceDisplay';
import CreateCustomer from './Features/Customers/CreateCustomer';
import Customer from './Features/Customers/Customer';

function App() {

  const name = useSelector((store) => store.customer.fullName);

  return (
    <div>
      <b><h1> 🏢 The React-Redux Bank 💸 </h1></b>
      {
        !name ?
          (
            <CreateCustomer />
          )
          :
          <>
            <BalanceDisplay />
            <Customer />
            <AccountOperation />
          </>
      }
    </div>
  );
}

export default App;
