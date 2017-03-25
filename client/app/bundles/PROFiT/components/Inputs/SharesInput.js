import React from 'react';
import classnames from 'classnames';

export default class SharesInput extends React.Component {
  state = { errorMsg: '' }

  handleFocus = () => {
    this.setState({ errorMsg: '' });
    this.props.setInvalidState(false);
  }

  validateShares = (e) => {
    const shares = parseInt(this.props.shares);
    let invalid, errorMsg = this.state.errorMsg;

    if (isNaN(shares) || shares <= 0) {
      errorMsg = 'You must enter a positive number.';
      invalid = true;
    } else {
      errorMsg = '';
      invalid = false;
    }

    this.setState({ errorMsg });
    this.props.setInvalidState(invalid);
  }

  render() {
    const errorMsg = this.state.errorMsg;
    const { shares, handleChange } = this.props;

    return (
      <div className={classnames("form-group", "row", { 'has-danger': errorMsg != '' })}>
        <label htmlFor="input-shares" className="col-sm-4 col-form-label">Shares: </label>

        <div className="col-7">
          <input
            name="shares"
            type="number"
            className="form-control"
            id="input-shares"
            value={shares}
            onChange={handleChange}
            onFocus={this.handleFocus}
            onBlur={this.validateShares}
            placeholder="Shares"
          />

          <div className="form-control-feedback">{errorMsg}</div>
        </div>
      </div>
    )
  }
}

SharesInput.propTypes = {
  shares: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  setInvalidState: React.PropTypes.func.isRequired
}
