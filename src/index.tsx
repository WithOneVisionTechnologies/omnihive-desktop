import React from "react";
import ReactDOM from "react-dom";
import App from "./modules/App";
import "animate.css";
import "./index.css";

function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById("root")
    );
}

render();
