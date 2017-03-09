import React from 'react';

export default function SharesInput(props) {
  return (
    <div className="form-group row">
      <label htmlFor="input-shares" className="col-sm-4 col-form-label">Shares: </label>

      <div className="col-7">
        <input
          name="shares"
          type="number"
          className="form-control"
          id="input-shares"
          value={props.shares}
          onChange={props.handleChange}
          placeholder="Shares"
        />
      </div>
    </div>
  )
}

