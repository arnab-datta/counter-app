import React from 'react';

const Total = ({value}) => (
  <div className="row">
    <div className="col-md-1">
      <span style={{ fontSize: 24 }} className="badge m-2 badge-">
        Total
      </span>
    </div>
    <div className="col-md-1">
      <span style={{ fontSize: 24 }} className="badge m-2 badge-">
        {value}
      </span>
    </div>
  </div>
);

export default Total;
