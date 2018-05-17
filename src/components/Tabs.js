import React, { Component } from "react";

export default class Tabs extends Component {
  constructor(props) {
    super(props),
      this.state = {
        selected: "Checkouts"
      };
  }
  render() {
    const tabs = React.Children.map(this.props.children, child => {
      const className =
        child.props.name === this.state.selected ? "selected" : "unselected";
      return (
        <h1
          className={className}
          onClick={() => this.setState({ selected: child.props.name })}
        >
          {child.props.name}
        </h1>
      );
    });

    const body = React.Children
                  .toArray(this.props.children)
                  .find( (elem) => elem.props.name === this.state.selected)
                  .props.children

    return (
      <div className="holder">
        <div className="tabs">{tabs}</div>
        <div className="body">{body}</div>
      </div>
    );
  }
}
