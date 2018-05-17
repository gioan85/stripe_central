import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Tabs from "./components/Tabs.js";
import Tab from "./components/Tab.js";
import Checkouts from "./components/payment/Checkout.js";
import Payments from "./components/payment/Payment.js";
import { withStripe } from "./StripeApi.js";

const {publicKey, secretKey} = require('./env.json');

const SuperCheckout = withStripe(Checkouts, publicKey, secretKey);
const SuperPayment = withStripe(Payments, publicKey, secretKey);

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tabs>
        <Tab name="Checkouts" selected="true">
          <h2>Hello Checkouts</h2>
          <SuperCheckout />
        </Tab>
        <Tab name="Payments">
          <h2>Hello Payments</h2>
          <SuperPayment />
        </Tab>
      </Tabs>
    );
  }
}

export default App;
