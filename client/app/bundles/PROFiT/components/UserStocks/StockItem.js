import React from 'react';
import axios from 'axios';
import moment from 'moment';
import StockDataContainer from './StockData/Container';

export default class StockItem extends React.Component {
  state = { stockData: {} }

  getLastTradedPrice = () => {
    return this.props.stock.getIn(['stock_data', 'LastTradePriceOnly'])
  }

  getLastTradedTime = () => {
    return this.props.stock.getIn(['stock_data', 'LastTradeWithTime']).split('-')[0].trim();
  }

  getTodaysProfit = (lastTradedPrice, PreviousClose) => {
    let profit = (lastTradedPrice - PreviousClose) * this.props.stock.get('shares');
    return parseFloat(profit).toFixed(2)
  }

  formatUniqueId = (hashtag) => {
    const id = this.props.stock.toObject().id;
    return hashtag ? `#stock-container-${id}` : `stock-container-${id}`
  }

  render() {
    const { stock, editStock, removeStock } = this.props;
    const { ticker, shares, purchased_date, purchased_price } = stock.toObject()
    const { Ask, Name, PercentChange, PreviousClose, LastTradeDate} = stock.get('stock_data').toObject();
    const lastTradedPrice = this.getLastTradedPrice();
    const lastTradedTime = this.getLastTradedTime();
    const todaysProfit = this.getTodaysProfit(lastTradedPrice, PreviousClose);

    return (
      <div className="card card-outline-success text-center">
        <div className="card-header mb-0" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href={this.formatUniqueId(true)} aria-expanded="true" aria-controls={this.formatUniqueId()} >
          <div className="row">
            <div className="col-3">
              {Name}
            </div>

            <div className="col-3">
              {PercentChange}
            </div>

            <div className="col-3">
              ${lastTradedPrice} - <small className="text-muted">{lastTradedTime}</small>
            </div>

            <div className="col-3">
              ${todaysProfit} -  <small className="text-muted">{LastTradeDate}</small>
            </div>
          </div>
        </div>

         <div id={this.formatUniqueId()} className="collapse" role="tabpanel" aria-labelledby="headingOne">
          <div className="card-block">
            <StockDataContainer stock={stock} editStock={editStock} removeStock={removeStock} />
          </div>
        </div>
      </div>
    )
  }
}

StockItem.propTypes = {
  stock: React.PropTypes.object.isRequired,
  editStock: React.PropTypes.func.isRequired,
  removeStock: React.PropTypes.func.isRequired
}
