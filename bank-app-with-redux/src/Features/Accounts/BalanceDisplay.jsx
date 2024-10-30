import React from 'react'
import { useSelector } from 'react-redux'

const BalanceDisplay = () => {

  const balance = useSelector(store => store.account.balance);

  return (
    <div className='balance'>
      <h1>${balance.toFixed(2)}</h1>
      {/* <h2>$ {balance}</h2> */}
    </div>
  )
}


export default BalanceDisplay


// function mapStateToProps(state) {
//   return {
//     balance: state.account.balance,
//   }
// }
// export default connect(mapStateToProps)(BalanceDisplay);


