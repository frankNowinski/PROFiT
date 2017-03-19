import React from 'react';

export default class TotalProfitView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todaysProfit: '',
      totalProfit: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setMyState(nextProps.stocks);
    }
  }

  componentWillMount() {
    this.setMyState(this.props.stocks);
  }

  setMyState(stocks) {
    let todaysProfits = [];
    let totalProfits  = [];

    stocks.map(stock => {
      // todays profit
      let currentPrice  = stock.getIn(['stock_data', 'LastTradePriceOnly']);
      let previousClose = stock.getIn(['stock_data', 'PreviousClose']);
      let daysProfit  = ((currentPrice - previousClose) * stock.get('shares'));
      todaysProfits.push(daysProfit);

      // total profit
      let purchasedPrice   = stock.get('purchased_price');
      let cumulativeProfit = ((currentPrice - purchasedPrice) * stock.get('shares'));
      totalProfits.push(cumulativeProfit);
    });

    let todaysProfit = this.computeProfit(todaysProfits);
    let totalProfit  = this.computeProfit(totalProfits);

    this.setState({ todaysProfit, totalProfit });
  }

  computeProfit(profits) {
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
