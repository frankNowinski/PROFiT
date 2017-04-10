import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeStock } from '../../actions/stockActions';

class RemoveStock extends React.Component {
  callRemoveStock = () => {
    const stockId = this.props.stock.get('id');
    this.props.removeStock(stockId);
  }

  closeRemoveStockPrompt = () => {
    this.props.closePrompt('removeStockPrompt');
  }

  render() {
    const ticker = this.props.stock.get('ticker').toUpperCase();

    return (
      <div>
        <h3 className="card-header">Are you sure you want to remove {ticker} from your portfolio?</h3>
        <div className="card-text remove-stock-container">
          <button className="btn btn-outline-primary remove-stock-btn yes" onClick={this.callRemoveStock}>Yes</button>
          <button className="btn btn-outline-danger remove-stock-btn" onClick={this.closeRemoveStockPrompt}>No</button>
        </div>
      </div>
    )
  }
}

RemoveStock.propTypes = {
  stock: PropTypes.object.isRequired,
  closePrompt: PropTypes.func.isRequired
}

export default connect(null, { removeStock })(RemoveStock);
