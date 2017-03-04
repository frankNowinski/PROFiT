import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'GET_STOCK_DATA',
  'UPDATE_STOCK_TICKER'
]);

export default actionTypes;

