import React from 'react';

export default function AlertMessage(props) {
  const stockTicker = props.ticker.toUpperCase();

  const validAlert = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Added {stockTicker} to your portfolio.
      </div>
    )
  }

  const invalidAlert = () => {
    return (
      <div className='alert alert-danger' role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Unable to add {stockTicker} your portfolio.
      </div>
    )
  }

  return (
    <div> { props.invalid ? invalidAlert() : validAlert() }</div>
  )
}
