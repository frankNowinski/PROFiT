import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import classnames from 'classnames';
import parseCurrency from '../../utils/parseCurrency';
import calculateTotalReturn from '../../utils/calculateReturns';
import StockDataContainer from './stockData/Container';
import { fetchStockData } from '../../actions/stockActions';

class StockItem extends React.Component {
  state = {
    stock: this.props.stock
  }

  componentWillMount = () => {
    this.startPoll();
  }

  componentWillReceiveProps = (nextProps) => {
    clearTimeout(this.timeout);
    this.setState({ stock: nextProps.stock });
    this.startPoll();
  }

  componentWillUnmount= () => {
    clearTimeout(this.timeout);
  }

  startPoll = () => {
    const fetchStockData = this.props.fetchStockData;
    const { ticker, id } = this.state.stock.toJS();

    this.timeout = setTimeout(() => fetchStockData(ticker, id), 5000);
  }

  getTodaysProfit = (lastTradedPrice, PreviousClose) => {
    let profit = (lastTradedPrice - PreviousClose) * this.state.stock.get('shares');
    return parseFloat(profit).toFixed(2)
  }

  formatUniqueId = (hashtag) => {
    const id = this.state.stock.get('id');
    return hashtag ? `#stock-container-${id}` : `stock-container-${id}`
  }

  render() {
    const stock = this.state.stock;
    const fetchStockData = this.props.fetchStockData;
    const { ticker, shares, purchased_date, purchased_price, days_profit, stock_data } = this.state.stock.toJS();
    const { PercentChange, PreviousClose, LastTradePriceOnly, LastTradeDate, LastTradeTime } = stock_data;
    const todaysProfit = this.getTodaysProfit(LastTradePriceOnly, PreviousClose);
    const totalProfit  = calculateTotalReturn(stock.toJS());
    const cardOutlineColor  = days_profit >= 0 ? 'card-outline-success' : 'card-outline-danger';
    const textColor         = days_profit >= 0 ? 'card-header-col-positive' : 'card-header-col-negative';
    const priceTextColor    = days_profit >= 0 ? 'card-header-col-price-positive' : 'card-header-col-price-negative';
    const todaysProfitColor = days_profit >= 0 ? 'todays-profit-col-positive' : 'todays-profit-col-negative';

    return (
      <div className={classnames('card', 'text-center', cardOutlineColor)}>
        <div className="card-header mb-0 stock-item-header" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href={this.formatUniqueId(true)} aria-expanded="false" aria-controls={this.formatUniqueId()} >
          <div className="row stock-item-row">
            <div className={classnames('col-2', textColor)}>
              {ticker.toUpperCase()}
            </div>

            <div className={classnames('col-2', textColor)}>
              {PercentChange}
            </div>

            <div className={classnames('col-4', priceTextColor)}>
              <div className="row">
                <div className="col-6 price">${parseCurrency(LastTradePriceOnly)}</div>
                <div className="col-6 price">${parseCurrency(PreviousClose)}</div>
              </div>
              <div className="row">
                <div className="col-12"><small className="text-muted">Last traded on {LastTradeDate} at {LastTradeTime}</small></div>
              </div>
            </div>

            <div className={classnames('col-2', textColor)}>
              ${parseCurrency(todaysProfit)}
            </div>

            <div className={classnames('col-2', todaysProfitColor)}>
              ${parseCurrency(totalProfit)}
            </div>
          </div>
        </div>

         <div id={this.formatUniqueId()} className="collapse" role="tabpanel" aria-labelledby="headingOne">
          <StockDataContainer stock={stock} />
        </div>
      </div>
    )
  }
}

StockItem.propTypes = {
  stock: PropTypes.object.isRequired
}

export default connect(null, { fetchStockData })(StockItem);
