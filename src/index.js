import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Use BrowserRouter here
import App from "./App";  // Import App component
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <App />  {/* App component is wrapped by BrowserRouter */}
  </BrowserRouter>,
  document.getElementById("root")
);
