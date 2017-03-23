import React from 'react';
import StockItem from './StockItem';

export default function UserStocks(props) {
  const stockList = () => {
    let list = props.stocks.sort(
      (a, b) => a.getIn(['stock_data', 'PercentChange']) > b.getIn(['stock_data', 'PercentChange'])
    )

    return list.map(stock => {
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
    <div>
      <div className="row text-center bold">
        <div className="col-3"><strong>Name</strong></div>
        <div className="col-3"><strong>Percent Change</strong></div>
        <div className="col-3"><strong>Price</strong></div>
        <div className="col-3"><strong>Days Profit</strong></div>
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

