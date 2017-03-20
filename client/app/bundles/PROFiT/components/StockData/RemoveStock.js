import React from 'react';

export default function RemoveStock(props) {
  const ticker = props.stock.get('ticker').toUpperCase();
  const callRemoveStock = () => {
    let stockId = props.stock.get('id');
    props.removeStock(stockId);
  }

  const closePrompt = () => {
    props.removeStockPrompt(false);
  }

  return (
    <div>
      <p className="lead">Are you sure you want to remove {ticker} from your portfolio?</p>
      <button className="btn btn-outline-primary" onClick={callRemoveStock}>Yes</button>
      <button className="btn btn-outline-danger" onClick={closePrompt}>No</button>
    </div>
  )
}

RemoveStock.propTypes = {
  stock: React.PropTypes.object.isRequired,
  removeStock: React.PropTypes.func.isRequired,
  removeStockPrompt: React.PropTypes.func.isRequired
}
