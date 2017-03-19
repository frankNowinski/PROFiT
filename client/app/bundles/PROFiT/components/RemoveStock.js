import React from 'react';
import Immutable from 'immutable';

export default function RemoveStock(props) {
  function handleClick() {
    let stockId = props.stock.get('id');
    props.removeStock(stockId);
  }

  return (
    <button
      className="btn btn-outline-primary"
      onClick={handleClick}
    >
      Remove Stock
    </button>
  )
}

RemoveStock.propTypes = {
  stock: React.PropTypes.object.isRequired,
  removeStock: React.PropTypes.func.isRequired
}
