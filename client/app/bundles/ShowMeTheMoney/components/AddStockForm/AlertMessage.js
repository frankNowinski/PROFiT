import React from 'react';

export default function AlertMessage(props) {
  const validAlert = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Added {props.ticker.toUpperCase()} to your portfolio.
      </div>
    )
  }

  const invalidAlert = () => {
    return (
      <div className='alert alert-danger' role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Unable to add stock to your portfolio. {props.ticker}
      </div>
    )
  }

  return (
    <div> { props.invalid ? invalidAlert() : validAlert() }</div>
  )
}
