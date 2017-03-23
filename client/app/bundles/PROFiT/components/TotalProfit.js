import React from 'react';

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
    return (
      <div>
        Todays Return: {this.state.todaysProfit}
        <br />
        Total Return: {this.state.totalProfit}
      </div>
    )
  }
}

TotalProfit.propTypes = {
  stocks: React.PropTypes.object.isRequired
}
