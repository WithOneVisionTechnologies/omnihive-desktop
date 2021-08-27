import React from "react";
import ReactDOM from "react-dom";
import App from "./modules/App";

import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { DesktopConstants } from "./lib/models/DesktopConstants";

import "animate.css";
import "./index.css";

async function render() {
    const LDProvider = await asyncWithLDProvider({
        clientSideID: process.env.LAUNCH_DARKLY_CLIENT_SIDE_KEY,
        user: {
            key: DesktopConstants.launchDarklyAnonymousUser,
            anonymous: true,
        },
    });

    ReactDOM.render(
        <LDProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </LDProvider>,
        document.getElementById("root")
    );
}

render();
