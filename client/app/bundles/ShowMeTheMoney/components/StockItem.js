import React from 'react';
import axios from 'axios';
import moment from 'moment';

export default class StockItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { stockData: {} }

    this.formatUniqueId = this.formatUniqueId.bind(this);
  }

  getLastTradedPrice() {
    return this.props.stock.getIn(['stock_data', 'LastTradeWithTime']).split('-')[1].trim().replace(/(<([^>]+)>)/ig,"");
  }

  getLastTradedTime() {
    return this.props.stock.getIn(['stock_data', 'LastTradeWithTime']).LastTradeWithTime.split('-')[0].trim();
  }

  getTodaysProfit(lastTradedPrice, PreviousClose) {
    let profit = (lastTradedPrice - PreviousClose) * this.props.stock.get('shares');
    return parseFloat(profit).toFixed(2)
  }

  formatUniqueId(hashtag) {
    const id = this.props.stock.toObject().id;
    return hashtag ? `#stock-container-${id}` : `stock-container-${id}`
  }

  render() {
    const { ticker, shares, purchased_date, purchased_price } = this.props.stock.toObject()
    const { Ask, Name, PercentChange, PreviousClose } = this.props.stock.get('stock_data').toObject();
    const lastTradedPrice = this.getLastTradedPrice();
    const lastTradedTime = this.getLastTradedTime;
    const todaysProfit = this.getTodaysProfit(lastTradedPrice, PreviousClose);

    return (
      <div className="card card-outline-success text-center">
        <div className="card-header mb-0" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href={this.formatUniqueId(true)} aria-expanded="true" aria-controls={this.formatUniqueId()} >
          <div className="row">
            <div className="col-3">
              {Name}
            </div>

            <div className="col-3">
              {PercentChange}
            </div>

            <div className="col-3">
              ${lastTradedPrice}
            </div>

            <div className="col-3">
              ${todaysProfit}
            </div>
          </div>
        </div>

         <div id={this.formatUniqueId()} className="collapse" role="tabpanel" aria-labelledby="headingOne">
          <div className="card-block">
            {PercentChange}
          </div>
        </div>
      </div>
    )
  }
}

  // componentDidMount() {
    // let ticker = this.props.stock.get('ticker');
    // let url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${ticker}%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;

    // axios.get(url)
      // .then(response => {
        // let stockData = response.data.query.results.quote;

        // let lastTradedTime = moment(this.getLastTradedTime(stockData.LastTradeWithTime), 'h:mma');
        // let now = moment();
        // let fourPM = moment('16:00', 'hh:mm');

        // if (now.isAfter(fourPM) && lastTradedTime.format('h:mma') != '4:00pm') {
          // console.log('RETREIVING STALE DATA');
        // } else {
          // stockData.lastTradedPrice = this.getLastTradedPrice(stockData.LastTradeWithTime);
          // stockData.lastTradedTime  = this.getLastTradedTime(stockData.LastTradeWithTime);

          // let profit =  stockData.lastTradedPrice - stockData.PreviousClose;

          // stockData.daysProfit = parseFloat(profit).toFixed(2);
      // }
        // this.setState({ stockData });
      // })
  // }
