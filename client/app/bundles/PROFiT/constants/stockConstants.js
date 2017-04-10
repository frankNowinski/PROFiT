import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_STOCK',
  'EDIT_STOCK',
  'REMOVE_STOCK',
  'FETCH_STOCK_DATA'
]);

export default actionTypes;

