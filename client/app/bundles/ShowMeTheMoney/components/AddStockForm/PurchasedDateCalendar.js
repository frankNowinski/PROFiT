import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '../../css/addStockForm.css';

export default function PurchasedDateCalendar(props) {
  return (
    <div className="form-group row">
      <label htmlFor="input-date-purchased" className="col-sm-4 col-form-label">Date Purchased: </label>

      <div className="col-7">
        <DatePicker
          name="startDate"
          className="form-control datepicker-calandar"
          value={props.purchasedDate}
          selected={props.purchasedDate}
          onChange={props.handleCalendarChange}
        />
      </div>
    </div>
  )
}
