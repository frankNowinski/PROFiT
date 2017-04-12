import React from 'react';
import PropTypes from 'prop-types';
import EditStockForm from '../../forms/EditStockForm';
import RemoveStock from '../../forms/RemoveStock';
import classnames from 'classnames';
import parseCurrency from '../../../utils/parseCurrency';
import moment from 'moment';

export default class StockDataContainer extends React.Component {
  state = {
    removeStockForm: false,
    editStockForm: false
  }

  handleRemoveStock = () => {
    this.setState({ removeStockForm: true });
  }

  handleEditStock = () => {
    this.setState({ editStockForm: true });
  }

  closePrompt = (prompt) => {
    if (prompt == 'removeStockForm') {
      this.setState({ removeStockForm: false });
    } else if (prompt === 'editStockForm') {
      this.setState({ editStockForm: false });
    }
  }

  calculateTotalReturn = (currentPrice) => {
    const { shares, purchased_price }= this.props.stock.toJS();
    let total = (currentPrice - purchased_price) * shares;

    return parseFloat(total).toFixed(2);
  }

  stockDataRow = (key, value, currency=true) => {
    if (value === null) return;

    return (
      <div className="row">
        <span className="col-7 text-left lead">{key}:</span>
        <span className="col-5 pull-right text-right lead">{currency ? '$' : ''}{parseCurrency(value)}</span>
      </div>
    )
  }

  stockDataView = () => {
    const stock = this.props.stock;
    const {
      DaysHigh,
      DaysLow,
      EarningsShare,
      FiftydayMovingAverage,
      TwoHundreddayMovingAverage,
      Name,
      OneyrTargetPrice,
      Open,
      PERatio,
      Volume,
      AverageDailyVolume,
      YearHigh,
      YearLow,
      LastTradePriceOnly
    } = stock.get('stock_data').toJS();
    const purchased_date = moment(stock.get('purchased_date')).format('MM/DD/YYYY');
    const totalReturn = this.calculateTotalReturn(LastTradePriceOnly);

    return (
      <div>
        <h2 className="card-header">{Name}</h2>

        <div className="row card-text stock-data-container">
          <div className="col-5">
            {this.stockDataRow('Open', Open)}
            {this.stockDataRow('Days High', DaysHigh)}
            {this.stockDataRow('Days Low', DaysLow)}
            {this.stockDataRow('Earnings Per Share', EarningsShare)}
            {this.stockDataRow('50 Day Moving Avg', FiftydayMovingAverage)}
            {this.stockDataRow('200 Day Moving Avg', TwoHundreddayMovingAverage)}
            {this.stockDataRow('Price Per Earning', PERatio)}
          </div>
          <div className="col-5 text-left stock-data-card-second-column">
            {this.stockDataRow('Shares', stock.get('shares'), false)}
            <div className="row">
              <span className="col-7 text-left lead">Purchased Date:</span>
              <span className="col-5 pull-right text-right lead">{purchased_date}</span>
            </div>
            {this.stockDataRow('Year High', YearHigh)}
            {this.stockDataRow('Year Low', YearLow)}
            {this.stockDataRow('One Year Target', OneyrTargetPrice)}
            {this.stockDataRow('Volume', Volume, false)}
            {this.stockDataRow('Avg Daily Volume', AverageDailyVolume, false)}
          </div>
          <div className="col-2">
            <div><button className='btn btn-outline-primary stock-edit-btn btn-block' onClick={this.handleEditStock}>Edit</button></div>
            <div><button className='btn btn-outline-danger btn-block' onClick={this.handleRemoveStock}>Remove</button></div>
          </div>
        </div>
      </div>
    )
  }

  renderStockDataView = () => {
    const { editStockForm, removeStockForm } = this.state;
    const { stock, editStock, removeStock } = this.props;

    if (editStockForm) {
      return (
        <EditStockForm stock={stock}
                       editStock={editStock}
                       closePrompt={this.closePrompt} />
      )
    } else if (removeStockForm) {
      return (
        <RemoveStock stock={stock}
                     removeStock={removeStock}
                     closePrompt={this.closePrompt} />
      )
    } else {
      return this.stockDataView();
    }
  }

  render() {
    const cardColor = this.props.stock.get('days_profit') >= 0 ? 'card-block-positive' : 'card-block-negative';

    return (
      <div className={classnames(cardColor)}>
        {this.renderStockDataView()}
      </div>
    )
  }
}

StockDataContainer.propTypes = {
  stock: PropTypes.object.isRequired
}
