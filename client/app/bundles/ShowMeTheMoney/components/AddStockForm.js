import React, { PropTypes } from 'react';
import classnames from 'classnames';
import stockExists from '../utils/validations/stockValidation';

export default class AddStockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
      shares: '',
      errors: {},
      invalid: false
    }

    this.handleChange         = this.handleChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.validateStockExists  = this.validateStockExists.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    $('#add-stock-modal').modal('hide');
    this.setState({ ticker: '', shares: '' });
  }

  validateStockExists(e) {
    const ticker = e.target.value;

    if (ticker != '') {
      let errors = this.state.errors;

      stockExists(this.state.ticker).then(response => {
        if (response.data.query.results.quote.Name !== null) {
          errors.ticker = '';
        } else {
          errors.ticker = `${ticker.toUpperCase()} is an invalid stock.`
        }

        this.setState({ errors });
      });

    }
  }

  render() {
    const { errors } = this.state;

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
                <div className={classnames("form-group", "row", { 'has-danger': errors.ticker })}>
                  <label htmlFor="input-ticker" className="col-sm-4 col-form-label">Stock Ticker: </label>
                  <div className="col-7">
                    <input
                      name="ticker"
                      className="form-control form-control-danger"
                      id="input-ticker"
                      type="text"
                      value={this.state.ticker}
                      onChange={this.handleChange}
                      onBlur={this.validateStockExists}
                      placeholder="AAPL"
                    />
                    <div className="form-control-feedback">{errors.ticker}</div>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="input-shares" className="col-sm-4 col-form-label">Shares: </label>
                  <div className="col-7">
                    <input
                      name="shares"
                      className="form-control"
                      id="input-shares"
                      value={this.state.shares}
                      onChange={this.handleChange}
                      placeholder="Shares"
                    />
                  </div>
                </div>
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
    );
  }
}

AddStockForm.propTypes = {
  stocks: React.PropTypes.object.isRequired,
  getStockData: React.PropTypes.func.isRequired
}


