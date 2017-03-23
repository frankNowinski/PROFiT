import React from 'react';
import classnames from 'classnames';
import stockExists from '../../utils/validations/stockValidator';

export default class StockInput extends React.Component {
  state = { errorMsg: '' }

  handleFocus = () => {
    this.setState({ errorMsg: '' });
    this.props.setInvalidState(false);
  }

  validateStockExists = (e) => {
    let invalid, errorMsg = this.state.errorMsg;
    const { ticker, alreadyOwned, setInvalidState } = this.props;

    const setErrors = (errorMsg, invalid) => {
      this.setState({ errorMsg });
      this.props.setInvalidState(invalid);
    }

    if (alreadyOwned(ticker)) {
      invalid = true;
      errorMsg = 'You already own this stock.';

      setErrors(errorMsg, invalid);
    } else if(ticker != '') {
      stockExists(ticker).then(response => {
        if (response.data.query.results.quote.StockExchange !== null) {
          errorMsg = '';
          invalid = false;
        } else {
          errorMsg = `${ticker.toUpperCase()} is an invalid stock.`
          invalid = true;
        }

        setErrors(errorMsg, invalid);
      });
    } else {
      invalid = true;
      errorMsg = 'You must enter a stock ticker.';

      setErrors(errorMsg, invalid);
    }

    this.setState({ errorMsg });
    setInvalidState(invalid);
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
            onFocus={this.handleFocus}
            onBlur={this.validateStockExists}
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

