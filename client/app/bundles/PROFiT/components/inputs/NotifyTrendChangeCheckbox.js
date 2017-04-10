import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import EmailInput from './EmailInput';
import validateEmail from '../../utils/validations/validateEmail';
import { updateEmail } from '../../actions/userActions';

function NotifyTrendChangeCheckbox(props) {
  const { notifyEmail, notifyTrendChange, handleChange, handleCheckboxClick, errors, updateEmail } = props;
  const checked = notifyTrendChange === true ? true : false;

  const updateUserEmail = (user) => {
    const userId         = user.get('id');
    const persistedEmail = user.get('email');

    if ((persistedEmail !== notifyEmail)) {
      updateEmail(userId, { email: notifyEmail });
    }
  }

  return (
    <div>
      <div className="row checkbox notify-trend-checkbox">
        <label className="col-10 text-right">
          Receive an email when this stock trends downward
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

      { notifyTrendChange ?
        <EmailInput
          notifyEmail={notifyEmail}
          notifyTrendChange={notifyTrendChange}
          handleChange={handleChange}
          errors={errors} />
        : ''
      }
      { props.submitted  ? updateUserEmail(props.user) : '' }
    </div>
  )
}

NotifyTrendChangeCheckbox.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateEmail: PropTypes.func.isRequired,
  notifyEmail: PropTypes.string.isRequired,
  notifyTrendChange: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired
}

export default connect(null, { updateEmail })(NotifyTrendChangeCheckbox);

