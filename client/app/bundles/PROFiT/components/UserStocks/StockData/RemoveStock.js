import React from 'react';

export default function RemoveStock(props) {
  const ticker = props.stock.get('ticker').toUpperCase();
  const { removeStock, closePrompt } = props;

  const callRemoveStock = () => {
    let stockId = props.stock.get('id');
    removeStock(stockId);
  }

  const closeRemoveStockPrompt = () => {
    closePrompt('removeStockPrompt');
  }

  return (
    <div>
      <p className="lead">Are you sure you want to remove {ticker} from your portfolio?</p>
      <button className="btn btn-outline-primary stock-item-btn yes" onClick={callRemoveStock}>Yes</button>
      <button className="btn btn-outline-danger stock-item-btn" onClick={closeRemoveStockPrompt}>No</button>
    </div>
  )
}

RemoveStock.propTypes = {
  stock: React.PropTypes.object.isRequired,
  removeStock: React.PropTypes.func.isRequired,
  closePrompt: React.PropTypes.func.isRequired
}
