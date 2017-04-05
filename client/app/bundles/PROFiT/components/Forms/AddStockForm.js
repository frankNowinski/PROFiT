import React from 'react';
import AlertMessage from './AlertMessage';
import StockInput from '../inputs/StockInput';
import SharesInput from '../inputs/SharesInput';
import PurchasedDateCalendar from '../inputs/PurchasedDateCalendar';
import NotifyTrendChangeCheckbox from '../inputs/NotifyTrendChangeCheckbox';
import futureDate from '../../utils/validations/datePurchasedValidator';
import moment from 'moment';

export default class AddStockForm extends React.Component {
  state = {
      ticker: '',
      shares: '',
      purchasedDate: moment(),
      notifyTrendChange: false,
      notifyEmail: this.props.user.get('email'),
      invalid: false,
      submitted: false,
      message: ''
  }

  setInvalidState = (invalid) => {
    this.setState({ invalid });
  }

  setSubmittedState = () => {
    this.setState({ ticker: '', submitted: false });
  }

  alreadyOwned = (ticker) => {
    let ownedTickers = this.props.stocks.toJS().map(stock => stock.ticker);

    return ownedTickers.includes(ticker);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCalendarChange = (date) => {
    this.setState({ purchasedDate: date });
  }

  handleCheckboxClick = (e) =>{
    let checked = e.target.value === 'false' ? true : false;
    this.setState({ notifyTrendChange: checked });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = 'Unable to add stock to your portfolio.';

    if (this.validForm()) {
      this.props.addStock(this.state)
        .then(response => {
          if (response.base !== undefined) {
            this.setState({
              invalid: true,
              submitted: true,
              message: errorMsg
            });
          } else {
            let message = `Added ${response.ticker.toUpperCase()} to your portfolio.`;
            this.setState({
              shares: '',
              purchasedDate: moment(),
              notifyTrendChange: false,
              notifyEmail: '',
              invalid: false,
              submitted: true,
              message: message
            });
          }
        })
        .catch(error => {
          console.log(`Error adding stock: ${error}`);
        });

    } else {
      this.setState({ invalid: true, submitted: true, message: errorMsg });
    }

    $('#add-stock-modal').modal('hide');
  }

  validForm() {
    const { ticker, shares, purchasedDate } = this.state;

    return (ticker !== '' && !this.alreadyOwned(ticker) && shares !== '' && !futureDate(purchasedDate))
  }

  render() {
    const { ticker, shares, purchasedDate, notifyTrendChange } = this.state;

    return (
      <div className="text-center">
        { this.state.submitted ?
          <AlertMessage invalid={this.state.invalid} message={this.state.message}/>
          : null
        }

        <button className="btn btn-lg btn-primary add-stock-form-btn" type="button" data-toggle="modal" data-target="#add-stock-modal" onClick={this.setSubmittedState}>Add Stock</button>

        <div className="modal fade" id="add-stock-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLongTitle">Add Stock</h4>

                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body text-center">
                <form onSubmit={this.handleSubmit}>
                  <StockInput
                    ticker={ticker}
                    alreadyOwned={this.alreadyOwned}
                    handleChange={this.handleChange}
                    setInvalidState={this.setInvalidState} />

                  <SharesInput
                    shares={shares}
                    handleChange={this.handleChange}
                    setInvalidState={this.setInvalidState} />

                  <PurchasedDateCalendar
                    purchasedDate={purchasedDate}
                    handleCalendarChange={this.handleCalendarChange}
                    setInvalidState={this.setInvalidState} />

                  <NotifyTrendChangeCheckbox
                    notifyEmail={this.state.notifyEmail}
                    notifyTrendChange={notifyTrendChange}
                    handleChange={this.handleChange}
                    handleCheckboxClick={this.handleCheckboxClick} />

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-outline-primary" disabled={this.state.invalid} onClick={this.handleSubmit}>Add Stock</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddStockForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  stocks: React.PropTypes.object.isRequired,
  addStock: React.PropTypes.func.isRequired
}

