import React from 'react';
import classnames from 'classnames';
import stockExists from '../../utils/validations/stockValidator';

export default class StockInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errorMsg: '' }
  }

  validateStockExists(e) {
    const ticker = this.props.ticker;
    let invalid, errorMsg = this.state.errorMsg;

    if (ticker != '') {
      stockExists(ticker).then(response => {
        if (response.data.query.results.quote.Name !== null) {
          errorMsg = '';
          invalid = false;
        } else {
          errorMsg = `${ticker.toUpperCase()} is an invalid stock.`
          invalid = true;
        }

        this.setState({ errorMsg });
        this.props.setInvalidState(invalid);
      });
    } else {
      invalid = true;
      errorMsg = 'You must enter a stock ticker';

      this.setState({ errorMsg });
      this.props.setInvalidState(invalid);
    }
  }

  render() {
    const errorMsg = this.state.errorMsg;
    const { ticker, handleChange } = this.props;

    return (
      <div className={classnames("form-group", "row", { 'has-danger': errorMsg != '' })}>
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

          <div className="form-control-feedback">{errorMsg}</div>
        </div>
      </div>
    )
  }
}

StockInput.propTypes = {
  ticker: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  setInvalidState: React.PropTypes.func.isRequired
}


