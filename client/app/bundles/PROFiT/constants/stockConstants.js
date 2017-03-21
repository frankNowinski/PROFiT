import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_STOCK',
  'EDIT_STOCK',
  'REMOVE_STOCK'
]);

export default actionTypes;

