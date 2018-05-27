import React, { Component } from "react";

export function withStripe(WrappedComponent, publicKey, secretKey) {
  const request = async (route, key, method, postData) => {
      let dataString =null;
    if (postData) {
      dataString = Object.keys(postData).map(k => {
          return `${k}=${postData[k]}`;
        })
        .join("&");
    }
    console.log(dataString);
    const response = await fetch("https://api.stripe.com/v1/" + route, {
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: dataString
    });
    return await response.json();
  };

  return class extends Component {
    postPublic(route, postData) {
      return request(route, publicKey, "POST", postData);
    }
    postSecret(route, postData) {
      return request(route, secretKey, "POST", postData);
    }

    getSecret(route) {
      return request(route, secretKey, "GET", null);
    }

    render() {
      return (
        <WrappedComponent
          postPublic={this.postPublic}
          postSecret={this.postSecret}
          getSecret={this.getSecret}
          {...this.props}
        />
      );
    }
  };
}
