import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag 1", "tag 2", "tag 3"]
  };

  // constructor(props) {
  //   super(props);
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }

  handleIncrement = product => {
    // console.log("Increment Clicked", this);
    console.log(product);
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.handleIncrement({ id: 1 })}
        >
          Increment
        </button>
        {/* {this.state.tags.length === 0 && "Please create new tags !"} */}
        {/* <ul>{this.renderTags()}</ul> */}
      </div>
    );
  }

  renderTags = () => {
    if (this.state.tags.length === 0) return <p>There are no tags !</p>;
    return this.state.tags.map(tag => <li key={tag}>{tag}</li>);
  };

  getBadgeClasses = () => {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  };

  formatCount = () => {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  };
}

export default Counter;
