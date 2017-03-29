import React from 'react';
import SharesInput from '../Inputs/SharesInput';
import PurchasedDateCalendar from '../Inputs/PurchasedDateCalendar';
import AlertMessage from '../Forms/AlertMessage';
import futureDate from '../../utils/validations/datePurchasedValidator';
import moment from 'moment';

export default class EditStock extends React.Component {
  state = {
    stockId: this.props.stock.get('id'),
    shares: this.props.stock.get('shares'),
    purchasedDate: moment(this.props.stock.get('purchased_date'), 'YYYY-MM-DD'),
    invalid: false,
    submitted: false,
    message: ''
  }

  getPurchasedDate = () => {
    return moment(this.props.stock.get('purchased_date'), 'YYYY-MM-DD');
  }

  setInvalidState = (invalid) => {
    this.setState({ invalid });
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
    const { shares, purchasedDate, message } = this.state;

    return (
      <div className="container">
        <h3>Edit {ticker}</h3>
        <br />

        { this.state.submitted ?
          <AlertMessage invalid={this.state.invalid} message={message}/>
          : null
        }

        <form onSubmit={this.handleSubmit}>
          <SharesInput
            shares={shares}
            handleChange={this.handleChange}
            setInvalidState={this.setInvalidState} />

          <PurchasedDateCalendar
            purchasedDate={purchasedDate}
            handleCalendarChange={this.handleCalendarChange}
            setInvalidState={this.setInvalidState} />

          <hr />

          <button className="btn btn-outline-primary stock-item-btn yes" type="submit">Edit Stock</button>
          <button className="btn btn-outline-danger stock-item-btn" onClick={this.closePrompt}>Cancel</button>
        </form>
      </div>
    )
  }
}

EditStock.propTypes = {
  stock: React.PropTypes.object.isRequired,
  editStock: React.PropTypes.func.isRequired
}

