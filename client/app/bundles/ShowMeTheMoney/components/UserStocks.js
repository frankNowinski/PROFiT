import React from 'react';
import StockItem from './StockItem';

export default function UserStocks(props) {
  const stockList = () => {
    return props.stocks.map(stocks => {
      return <StockItem key={stocks} stock={stocks} />
    });
  }

  return (
    <div>
      <div className="row text-center bold">
        <div className="col-2"><strong>Name</strong></div>
        <div className="col-4"><strong>Percent Change</strong></div>
        <div className="col-3"><strong>Price</strong></div>
        <div className="col-3"><strong>Days Profit</strong></div>
      </div>
      <div id="accordion" role="tablist" aria-multiselectable="true">
        {stockList()}
      </div>
    </div>
  )
}
