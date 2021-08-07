import React from "react";
import { ToastContainer } from "./ToastContainer";
import toastStyles from "./ToastCommon.module.scss";
import styles from "./ToastWarning.module.scss";

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
                                src={`${process.env.PUBLIC_URL}/images/sharedComponents/toastWarning.png`}
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
