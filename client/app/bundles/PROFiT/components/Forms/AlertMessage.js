import React from 'react';
import PropTypes from 'prop-types';

export default function AlertMessage(props) {
  const message = props.message;

  const validAlert = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        {message}
      </div>
    )
  }

  const invalidAlert = () => {
    return (
      <div className='alert alert-danger' role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        {message}
      </div>
    )
  }

  return (
    <div> { props.invalid ? invalidAlert() : validAlert() }</div>
  )
}

AlertMessage.propTypes = {
  invalid: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
}
