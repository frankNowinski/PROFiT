import React from 'react';
import PropTypes from 'prop-types';
import SharesInput from '../inputs/SharesInput';
import PurchasedDateCalendar from '../inputs/PurchasedDateCalendar';
import AlertMessage from '../forms/AlertMessage';
import futureDate from '../../utils/validations/datePurchasedValidator';
import moment from 'moment';

export default class EditStock extends React.Component {
  state = {
    stockId: this.props.stock.get('id'),
    shares: this.props.stock.get('shares'),
    purchasedDate: moment(this.props.stock.get('purchased_date'), 'YYYY-MM-DD'),
    invalid: false,
    submitted: false,
    message: '',
    errors: {}
  }

  getPurchasedDate = () => {
    return moment(this.props.stock.get('purchased_date'), 'YYYY-MM-DD');
  }

  setInvalidState = (invalid) => {
    this.setState({ invalid });
  }

  setErrorsState = (newErrors) => {
    let errors = Object.assign({}, this.state.errors, newErrors);
    this.setState({ errors });
  }

  closePrompt = () => {
    this.props.closePrompt('editStockForm');
  }

  handleChange = (e) => {
    this.setState({ shares: e.target.value });
  }

  handleCalendarChange = (date) => {
    this.setState({ purchasedDate: date });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { shares, purchasedDate } = this.state;

    if (shares != '' && !futureDate(purchasedDate)) {
      this.props.editStock(this.state)
        .then(response => {
          if (response.base !== undefined) {
            let ticker = this.props.stock.get('ticker').toUpperCase();
            this.setState({
              submitted: true,
              invalid: true,
              message: `Unable to edit ${ticker}.`
            });
          } else {
            this.setState({ submitted: true, invalid: false });
            this.closePrompt();
          }
        })
        .catch(error => {
          console.log(`Error editing stock: ${error}`);
        });

    } else {
      this.setState({ invalid: true, submitted: true });
    }
  }

  render() {
    const ticker = this.props.stock.get('ticker').toUpperCase();
    const { shares, purchasedDate, message, errors } = this.state;

    return (
      <div>
        <h3 className="card-header">Edit {ticker}</h3>
        <br />

        <div className="card-text container">
          { this.state.submitted ?
            <AlertMessage invalid={this.state.invalid} message={message}/>
            : null
          }

          <form onSubmit={this.handleSubmit}>
            <SharesInput
              shares={shares}
              errors={errors}
              handleChange={this.handleChange}
              setErrorsState={this.setErrorsState}
              setInvalidState={this.setInvalidState} />

            <PurchasedDateCalendar
              errors={errors}
              purchasedDate={purchasedDate}
              handleCalendarChange={this.handleCalendarChange}
              setErrorsState={this.setErrorsState}
              setInvalidState={this.setInvalidState} />

            <hr />

            <button className="btn btn-outline-primary edit-stock-btn yes" type="submit">Edit Stock</button>
            <button className="btn btn-outline-danger edit-stock-btn" onClick={this.closePrompt}>Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

EditStock.propTypes = {
  stock: PropTypes.object.isRequired,
  editStock: PropTypes.func.isRequired
}

