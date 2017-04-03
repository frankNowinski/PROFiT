import React from 'react';
import StockItem from './StockItem';

export default function UserStocks(props) {
  const stockList = () => {
    let sortedStocks = props.stocks.sortBy(stock => stock.get('days_profit')).reverse();

    return sortedStocks.map(stock => {
      return (
        <StockItem
          key={stock.get('id')}
          stock={stock}
          editStock={props.editStock}
          removeStock={props.removeStock} />
      )
    });
  }

  return (
    <div className="user-stocks-container">
      <div className="row text-center table-headers">
        <div className="col-2">Symbol</div>
        <div className="col-2">% Change</div>
        <div className="col-4">
          <div className="row">
            <div className="col-6">Price</div>
            <div className="col-6 text-left">Prev. Close</div>
          </div>
        </div>
        <div className="col-2 days-profit-header">Day's Profit</div>
        <div className="col-2">Total Profit</div>
      </div>
      <div id="accordion" role="tablist" aria-multiselectable="true">
        {stockList()}
      </div>
    </div>
  )
}

UserStocks.propTypes = {
  stocks: React.PropTypes.object.isRequired,
  editStock: React.PropTypes.func.isRequired,
  removeStock: React.PropTypes.func.isRequired
}
