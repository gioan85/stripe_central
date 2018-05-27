import React, { Component } from "react";
import "./Checkout.css"

export default class Checkouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestCharge: "",
      cardNumber:'',
      cardExpMonth: '',
      cardExpYear:'',
      amount:'0',
      error_:null
    };

    this.creatCharge = this.creatCharge.bind(this);
  }

  async creatCharge() {
    
    this.setState({
      cardExpMonth: this.refs.inputCardExpMonth.value,
      cardExpYear: this.refs.inputCardExpYear.value,
    })

    this.setState({
      latestCharge: "Creating token.."
    });
    
    const creditCardDetails = {
      "card[number]": this.state.cardNumber,
      "card[exp_month]": this.state.cardExpMonth,
      "card[exp_year]": this.state.cardExpYear
    };

    const tokenData = await this.props.postPublic("tokens",creditCardDetails);
    if(!tokenData.id)
    {
      this.setState({
        latestCharge: tokenData.error.message
      });
      return;
    }  
    this.setState({
      latestCharge: "Creating charge"
    });

    const chargeData = await this.props.postSecret("charges", {
      amount: this.state.amount,
      currency: "usd",
      description: "test charge coderShool",
      source: tokenData.id
    });
    if(!chargeData.id)
    {
      this.setState({
        latestCharge: chargeData.error.message
      });
      return;
    }  
    this.setState({
      latestCharge: 'Success!!! Token id is ' + chargeData.id,
      cardNumber:'',
      cardExpMonth:'',
      cardExpYear:'',
      amount:'0',
      error_:''
    });
  }

  render() {
    return (
      <div className="row">
        <table>
          <tr>
            <td><h2>Card detail</h2></td>
            <td></td>
          </tr>
          <tr>
            <td>Card number:</td>
            <td> <input className="input" type="text" maxLength="16" value={this.state.cardNumber} onChange={ele => this.setState({cardNumber: ele.target.value})}/></td>
          </tr>
          <tr>
            <td>Exp Month:</td>
            <td>
              <select onChange={ele => this.setState({cardExpMonth: ele.target.value})} ref="inputCardExpMonth">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => <option value={month} selected={month === 1}>{month}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td>Exp Year:</td>
            <td>
            <select onChange={ele => this.setState({cardExpYear: ele.target.value})}  ref="inputCardExpYear">
                <option value={2018} selected>2018</option>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Amount</td>
            <td><input type="number" value={this.state.amount} onChange={ele => this.setState({amount: ele.target.value})} /></td>
          </tr>
        </table>
        
        <div>
          <h2>Card number: {this.state.cardNumber}</h2>
          <h2>Expire month: {this.state.cardExpMonth}</h2>
          <h2>Expire Year: {this.state.cardExpYear}</h2>
          <h2>Amount: {this.state.amount}</h2>
          <button onClick={this.creatCharge}>Pay</button>
          <h3>{this.state.latestCharge}</h3>
          <h3>{this.state.error_}</h3>
        </div>
      </div>
    );
  }
}
