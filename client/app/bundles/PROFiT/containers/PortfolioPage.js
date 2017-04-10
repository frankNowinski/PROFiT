import React from 'react';
import PropTypes from 'prop-types';
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
  const stocks = $$stocksStore.get('stocks');
  const user   = $$userStore.get('user');

  return (
    <div className="row">
      <div className="col-3">
        <AddStockForm {... { stocks, user }} />
        <TotalProfit {... {stocks }} />
      </div>

      <div className="col-9">
        <UserStocks {... { stocks }} />
      </div>
    </div>
  );
};

PortfolioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  $$stocksStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  $$userStore: PropTypes.instanceOf(Immutable.Map).isRequired
};

export default connect(select)(PortfolioPage);

