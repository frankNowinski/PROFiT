import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as stockActions from '../actions/stockActions';

import LookupStock from '../components/LookupStock';

function select(state) {
  return { $$stocksStore: state.$$stocksStore };
}

const PortfolioPage = (props) => {
  const { dispatch, $$stocksStore } = props;
  const actions = bindActionCreators(stockActions, dispatch);
  const { updateStockTicker } = actions;
  const stocks = $$stocksStore.get('stocks');
  const stockTicker = $$stocksStore.get('stockTicker');

  return (
    <div>
      <LookupStock {...{ updateStockTicker, stockTicker }}/>
    </div>
  );
};

PortfolioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  $$stocksStore: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default connect(select)(PortfolioPage);

