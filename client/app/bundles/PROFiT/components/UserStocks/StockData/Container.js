import React from 'react';
import RemoveStock from './RemoveStock';
import EditStockForm from '../../Forms/EditStockForm';
import classnames from 'classnames';
import parseCurrency from '../../../utils/parseCurrency';
import moment from 'moment';

export default class StockDataContainer extends React.Component {
  state = {
    removeStockPrompt: false,
    editStockForm: false
  }

  handleRemoveStock = () => {
    this.setState({ removeStockPrompt: true });
  }

  handleEditStock = () => {
    this.setState({ editStockForm: true });
  }

  closePrompt = (prompt) => {
    if (prompt == 'removeStockPrompt') {
      this.setState({ removeStockPrompt: false });
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
    const { stock, alreadyOwned } = this.props;
    const { DaysHigh, DaysLow, EarningsShare, FiftydayMovingAverage, TwoHundreddayMovingAverage, Name, OneyrTargetPrice, Open, PERatio, Volume, AverageDailyVolume, YearHigh, YearLow, LastTradePriceOnly } = stock.get('stock_data').toJS();
    const purchased_date = moment(stock.get('purchased_date')).format('MM/DD/YYYY');
    const totalReturn = this.calculateTotalReturn(LastTradePriceOnly);

    return (
      <div className="container">
        <div><h2>{Name}</h2></div>
        <hr />

        <div className="row">
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
            <div className="row">
              <span className="col-7 text-left lead">Purchased Date:</span>
              <span className="col-5 pull-right text-right lead">{purchased_date}</span>
            </div>
            {this.stockDataRow('Total Return', totalReturn)}
            {this.stockDataRow('Year High', YearHigh)}
            {this.stockDataRow('Year Low', YearLow)}
            {this.stockDataRow('One Year Target', OneyrTargetPrice)}
            {this.stockDataRow('Volume', Volume, false)}
            {this.stockDataRow('Avg Daily Volume', AverageDailyVolume, false)}
          </div>
          <div className="col-2">
            <br />
            <div><button className='btn btn-outline-primary' onClick={this.handleEditStock}>Edit Stock</button></div><br />

            <button type="button" className="close text-left remove-stock" onClick={this.handleRemoveStock} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderStockDataView = () => {
    const { stock, editStock, removeStock } = this.props;

    if (this.state.editStockForm) {
      return (
        <EditStockForm stock={stock}
                       editStock={editStock}
                       closePrompt={this.closePrompt} />
      )
    } else if (this.state.removeStockPrompt) {
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
  stock: React.PropTypes.object.isRequired,
  editStock: React.PropTypes.func.isRequired,
  removeStock: React.PropTypes.func.isRequired
}
