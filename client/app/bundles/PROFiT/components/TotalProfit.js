import React from 'react';
import classnames from 'classnames';

export default class TotalProfit extends React.Component {
  state = {
    todaysProfit: '',
    totalProfit: ''
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props != nextProps) {
      this.writeToState(nextProps.stocks);
    }
  }

  componentWillMount = () => {
    this.writeToState(this.props.stocks);
  }

  writeToState = (stocks) => {
    let todaysProfits = [];
    let totalProfits  = [];

    stocks.map(stock => {
      let shares         = stock.get('shares');
      let currentPrice   = stock.getIn(['stock_data', 'LastTradePriceOnly']);
      let purchasedPrice = stock.get('purchased_price');
      let profit         = ((currentPrice - purchasedPrice) * shares);

      totalProfits.push(profit);
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

    return (
      <div>
        <br />
        <h2 className={classnames('returns-display', { 'positive': todaysProfit >= 0}, { 'negative': todaysProfit < 0 } )}>Todays Return: {todaysProfit}</h2>
        <br />
        <h2 className={classnames('returns-display', { 'positive': totalProfit >= 0}, { 'negative': totalProfit < 0 } )}>Total Return: {totalProfit}</h2>
      </div>
    )
  }
}

TotalProfit.propTypes = {
  stocks: React.PropTypes.object.isRequired
}
