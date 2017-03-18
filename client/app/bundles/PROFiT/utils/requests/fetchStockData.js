import axios from 'axios';
import moment from 'moment';


function today() {
  return moment().format('YYYY-MM-DD');
}

function formatYahooApiUrl(ticker, start_date) {
  return `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22${ticker}%22%20and%20startDate%20%3D%20%22${start_date}%22%20and%20endDate%20%3D%20%22${today()}%22&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&format=json`
}

