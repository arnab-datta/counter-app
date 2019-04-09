import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-1">
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </div>
          <div className="col">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => this.props.onIncrement(this.props.counter)}
            >
              +
            </button>
            <button
              className="btn btn-secondary btn-sm m-2"
              onClick={() => this.props.onDecrement(this.props.counter)}
              disabled={this.props.counter.value === 0 ? "disabled" : ""}
            >
              -
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.props.onDelete(this.props.counter.id)}
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }

  getBadgeClasses = () => {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  };

  formatCount = () => {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  };
}

export default Counter;
