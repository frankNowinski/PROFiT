import React from 'react';
import classnames from 'classnames';
import stockExists from '../../utils/validations/stockValidation';

export default class StockInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: {} }
  }

  validateStockExists(e) {
    const ticker = this.props.ticker;

    if (ticker != '') {
      let errors = this.state.errors;

      stockExists(ticker).then(response => {
        if (response.data.query.results.quote.Name !== null) {
          errors.ticker = '';
        } else {
          errors.ticker = `${ticker.toUpperCase()} is an invalid stock.`
        }

        this.setState({ errors });
      });
    }
  }

  render() {
    const errors = this.state.errors;
    const { ticker, handleChange } = this.props;

    return (
      <div className={classnames("form-group", "row", { 'has-danger': errors.ticker })}>
        <label htmlFor="input-ticker" className="col-sm-4 col-form-label">Stock Ticker: </label>

        <div className="col-7">
          <input
            name="ticker"
            className="form-control form-control-danger"
            id="input-ticker"
            type="text"
            value={ticker}
            onChange={handleChange}
            onBlur={this.validateStockExists.bind(this)}
            placeholder="AAPL"
          />

          <div className="form-control-feedback">{errors.ticker}</div>
        </div>
      </div>
    )
  }
}

