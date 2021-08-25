import React from "react";
import { ToastContainer } from "./ToastContainer";
import toastStyles from "./ToastCommon.module.css";
import styles from "./ToastWarning.module.css";

export interface ToastWarningProps {
    show: boolean;
    message: string;
}

export const ToastWarning: React.FC<ToastWarningProps> = (props): React.ReactElement => {
    return (
        <>
            {props.show && (
                <ToastContainer>
                    <div className={`${toastStyles.toastCommonContainer} ${styles.toastWarningContainer}`}>
                        <div className={toastStyles.toastCommonIconContainer}>
                            <img
                                src="/assets/images/sharedComponents/toastWarning.png"
                                alt="warning"
                                className={toastStyles.toastCommonIcon}
                            />
                        </div>
                        <div className={`${toastStyles.toastCommonMessage} ${styles.toastWarningMessage}`}>
                            {props.message}
                        </div>
                    </div>
                </ToastContainer>
            )}
        </>
    );
};
