import React from "react";
import { ToastContainer } from "./ToastContainer";
import toastStyles from "./ToastCommon.module.scss";
import styles from "./ToastError.module.scss";

export interface ToastErrorProps {
    show: boolean;
    message: string;
}

export const ToastError: React.FC<ToastErrorProps> = (props): React.ReactElement => {
    return (
        <>
            {props.show && (
                <ToastContainer>
                    <div className={`${toastStyles.toastCommonContainer} ${styles.toastErrorContainer}`}>
                        <div className={toastStyles.toastCommonIconContainer}>
                            <img
                                src={`${process.env.PUBLIC_URL}/images/sharedComponents/toastError.png`}
                                alt="error"
                                className={toastStyles.toastCommonIcon}
                            />
                        </div>
                        <div className={`${toastStyles.toastCommonMessage} ${styles.toastErrorMessage}`}>
                            <p className={styles.toastErrorMessageBody}>{props.message}</p>
                        </div>
                    </div>
                </ToastContainer>
            )}
        </>
    );
};
