import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import stockExists from '../../utils/validations/stockValidator';

export default function StockInput(props) {
  const { ticker, alreadyOwned, setInvalidState, setErrorsState, errors, handleChange } = props;

  const setErrors = (errors, invalid) => {
    setErrorsState(errors);
    setInvalidState(invalid);
  }

  const validateStockExists = (e) => {
    let invalid, errors = {};

    if (alreadyOwned(ticker)) {
      invalid = true;
      errors.ticker = 'You already own this stock.';

      setErrors(errors, invalid);
    } else if (ticker != '') {
      stockExists(ticker).then(response => {
        if (response.data.query.results.quote.StockExchange !== null) {
          errors.ticker = '';
          invalid = false;
        } else {
          errors.ticker = `${ticker.toUpperCase()} is an invalid stock.`
          invalid = true;
        }

        setErrors(errors, invalid);
      });
    } else {
      invalid = true;
      errors.ticker = 'You must enter a stock ticker.';

      setErrors(errors, invalid);
    }
  }

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
          onBlur={validateStockExists}
          placeholder="AAPL"
        />

        {errors.ticker && <div className="form-control-feedback">{errors.ticker}</div>}
      </div>
    </div>
  )
}

StockInput.propTypes = {
  ticker: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  alreadyOwned: PropTypes.func.isRequired,
  setErrorsState: PropTypes.func.isRequired,
  setInvalidState: PropTypes.func.isRequired
}

