import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'GET_STOCK_DATA',
  'ADD_STOCK',
  'REMOVE_STOCK'
]);

export default actionTypes;

