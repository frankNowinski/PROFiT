import React from 'react';
import SharesInput from '../AddStockForm/SharesInput';
import PurchasedDateCalendar from '../AddStockForm/PurchasedDateCalendar';
import futureDate from '../../utils/validations/datePurchasedValidator';
import moment from 'moment';

export default class EditStock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stockId: props.stock.get('id'),
      shares: props.stock.get('shares'),
      purchasedDate: this.getPurchasedDate(),
      invalid: false,
      submitted: false
    }

    this.setInvalidState      = this.setInvalidState.bind(this);
    this.closePrompt          = this.closePrompt.bind(this);
    this.handleChange         = this.handleChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
  }

  getPurchasedDate() {
    return moment(this.props.stock.get('purchased_date'), 'YYYY-MM-DD');
  }

  setInvalidState(invalid) {
    this.setState({ invalid });
  }

  closePrompt() {
    this.props.closePrompt('editStockForm');
  }

  handleChange(e) {
    this.setState({ shares: e.target.value });
  }

  handleCalendarChange(date) {
    this.setState({ purchasedDate: date });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { shares, purchasedDate } = this.state;

    if (shares != '' && !futureDate(purchasedDate)) {
      this.props.editStock(this.state)
        .then(response => {
          this.closePrompt();
        })
        .catch(error => {
          console.log(`Error adding stock: ${error}`);
        });

    } else {
      this.setState({ invalid: true, submitted: true });
    }
  }

  render() {
    const ticker = this.props.stock.get('ticker').toUpperCase();
    const { shares, purchasedDate } = this.state;

    return (
      <div>
        <p className="lead">Edit {ticker}</p>
        <br />

        <form onSubmit={this.handleSubmit}>
          <SharesInput
            shares={shares}
            handleChange={this.handleChange}
            setInvalidState={this.setInvalidState} />

          <PurchasedDateCalendar
            purchasedDate={purchasedDate}
            handleCalendarChange={this.handleCalendarChange}
            setInvalidState={this.setInvalidState} />

          <button className="btn btn-outline-info" type="submit">Edit Stock</button>
          <button className="btn btn-outline-danger" onClick={this.closePrompt}>Cancel</button>
        </form>
      </div>
    )
  }
}

EditStock.propTypes = {
  stock: React.PropTypes.object.isRequired,
  editStock: React.PropTypes.func.isRequired
}

