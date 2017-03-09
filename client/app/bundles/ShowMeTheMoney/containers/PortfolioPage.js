import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as stockActions from '../actions/stockActions';

import AddStockForm from '../components/AddStockForm/AddStockForm';

function select(state) {
  return { $$stocksStore: state.$$stocksStore };
}

const PortfolioPage = (props) => {
  const { dispatch, $$stocksStore } = props;
  const actions = bindActionCreators(stockActions, dispatch);
  const { getStockData } = actions;
  const stocks = $$stocksStore.get('stocks');

  return (
    <div>
      <AddStockForm {...{ getStockData, stocks }} />
    </div>
  );
};

PortfolioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  $$stocksStore: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default connect(select)(PortfolioPage);

