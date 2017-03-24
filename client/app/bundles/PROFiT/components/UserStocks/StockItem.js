import React from 'react';
import axios from 'axios';
import moment from 'moment';
import classnames from 'classnames';
import StockDataContainer from './StockData/Container';

export default class StockItem extends React.Component {
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
    const { PercentChange, PreviousClose, LastTradePriceOnly, LastTradeDate, LastTradeTime } = stock.get('stock_data').toObject();
    const todaysProfit = this.getTodaysProfit(LastTradePriceOnly, PreviousClose);
    const cardOutlineColor  = stock.get('days_profit') >= 0 ? 'card-outline-success' : 'card-outline-danger';
    const textColor         = stock.get('days_profit') >= 0 ? 'card-header-col-positive' : 'card-header-col-negative';
    const priceTextColor    = stock.get('days_profit') >= 0 ? 'card-header-col-price-positive' : 'card-header-col-price-negative';
    const todaysProfitColor = stock.get('days_profit') >= 0 ? 'todays-profit-col-positive' : 'todays-profit-col-negative';

    return (
      <div className={classnames('card', 'text-center', cardOutlineColor)}>
        <div className="card-header mb-0" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href={this.formatUniqueId(true)} aria-expanded="false" aria-controls={this.formatUniqueId()} >
          <div className="row stock-item-row">
            <div className={classnames('col-2', textColor)}>
              {ticker.toUpperCase()}
            </div>

            <div className={classnames('col-2', textColor)}>
              {PercentChange}
            </div>

            <div className={classnames('col-4', priceTextColor)}>
              <div className="row">
                <div className="col-6 price">${LastTradePriceOnly}</div>
                <div className="col-6 price">${PreviousClose}</div>
              </div>
              <div className="row">
                <div className="col-12"><small className="text-muted">Last traded on {LastTradeDate} at {LastTradeTime}</small></div>
              </div>
            </div>

            <div className={classnames('col-2', textColor)}>
              { shares }
            </div>

            <div className={classnames('col-2', todaysProfitColor)}>
              ${todaysProfit}
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
