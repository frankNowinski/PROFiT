import axios from 'axios';

function yahooYQLUrl(ticker) {
  return `https://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22${[ticker].join('+')}%22%29&env=store://datatables.org/alltableswithkeys&format=json`;
}

export default function fetchStock(ticker) {
  return axios.get(yahooYQLUrl(ticker)).then(response => {
    let stocks    = [];
    let allStocks = response.data.query.results.quote;

    for(let i = 0; i < allStocks.length; i+=2) {
      stocks.push(allStocks[i]);
    }

    return stocks;
  });
}

