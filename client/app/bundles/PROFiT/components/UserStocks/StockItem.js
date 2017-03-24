import React from 'react';
import axios from 'axios';
import moment from 'moment';
import classnames from 'classnames';
import StockDataContainer from './StockData/Container';

export default class StockItem extends React.Component {
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
    const { Ask, Name, PercentChange, PreviousClose, LastTradeDate } = stock.get('stock_data').toObject();
    const lastTradedPrice = this.getLastTradedPrice();
    const lastTradedTime  = this.getLastTradedTime();
    const todaysProfit    = this.getTodaysProfit(lastTradedPrice, PreviousClose);
    const positive        = stock.get('days_profit') >= 0
    const negative        = stock.get('days_profit') < 0

    return (
      <div className={classnames('card', 'text-center', { 'card-outline-success': positive }, { 'card-outline-danger': negative })}>
        <div className="card-header mb-0" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href={this.formatUniqueId(true)} aria-expanded="false" aria-controls={this.formatUniqueId()} >
          <div className="row stock-item-row">
            <div className={classnames('col-2', 'card-header-col', { 'positive': positive }, { 'negative': negative } ) }>
              {ticker.toUpperCase()}
            </div>

            <div className={classnames('col-2', 'card-header-col', { 'positive': positive }, { 'negative': negative } ) }>
              {PercentChange}
            </div>

            <div className={classnames('col-4 card-header-col-price', { 'positive': positive }, { 'negative': negative } ) }>
              <div className="row">
                <div className="col-6 price">${lastTradedPrice}</div>
                <div className="col-6 price">${PreviousClose}</div>
              </div>
              <div className="row">
                <div className="col-12"><small className="text-muted">Last traded on {LastTradeDate} at {lastTradedTime}</small></div>
              </div>
            </div>

            <div className={classnames('col-2', 'card-header-col', { 'positive': positive }, { 'negative': negative } ) }>
              { shares }
            </div>

            <div className="col-2 todays-profit-col" className={classnames('col-2', 'todays-profit-col', 'todays-profit', { 'positive': positive }, { 'negative': negative } ) }>
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
