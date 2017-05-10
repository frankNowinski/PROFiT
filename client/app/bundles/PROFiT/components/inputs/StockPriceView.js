import React from 'react';
import PropTypes from 'prop-types';
import PurchasedDateCalendar from '../inputs/PurchasedDateCalendar';
import PurchasedPrice from '../inputs/PurchasedPrice';

export default function StockPriceView(props) {
  const { displayDateInput,
          displayPriceInput,
          purchasedDate,
          purchasedPrice,
          errors,
          handleChange,
          handleInputChange,
          handleCalendarChange,
          setInvalidState,
          setErrorsState } = props;

  return (
    <div>
      <p>Add stock by price by: </p>

      <div className="row">
        <label className="col-4">Purchased Date: </label>
        <input
          name="displayDateInput"
          type="checkbox"
          className="col-2"
          onChange={handleInputChange}
          checked={displayDateInput}
        />

        <label className="col-4">Purchased Price: </label>
        <input
          name="displayPriceInput"
          type="checkbox"
          className="col-2"
          onChange={handleInputChange}
          checked={displayPriceInput}
        />
      </div>

      { displayDateInput ?
        <PurchasedDateCalendar
          errors={errors}
          purchasedDate={purchasedDate}
          handleCalendarChange={handleCalendarChange}
          setErrorsState={setErrorsState}
          setInvalidState={setInvalidState} />
        :
         <PurchasedPrice
          errors={errors}
          purchasedPrice={purchasedPrice}
          handleChange={handleChange}
          setErrorsState={setErrorsState}
          setInvalidState={setInvalidState} />
      }
    </div>
  )
}

StockPriceView.propTypes = {
  errors: PropTypes.object.isRequired,
  purchasedPrice: PropTypes.string.isRequired,
  purchasedDate: PropTypes.object.isRequired,
  displayDateInput: PropTypes.bool.isRequired,
  displayPriceInput: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCalendarChange: PropTypes.func.isRequired,
  setInvalidState: PropTypes.func.isRequired,
  setErrorsState: PropTypes.func.isRequired
}

