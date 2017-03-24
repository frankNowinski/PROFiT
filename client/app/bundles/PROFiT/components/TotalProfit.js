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
    const todaysTextColor = todaysProfit >= 0 ? 'returns-display-positive' : 'returns-display-negative';
    const totalTextColor  = totalProfit >= 0 ? 'returns-display-positive' : 'returns-display-negative';

    return (
      <div>
        <br />
        <div className={classnames('row', todaysTextColor)}>
          <div className="col-8">
            <h2>Todays Return: </h2>
          </div>
          <div className="col-4 pull-right">
            <h2>${todaysProfit}</h2>
          </div>
        </div>

        <br />

        <div className={classnames('row', todaysTextColor)}>
          <div className="col-8">
            <h2>Total Return: </h2>
          </div>
          <div className="col-4 pull-right">
            <h2>${totalProfit}</h2>
          </div>
        </div>

      </div>
    )
  }
}

TotalProfit.propTypes = {
  stocks: React.PropTypes.object.isRequired
}
