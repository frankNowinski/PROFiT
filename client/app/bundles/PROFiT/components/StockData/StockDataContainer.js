import React from 'react';
import RemoveStock from './RemoveStock';
import EditStock from './EditStock';

export default class StockDataContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { removeStockPromt: false };

    this.handleRemoveStock    = this.handleRemoveStock.bind(this);
    this.setRemoveStockPrompt = this.setRemoveStockPrompt.bind(this);
    this.displayStockData     = this.displayStockData.bind(this);
  }

  handleRemoveStock() {
    this.setState({ removeStockPrompt: true });
  }

  setRemoveStockPrompt(removeStockPrompt) {
    this.setState({ removeStockPrompt });
  }

  displayStockData() {
    const { stock, removeStock } = this.props;

    return (
      <div>
        <button className='btn btn-outline-primary' onClick={this.handleRemoveStock}>Remove Stock</button>
        <br />
        <EditStock stock={stock} />
      </div>
    )
  }

  render() {
    const { stock, removeStock } = this.props;

    return (
      <div>
        { this.state.removeStockPrompt ?
          <RemoveStock stock={stock}
                       removeStockPrompt={this.setRemoveStockPrompt}
                       removeStock={removeStock} /> :
          this.displayStockData() }
      </div>
    )
  }
}

StockDataContainer.propTypes = {
  stock: React.PropTypes.object.isRequired,
  removeStock: React.PropTypes.func.isRequired
}
