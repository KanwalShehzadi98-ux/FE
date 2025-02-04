import React from 'react';
import './Navbar.css';  

const Navbar = ({ accuracy, precision, recall, f1Score, auc }) => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item accuracy">
          <span className="navbar-label">Accuracy</span>
          <span className="navbar-value">{accuracy}%</span>
        </li>
        <li className="navbar-item precision">
          <span className="navbar-label">Precision</span>
          <span className="navbar-value">{precision}%</span>
        </li>
        <li className="navbar-item recall">
          <span className="navbar-label">Recall</span>
          <span className="navbar-value">{recall}%</span>
        </li>
        <li className="navbar-item f1-score">
          <span className="navbar-label">F1 Score</span>
          <span className="navbar-value">{f1Score}%</span>
        </li>
        <li className="navbar-item auc">
          <span className="navbar-label">AUC-ROC</span>
          <span className="navbar-value">{auc}%</span>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
