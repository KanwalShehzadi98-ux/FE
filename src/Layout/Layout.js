import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar"; 

const Layout = ({ accuracy, precision, recall, f1Score, aucROC }) => {
  return (
    <div className="app-container">
      <Sidebar /> 
      <Navbar 
        accuracy={accuracy} 
        precision={precision} 
        recall={recall}
        f1Score={f1Score} 
        auc={aucROC} 
      />
    </div>
  );
};

export default Layout;
