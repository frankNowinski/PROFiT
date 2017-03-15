import React from 'react';
import StockItem from './StockItem';

export default function UserStocks(props) {
  const stockList = () => {
    return props.stocks.map(stocks => {
      return <StockItem key={stocks} stock={stocks} />
    });
  }

  return (
    <div id="accordion" role="tablist" aria-multiselectable="true">
      {stockList()}
    </div>
  )
}
