import React from 'react';
import RemoveStock from './RemoveStock';
import EditStockForm from '../EditStockForm/EditStockForm';

export default class StockDataContainer extends React.Component {
  state = {
    removeStockPrompt: false,
    editStockForm: false
  }

  handleRemoveStock = () => {
    this.setState({ removeStockPrompt: true });
  }

  handleEditStock = () => {
    this.setState({ editStockForm: true });
  }

  closePrompt = (prompt) => {
    if (prompt == 'removeStockPrompt') {
      this.setState({ removeStockPrompt: false });
    } else if (prompt === 'editStockForm') {
      this.setState({ editStockForm: false });
    }
  }

  stockDataView = () => {
    const { stock, alreadyOwned } = this.props;

    return (
      <div>
        <button className='btn btn-outline-primary' onClick={this.handleRemoveStock}>Remove Stock</button>
        <br />
        <button className='btn btn-outline-primary' onClick={this.handleEditStock}>Edit Stock</button>
      </div>
    )
  }

  renderStockDataView = () => {
    const { stock, editStock, removeStock } = this.props;

    if (this.state.removeStockPrompt) {
      return (
        <RemoveStock stock={stock}
                     removeStock={removeStock}
                     closePrompt={this.closePrompt} />
      )
    } else if (this.state.editStockForm) {
      return (
        <EditStockForm stock={stock}
                       editStock={editStock}
                       closePrompt={this.closePrompt} />
      )
    } else {
      return this.stockDataView();
    }
  }

  render() {

    return (
      <div>{this.renderStockDataView()}</div>
    )
  }
}

StockDataContainer.propTypes = {
  stock: React.PropTypes.object.isRequired,
  editStock: React.PropTypes.func.isRequired,
  removeStock: React.PropTypes.func.isRequired
}
