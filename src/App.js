import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Overview from "./Overview/Overview"; // Import Overview component
import Analytics from "./Analytics/Analytics";
import "./App.css";
import Download from "./Downloads/Download";

function App() {
  const accuracy = 95;
  const precision = 92;
  const recall = 89;
  const f1Score = 90;
  const aucROC = 92;  // Example AUC-ROC value

  return (
    <div className="app">
      <Layout 
        accuracy={accuracy} 
        precision={precision} 
        recall={recall} 
        f1Score={f1Score} 
        aucROC={aucROC}  
      />
      <div className="content">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/analytics" element={<Analytics/>} />
          <Route path="/download" element={<Download/>} />
          <Route path="/project-info" element={<h1>Project Info</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
