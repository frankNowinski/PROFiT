import React from 'react';

export default class EditStock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shares: props.stock.shares,
      purchasedDate: props.stock.purchasedDate
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  }

  render() {
    return (
      <button className="btn btn-outline-success">Edit Stock</button>
    )
  }
}
