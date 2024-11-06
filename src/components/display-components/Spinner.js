import React from 'react';
import './Spinner.css';
const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;