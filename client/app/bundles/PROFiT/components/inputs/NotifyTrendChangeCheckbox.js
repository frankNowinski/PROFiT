import React from 'react';
import classnames from 'classnames';

export default class NotifyTrendChangeCheckbox extends React.Component {
  render() {
    const { notifyTrendChange, handleCheckboxClick } = this.props;
    const checked = notifyTrendChange === true ? true : false;

    return (
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
    )
  }
}

NotifyTrendChangeCheckbox.propTypes = {
  notifyTrendChange: React.PropTypes.bool.isRequired,
  handleCheckboxClick: React.PropTypes.func.isRequired
}
