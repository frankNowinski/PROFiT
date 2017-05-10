import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function PurchasedPrice(props) {
  const { purchasedPrice, errors, handleChange, setInvalidState, setErrorsState } = props;

  const validatePrice = (e) => {
    const price  = parseInt(purchasedPrice);
    let invalid, errors = {};

    if (isNaN(price) || price <= 0) {
      errors.purchasedPrice = 'The price must be greater than 0.';
      invalid = true;
    } else {
      errors.purchasedPrice = '';
      invalid = false;
    }

    setInvalidState(invalid);
    setErrorsState(errors);
  }

  return (
    <div className={classnames("form-group", "row", { 'has-danger': errors.purchasedPrice })}>
      <label htmlFor="input-purchased-price" className="col-sm-4 col-form-label">Purchased Price: </label>

      <div className="col-7">
        <input
          name="purchasedPrice"
          type="number"
          className="form-control"
          id="input-purchased-price"
          value={purchasedPrice}
          onChange={handleChange}
          onBlur={validatePrice}
          placeholder="Purchased Price"
        />

        {errors.purchasedPrice && <div className="form-control-feedback">{errors.purchasedPrice}</div>}
      </div>
    </div>
  )
}

PurchasedPrice.propTypes = {
  purchasedPrice: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setInvalidState: PropTypes.func.isRequired,
  setErrorsState: PropTypes.func.isRequired
}
