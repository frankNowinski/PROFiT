import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function SharesInput(props) {
  const { shares, errors, handleChange, setInvalidState, setErrorsState } = props;

  const validateShares = (e) => {
    const inputtedShares = parseInt(shares);
    let invalid, errors = {};

    if (isNaN(inputtedShares) || inputtedShares <= 0) {
      errors.shares = 'You must enter a positive number.';
      invalid = true;
    } else {
      errors.shares = '';
      invalid = false;
    }

    setInvalidState(invalid);
    setErrorsState(errors);
  }

  return (
    <div className={classnames("form-group", "row", { 'has-danger': errors.shares })}>
      <label htmlFor="input-shares" className="col-sm-4 col-form-label">Shares: </label>

      <div className="col-7">
        <input
          name="shares"
          type="number"
          className="form-control"
          id="input-shares"
          value={shares}
          onChange={handleChange}
          onBlur={validateShares}
          placeholder="Shares"
        />

        {errors.shares && <div className="form-control-feedback">{errors.shares}</div>}
      </div>
    </div>
  )
}

SharesInput.propTypes = {
  shares: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setInvalidState: PropTypes.func.isRequired,
  setErrorsState: PropTypes.func.isRequired
}
