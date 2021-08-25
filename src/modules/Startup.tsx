import React from "react";
import styles from "./Startup.module.css";

const Startup: React.FC = (): React.ReactElement => {
    return (
        <div className={`animate__animated animate__fadeInLeft ${styles.outerContainer}`}>
            Welcome to the OmniHive Desktop
        </div>
    );
};

export default Startup;
