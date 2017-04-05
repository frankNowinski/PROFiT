import React from 'react';
import classnames from 'classnames';

export default class NotifyTrendChangeCheckbox extends React.Component {
  render() {
    const { notifyTrendChange, handleCheckboxClick } = this.props;
    const checked = notifyTrendChange === true ? true : false;

    return (
      <div className="text-center">
        <div>
          <p>Receive an email alert when this stock changes trends:</p>
        </div>

        <div className="text-center">
          <input
            name="notifyTrendChange"
            type="checkbox"
            className="notify-trend-checkbox"
            value={notifyTrendChange}
            onClick={handleCheckboxClick}
            checked={checked}
          />
        </div> <br />
      </div>
    )
  }
}

NotifyTrendChangeCheckbox.propTypes = {
  notifyTrendChange: React.PropTypes.bool.isRequired,
  handleCheckboxClick: React.PropTypes.func.isRequired
}
