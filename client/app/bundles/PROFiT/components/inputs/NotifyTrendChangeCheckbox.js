import React from 'react';
import classnames from 'classnames';

export default function NotifyTrendChangeCheckbox(props) {
  const { notifyEmail, notifyTrendChange, handleChange, handleCheckboxClick, updateEmail } = props;
  const checked = notifyTrendChange === true ? true : false;

  const renderEmailInput = () => {
    return (
      <div className="form-group row">
        <label className="col-5 col-form-label">Email to send alert: </label>

        <div className="col-7">
          <input
            name="notifyEmail"
            type="email"
            className="form-control"
            id="user-email"
            value={notifyEmail}
            onChange={handleChange} />
        </div>
      </div>
    )
  }

  const updateUserEmail = (user) => {
    const userId         = user.get('id');
    const persistedEmail = user.get('email');

    if (persistedEmail != notifyEmail) {
      updateEmail(userId, { email: notifyEmail });
    }
  }

  return (
    <div>
      <div className="row checkbox notify-trend-checkbox">
        <label className="col-10 text-right">
          Receive an email when this stock changes trends:
        </label>

        <span className="col-2 text-left">
          <input
            name="notifyTrendChange"
            type="checkbox"
            className="notify-trend-checkbox"
            value={notifyTrendChange}
            onClick={handleCheckboxClick}
            checked={checked}
          />
        </span>
      </div>

      { notifyTrendChange ? renderEmailInput() : '' }
      { props.submitted  ? updateUserEmail(props.user) : '' }
    </div>
  )
}

NotifyTrendChangeCheckbox.propTypes = {
  user: React.PropTypes.object.isRequired,
  updateEmail: React.PropTypes.func.isRequired,
  notifyEmail: React.PropTypes.string.isRequired,
  notifyTrendChange: React.PropTypes.bool.isRequired,
  submitted: React.PropTypes.bool.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleCheckboxClick: React.PropTypes.func.isRequired
}

