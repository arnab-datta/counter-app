import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {disabled: true, description: props.description};

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  // Handle Description change
  handleDescriptionChange(event) {
    let prevDescription = this.props.description,
      currentDescription = event.target.value;

    if( prevDescription !== currentDescription ){
      this.setState({...this.state, disabled: false});
    }

    this.props.handleDescriptionChange(this.props.counter, currentDescription)
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-1">
            <span style={{ fontSize: 24 }} className={this.getBadgeClasses()}>
              {this.formatCount()}
            </span>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-secondary"
              onClick={() => this.props.onIncrement(this.props.counter)}
            >
              <i className="fa fa-plus-circle" aria-hidden="true" />
            </button>
            <button
              className="btn btn-info m-2"
              onClick={() => this.props.onDecrement(this.props.counter)}
              disabled={this.props.counter.value === 0 ? "disabled" : ""}
            >
              <i className="fa fa-minus-circle" aria-hidden="true" />
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.props.onDelete(this.props.counter.id)}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
            <input type="text" className="form-control d-inline w-50 m-2 description" placeholder="Description">
            </input>
            <button
              className={`btn d-inline 
                ${ !this.state.disabled ? "btn-primary" : "" } 
                ${ this.state.disabled ? "btn-light" : "" }`
              }
              value={this.state.description}
              onChange={(evt) => this.handleDescriptionChange(evt)}
            >
              Save
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
