import React, { PropTypes } from 'react';

export default class LookupStock extends React.Component {
  static propTypes = {
    getStockData: PropTypes.func.isRequired,
    updateStockTicker: PropTypes.func.isRequired,
    stockTicker: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const stockTicker = e.target.value;
    this.props.updateStockTicker(stockTicker);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getStockData(this.props.stockTicker);

  }

  render() {
    const { stockTicker } = this.props;

    return (
      <div className="container text-center">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="lookup-stock-label">Lookup Stock: </label>
            <input
              type="text"
              className="form-control"
              placeholder="AAPL"
              onChange={this.handleChange}
              value={stockTicker}
            />
          </div>

          <button type="submit" className="btn btn-default">Submit</button>
        </form>
        <hr />
      </div>
    );
  }
}

