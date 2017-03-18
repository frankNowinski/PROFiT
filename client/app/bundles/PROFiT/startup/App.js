import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import createStore from '../store/stocksStore';
import PortfolioPage from '../containers/PortfolioPage';

const App = (props, _railsContext) => {
  const store = createStore(props);

  const reactComponent = (
    <Provider store={store}>
      <PortfolioPage />
    </Provider>
  );
  return reactComponent;
};

ReactOnRails.register({ App });
