import React, { PropTypes } from 'react';
import StockInput from './StockInput';
import SharesInput from './SharesInput';
import PurchasedDateCalendar from './PurchasedDateCalendar';
import moment from 'moment';

export default class AddStockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
      shares: '',
      purchasedDate: moment(),
    }

    this.handleChange         = this.handleChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCalendarChange(date) {
    this.setState({ purchasedDate: date })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    $('#add-stock-modal').modal('hide');
    this.setState({ ticker: '', shares: '', purchasedDate: moment() });
  }

  render() {
    return (
      <div>
        <button className='btn btn-outline-primary' type="button" data-toggle="modal" data-target="#add-stock-modal">Add Stock</button>

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
                    ticker={this.state.ticker}
                    handleChange={this.handleChange} />

                  <SharesInput
                    shares={this.state.shares}
                    handleChange={this.handleChange} />

                  <PurchasedDateCalendar
                    purchasedDate={this.state.purchasedDate}
                    handleCalendarChange={this.handleCalendarChange} />

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-outline-primary" onClick={this.handleSubmit}>Add Stock</button>
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
  stocks: React.PropTypes.object.isRequired,
  getStockData: React.PropTypes.func.isRequired
}

