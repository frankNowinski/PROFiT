import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StockItem from './StockItem';
import { fetchStockData } from '../../actions/stockActions';
import Immutable from 'immutable';

class UserStocks extends React.Component {
  state = { stocks: this.props.stocks }

  componentWillMount = () => {
    this.tickers = this.getTickers(this.props.stocks);
    this.seconds = 3000;
    this.startPoll();
  }

  componentWillReceiveProps = (nextProps) => {
    let diffProps    = !Immutable.is(this.state.stocks, nextProps.stocks);
    let propsChanged = nextProps.stocks.size != this.state.stocks.size || diffProps;

    clearTimeout(this.timeout);

    if (propsChanged) {
      this.seconds = 3000;
      this.setState({ stocks: nextProps.stocks });
    }
    else {
      this.seconds *= 2;
    }

    this.tickers = this.getTickers(nextProps.stocks);
    this.startPoll();
  }

  componentWillUnmount= () => {
    clearTimeout(this.timeout);
  }

  getTickers = (stocks) => {
    const allTickers = stocks.toJS().map(stock => [stock.ticker, stock.ticker]);
    return [].concat.apply([], allTickers);
  }

  startPoll = () => {
    const fetchStockData = this.props.fetchStockData;

    if (this.tickers.length > 0) {
      this.timeout = setTimeout(() => fetchStockData(this.tickers), this.seconds);
    }
  }

  stockList = () => {
    let sortedStocks = this.state.stocks.sortBy(stock => stock.get('days_profit')).reverse();

    return sortedStocks.map(stock => {
      return (
        <StockItem key={stock.get('id')} stock={stock} />
      )
    });
  }

  render() {
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
          {this.stockList()}
        </div>
      </div>
    )
  }

}

UserStocks.propTypes = {
  stocks: PropTypes.object.isRequired
}

export default connect(null, { fetchStockData })(UserStocks);
