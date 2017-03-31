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
      <h3 className="card-header">Are you sure you want to remove {ticker} from your portfolio?</h3>
      <div className="card-text remove-stock-container">
        <button className="btn btn-outline-primary remove-stock-btn yes" onClick={callRemoveStock}>Yes</button>
        <button className="btn btn-outline-danger remove-stock-btn" onClick={closeRemoveStockPrompt}>No</button>
      </div>
    </div>
  )
}

RemoveStock.propTypes = {
  stock: React.PropTypes.object.isRequired,
  removeStock: React.PropTypes.func.isRequired,
  closePrompt: React.PropTypes.func.isRequired
}
