import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import parseCurrency from '../../utils/parseCurrency';
import calculateTotalReturn from '../../utils/calculations/totalReturn';
import calculateTodaysReturn from '../../utils/calculations/todaysReturn';
import StockDataContainer from './stockData/Container';

export default function StockItem(props) {
  const stock = props.stock;
  const { ticker, shares, purchased_date, purchased_price, stock_data } = stock.toJS();
  const { PercentChange, PreviousClose, LastTradePriceOnly, LastTradeDate, LastTradeTime } = stock_data;
  const totalProfit       = calculateTotalReturn(stock.toJS());
  const todaysProfit      = calculateTodaysReturn(stock.toJS());
  const cardOutlineColor  = todaysProfit >= 0 ? 'card-outline-success' : 'card-outline-danger';
  const textColor         = todaysProfit >= 0 ? 'card-header-col-positive' : 'card-header-col-negative';
  const priceTextColor    = todaysProfit >= 0 ? 'card-header-col-price-positive' : 'card-header-col-price-negative';
  const todaysProfitColor = todaysProfit >= 0 ? 'todays-profit-col-positive' : 'todays-profit-col-negative';

  const formatUniqueId = (hashtag) => {
    const id = stock.get('id');
    return hashtag ? `#stock-container-${id}` : `stock-container-${id}`
  }

  return (
    <div className={classnames('card', 'text-center', cardOutlineColor)}>
      <div className="card-header mb-0 stock-item-header" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href={formatUniqueId(true)} aria-expanded="false" aria-controls={formatUniqueId()} >
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

       <div id={formatUniqueId()} className="collapse" role="tabpanel" aria-labelledby="headingOne">
        <StockDataContainer stock={stock} />
      </div>
    </div>
  )
}

StockItem.propTypes = {
  stock: PropTypes.object.isRequired
}
