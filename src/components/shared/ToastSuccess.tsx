import React from "react";
import { ToastContainer } from "./ToastContainer";
import toastStyles from "./ToastCommon.module.css";
import styles from "./ToastSuccess.module.css";

export interface ToastSuccessProps {
    show: boolean;
    message: string;
}

export const ToastSuccess: React.FC<ToastSuccessProps> = (props): React.ReactElement => {
    return (
        <>
            {props.show && (
                <ToastContainer>
                    <div className={`${toastStyles.toastCommonContainer} ${styles.toastSuccessContainer}`}>
                        <div className={toastStyles.toastCommonIconContainer}>
                            <img
                                src="/assets/images/sharedComponents/toastSuccess.png"
                                alt="success"
                                className={toastStyles.toastCommonIcon}
                            />
                        </div>
                        <div className={`${toastStyles.toastCommonMessage} ${styles.toastSuccessMessage}`}>
                            {props.message}
                        </div>
                    </div>
                </ToastContainer>
            )}
        </>
    );
};
