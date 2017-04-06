import React from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';
import futureDate from '../../utils/validations/datePurchasedValidator';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/addStockForm.css';

export default function PurchasedDateCalendar(props) {
  const { purchasedDate, errors, handleCalendarChange, setErrorsState, setInvalidState } = props;

  const handleBlur = (e) => {
    let invalid, errors= {};

    if (futureDate(purchasedDate)) {
      errors.purchasedDate = 'The purchased date cannot be in the future.';
      invalid = true;
    } else {
      errors.purchasedDate = '';
      invalid = false;
    }

    setErrorsState(errors);
    setInvalidState(invalid);
  }

  return (
    <div className={classnames("form-group", "row", { 'has-danger': errors.purchasedDate })}>
      <label htmlFor="input-date-purchased" className="col-sm-4 col-form-label">Date Purchased: </label>

      <div className="col-7">
        <DatePicker
          name="startDate"
          className="form-control datepicker-calandar"
          value={purchasedDate}
          selected={purchasedDate}
          onChange={handleCalendarChange}
          onBlur={handleBlur}
        />

        {errors.purchasedDate && <div className="form-control-feedback">{errors.purchasedDate}</div>}
      </div>
    </div>
  )
}

PurchasedDateCalendar.propTypes = {
  purchasedDate: React.PropTypes.object.isRequired,
  errors: React.PropTypes.object.isRequired,
  handleCalendarChange: React.PropTypes.func.isRequired,
  setInvalidState: React.PropTypes.func.isRequired,
  setErrorsState: React.PropTypes.func.isRequired
}

