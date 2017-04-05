import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as stockActions from '../actions/stockActions';

import AddStockForm from '../components/forms/AddStockForm';
import TotalProfit from '../components/TotalProfit';
import UserStocks from '../components/userStocks/UserStocks';

function select(state) {
  return { $$stocksStore: state.$$stocksStore };
}

const PortfolioPage = (props) => {
  const { dispatch, $$stocksStore } = props;
  const actions = bindActionCreators(stockActions, dispatch);
  const { addStock, editStock, removeStock } = actions;
  const stocks = $$stocksStore.get('stocks');
  const user   = $$stocksStore.get('user');

  return (
    <div className="row">
      <div className="col-3">
        <AddStockForm {...{ stocks, user, addStock }} />
        <TotalProfit {...{ stocks }} />
      </div>

      <div className="col-9">
        <UserStocks {... { stocks, editStock, removeStock }} />
      </div>
    </div>
  );
};

PortfolioPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  $$stocksStore: React.PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default connect(select)(PortfolioPage);

