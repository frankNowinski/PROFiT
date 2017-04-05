import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as stockActions from '../actions/stockActions';
import * as userActions from '../actions/userActions';

import AddStockForm from '../components/forms/AddStockForm';
import TotalProfit from '../components/TotalProfit';
import UserStocks from '../components/userStocks/UserStocks';

function select(state) {
  return {
    $$stocksStore: state.$$stocksStore,
    $$userStore: state.$$userStore
  };
}

const PortfolioPage = (props) => {
  const { dispatch, $$stocksStore, $$userStore } = props;
  const allActions = Object.assign({}, stockActions, userActions);
  const actions = bindActionCreators(allActions, dispatch);
  const { addStock, editStock, removeStock, updateEmail } = actions;
  const stocks = $$stocksStore.get('stocks');
  const user   = $$userStore.get('user');

  return (
    <div className="row">
      <div className="col-3">
        <AddStockForm {...{ stocks, user, addStock, updateEmail }} />
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
  $$userStore: React.PropTypes.instanceOf(Immutable.Map).isRequired
};

export default connect(select)(PortfolioPage);

