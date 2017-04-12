import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import parseCurrency from '../utils/parseCurrency';
import calculateTotalReturn from '../utils/calculateReturns';

export default class TotalProfit extends React.Component {
  state = {
    stocks: this.props.stocks,
    todaysProfit: '',
    totalProfit: ''
  }

  componentWillReceiveProps = (nextProps) => {
    this.writePropsToState(nextProps.stocks);
  }

  componentWillMount = () => {
    this.writePropsToState(this.state.stocks);
  }

  writePropsToState = (stocks) => {
    let todaysProfits = [];
    let totalProfits  = [];

    stocks.map(stock => {
      let total = calculateTotalReturn(stock.toJS());

      totalProfits.push(total);
      todaysProfits.push(stock.get('days_profit'));
    });

    let todaysProfit = this.computeProfit(todaysProfits);
    let totalProfit  = this.computeProfit(totalProfits);

    this.setState({ todaysProfit, totalProfit });
  }

  computeProfit = (profits) => {
    let profit = profits.reduce((a, b) => a + b, 0);
    return parseFloat(profit).toFixed(2);
  }

  render() {
    const { todaysProfit, totalProfit } = this.state;
    const todaysTextColor = todaysProfit >= 0 ? 'returns-display-positive' : 'returns-display-negative';
    const totalTextColor  = totalProfit >= 0 ? 'returns-display-positive' : 'returns-display-negative';

    return (
      <div>
        <br />
        <div className='card returns-card text-center'>
          <h3 className="card-header total-card-header">Today's Return</h3>
          <div className={classnames('value', todaysTextColor)}>${parseCurrency(todaysProfit)}</div>
        </div>
        <br />

        <div className='card returns-card text-center'>
          <h3 className="card-header total-card-header">Total Return</h3>
          <div className={classnames('value', totalTextColor)}>${parseCurrency(totalProfit)}</div>
        </div>
      </div>
    )
  }
}

TotalProfit.propTypes = {
  stocks: PropTypes.object.isRequired
}
