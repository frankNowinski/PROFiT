import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as stockActions from '../actions/stockActions';

import AddStockForm from '../components/AddStockForm/AddStockForm';
import TotalProfitView from '../components/TotalProfitView';
import UserStocks from '../components/Userstocks';

function select(state) {
  return { $$stocksStore: state.$$stocksStore };
}

const PortfolioPage = (props) => {
  const { dispatch, $$stocksStore } = props;
  const actions = bindActionCreators(stockActions, dispatch);
  const { addStock, editStock, removeStock } = actions;
  const stocks = $$stocksStore.get('stocks');

  const alreadyOwned = (ticker) => {
    let alreadyOwnedTickers = [];
    stocks.map(stock => alreadyOwnedTickers.push(stock.toObject().ticker));

    return alreadyOwnedTickers.includes(ticker);
  }

  return (
    <div className="row">
      <div className="col-3">
        <AddStockForm {...{ stocks, addStock, alreadyOwned }} />
        <br />
        <TotalProfitView {...{ stocks }} />
      </div>

      <div className="col-9">
        <UserStocks {... { stocks, editStock, removeStock }} />
      </div>
    </div>
  );
};

PortfolioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  $$stocksStore: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default connect(select)(PortfolioPage);

