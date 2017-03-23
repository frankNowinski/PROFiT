import React from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';
import futureDate from '../../utils/validations/datePurchasedValidator';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/addStockForm.css';

export default class PurchasedDateCalendar extends React.Component {
  state = { errorMsg: '' };

  handleBlur = (e) => {
    let invalid, errorMsg = this.state.errorMsg;

    if (futureDate(this.props.purchasedDate)) {
      errorMsg = 'The purchased date cannot be in the future.';
      invalid = true;
    } else {
      errorMsg = '';
      invalid = false;
    }

    this.setState({ errorMsg });
    this.props.setInvalidState(invalid);
  }

  handleFocus = () => {
    this.setState({ errorMsg: '' });
    this.props.setInvalidState(false);
  }

  render() {
    const errorMsg = this.state.errorMsg;
    const { purchasedDate, handleCalendarChange } = this.props;

    return (
      <div className={classnames("form-group", "row", { 'has-danger': errorMsg != '' })}>
        <label htmlFor="input-date-purchased" className="col-sm-4 col-form-label">Date Purchased: </label>

        <div className="col-7">
          <DatePicker
            name="startDate"
            className="form-control datepicker-calandar"
            value={purchasedDate}
            selected={purchasedDate}
            onChange={handleCalendarChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          <div className="form-control-feedback">{errorMsg}</div>
        </div>
      </div>
    )
  }
}

PurchasedDateCalendar.propTypes = {
  purchasedDate: React.PropTypes.object.isRequired,
  handleCalendarChange: React.PropTypes.func.isRequired,
  setInvalidState: React.PropTypes.func.isRequired
}

