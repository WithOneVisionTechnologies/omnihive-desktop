import React from "react";
import styles from "./ToastContainer.module.scss";

export const ToastContainer: React.FC = (props): React.ReactElement => {
    return <div className={styles.toastOuterContainer}>{props.children}</div>;
};
