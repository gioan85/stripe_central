import React, { Component } from "react";

export default class Checkouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
    this.getPayments = this.getPayments.bind(this);
  }

  componentDidMount() {
    this.getPayments();
  }

  async getPayments() {
    this.setState({
      loading: true
    });
    const chargeData = await this.props.getSecret("charges");
    this.setState({
      data: chargeData.data,
      loading: false
    });
  }

  render() {
  const payments = this.state.data.map( payment => <Payment payment={payment} />);
    return (
      <div>
        <h2 />
        <div>
          <h2>Payments</h2>
          {this.props.loading ? <div>Loading ...</div> : null}
          <table>
            <thead>
              <tr>
                <td>Id</td>
                <td>Amount</td>
                <td>Refunded</td>
                <td>Disputed</td>
                <td>Refund</td>
              </tr>
            </thead>
            <tbody>{payments}</tbody>
          </table>
        </div>
      </div>
      
    );
  }
}

class Payment extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.payment.id}</td>
        <td>{this.props.payment.amount}</td>
        <td>{this.props.payment.refunded.toString()}</td>
        <td>{(this.props.payment.dispute != null).toString()}</td>
        <td>{this.props.payment.refundReason}</td>
        <td>
          <button
            disable={this.props.payment.refunded || this.props.payment.dispute}
          />
        </td>
      </tr>
    );
  }
}
