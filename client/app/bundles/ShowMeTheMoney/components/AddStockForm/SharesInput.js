import React from 'react';
import classnames from 'classnames';

export default class SharesInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errorMsg: '' }
  }

  validateShares(e) {
    const shares = this.props.shares;
    let invalid, errorMsg = this.state.errorMsg;

    if (shares == '') {
      errorMsg = 'Enter the number of shares you own.';
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
            onBlur={this.validateShares.bind(this)}
            placeholder="Shares"
          />

          <div className="form-control-feedback">{errorMsg}</div>
        </div>
      </div>
    )
  }
}

