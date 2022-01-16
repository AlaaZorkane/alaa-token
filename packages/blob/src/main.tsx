import React from "react";
import ReactDOM from "react-dom";
import "@solana/wallet-adapter-react-ui/styles.css";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
