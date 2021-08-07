import { AdminEventType } from "@withonevision/omnihive-core/enums/AdminEventType";
import { ServerStatus } from "@withonevision/omnihive-core/enums/ServerStatus";
import { IsHelper } from "@withonevision/omnihive-core/helpers/IsHelper";
import { AdminResponse } from "@withonevision/omnihive-core/models/AdminResponse";
import isIp from "is-ip";
import { useAtom } from "jotai";
import React from "react";
import socketio from "socket.io-client";
import { DesktopConstants } from "../../lib/models/DesktopConstants";
import { RegisteredServerModel } from "../../lib/models/RegisteredServerModel";
import { atomRegisteredServers } from "../../lib/stores/AppStore";
import { ToastError } from "../shared/ToastError";
import { ToastSuccess } from "../shared/ToastSuccess";
import formStyles from "../FormStyles.module.scss";
import styles from "./AddEditServer.module.scss";

export interface AddEditServerProps {
    editServerLabel?: string;
    mode: string;
}

const AddEditServer: React.FC<AddEditServerProps> = (props): React.ReactElement => {
    let oldServerLabel: string = "";

    if (!IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(props.editServerLabel)) {
        oldServerLabel = props.editServerLabel;
    }

    const [serverLabel, setServerLabel] = React.useState<string>("");
    const [serverAddress, setServerAddress] = React.useState<string>("");
    const [adminPassword, setAdminPassword] = React.useState<string>("");
    const [serverGroupId, setServerGroupId] = React.useState<string>("");
    const [processing, setProcessing] = React.useState<boolean>(false);
    const [showToastSuccess, setShowToastSuccess] = React.useState<boolean>(false);
    const [showToastError, setShowToastError] = React.useState<boolean>(false);
    const [toastErrorMessage, setToastErrorMessage] = React.useState<string>("");
    const [labelError, setLabelError] = React.useState<string>("");
    const [addressError, setAddressError] = React.useState<string>("");
    const [adminPasswordError, setAdminPasswordError] = React.useState<string>("");
    const [serverGroupIdError, setServerGroupIdError] = React.useState<string>("");

    const [registeredServers, setRegisteredServers] = useAtom(atomRegisteredServers);

    React.useEffect(() => {
        if (props.mode.toLowerCase() === "edit") {
            const workerServer: RegisteredServerModel | undefined = registeredServers.find(
                (server: RegisteredServerModel) => server.label === props.editServerLabel
            );

            if (IsHelper.isNullOrUndefined(workerServer)) {
                return;
            }

            setServerLabel(workerServer.label);
            setServerAddress(workerServer.address);
            setServerGroupId(workerServer.serverGroupId);
            setAdminPassword(workerServer.adminPassword);
        }
    }, []);

    const capitalize = (s: string) => {
        if (!IsHelper.isString(s)) return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const checkLabel = (value: string) => {
        if (IsHelper.isEmptyStringOrWhitespace(value)) {
            setLabelError("Server label cannot be blank");
            return;
        }

        if (
            props.mode.toLowerCase() === "add" &&
            registeredServers.filter((server: RegisteredServerModel) => {
                return server.label === value;
            }).length > 0
        ) {
            setLabelError("You already have a server with this label in use");
            return;
        }

        if (
            props.mode.toLowerCase() === "edit" &&
            value !== oldServerLabel &&
            registeredServers.filter((server: RegisteredServerModel) => {
                return server.label === value;
            }).length > 0
        ) {
            setLabelError("You already have a server with this label in use");
            return;
        }

        setLabelError("");
    };

    const checkAddress = (value: string) => {
        try {
            new URL(value);
        } catch {
            if (!isIp(value)) {
                setAddressError("Address must be a valid URL or a valid IP Address");
                return;
            }
        }

        setAddressError("");
    };

    const checkServerGroupId = (value: string) => {
        if (IsHelper.isEmptyStringOrWhitespace(value)) {
            setServerGroupIdError("Server Group ID cannot be blank");
            return;
        }

        setServerGroupIdError("");
    };

    const checkAdminPassword = (value: string) => {
        if (IsHelper.isEmptyStringOrWhitespace(value)) {
            setAdminPasswordError("Admin password cannot be blank");
            return;
        }

        setAdminPasswordError("");
    };

    const disableSubmit = (): boolean => {
        if (processing) {
            return true;
        }

        if (
            IsHelper.isEmptyStringOrWhitespace(serverLabel) ||
            IsHelper.isEmptyStringOrWhitespace(serverAddress) ||
            IsHelper.isEmptyStringOrWhitespace(adminPassword) ||
            IsHelper.isEmptyStringOrWhitespace(serverGroupId)
        ) {
            return true;
        }

        if (
            !IsHelper.isEmptyStringOrWhitespace(labelError) ||
            !IsHelper.isEmptyStringOrWhitespace(addressError) ||
            !IsHelper.isEmptyStringOrWhitespace(adminPasswordError) ||
            !IsHelper.isEmptyStringOrWhitespace(serverGroupIdError)
        ) {
            return true;
        }

        if (props.mode.toLowerCase() === "edit") {
            const workerServer: RegisteredServerModel | undefined = registeredServers.find(
                (server: RegisteredServerModel) => server.label === props.editServerLabel
            );

            if (IsHelper.isNullOrUndefined(workerServer)) {
                return true;
            }

            return (
                workerServer.address == serverAddress &&
                workerServer.adminPassword === adminPassword &&
                workerServer.label === serverLabel &&
                workerServer.serverGroupId === serverGroupId
            );
        }

        return false;
    };

    const hideToast = () => {
        setToastErrorMessage("");
        setShowToastError(false);
        setShowToastSuccess(false);
    };

    const showError = (error: string) => {
        setToastErrorMessage(error);
        setShowToastError(true);
        setShowToastSuccess(false);

        setTimeout(() => {
            hideToast();
        }, DesktopConstants.errorTimeout);
    };

    const showSuccess = () => {
        setToastErrorMessage("");
        setShowToastError(false);
        setShowToastSuccess(true);

        setTimeout(() => {
            hideToast();
        }, DesktopConstants.successTimeout);
    };

    const submit = async () => {
        setProcessing(true);

        const serverModel: RegisteredServerModel = {
            adminPassword,
            serverGroupId: serverGroupId,
            label: serverLabel,
            address: serverAddress,
            status: ServerStatus.Unknown,
            urls: [],
        };

        const url: URL = new URL(serverAddress);
        const socket = socketio(`${url.origin}/${serverGroupId}`, {
            path: `${url.pathname === "/" ? "" : url.pathname}/socket.io`,
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            socket.emit(AdminEventType.RegisterRequest, {
                adminPassword: serverModel.adminPassword,
                serverGroupId: serverModel.serverGroupId,
            });
        });

        socket.on("connect_error", () => {
            setProcessing(false);
            showError("Server Cannot Be Contacted");
            socket.disconnect();
        });

        socket.on(AdminEventType.RegisterResponse, (message: AdminResponse<{ verified: boolean }>) => {
            if (message.serverGroupId !== serverGroupId) {
                return;
            }

            socket.disconnect();

            if (
                IsHelper.isNullOrUndefined(message) ||
                !message.requestComplete ||
                IsHelper.isNullOrUndefined(message.data) ||
                !message.data.verified
            ) {
                showError(message.requestError ?? "");
                setProcessing(false);
                return;
            }

            showSuccess();

            setTimeout(() => {
                setProcessing(false);
            }, DesktopConstants.successTimeout);
        });
    };

    return (
        <>
            <ToastSuccess show={showToastSuccess} message={`${capitalize(props.mode)} Server Successful...Saving...`} />
            <ToastError show={showToastError} message={toastErrorMessage} />
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.logoContainer}>
                        <img
                            className={styles.logoIcon}
                            alt="OmniHive Logo"
                            src={`${process.env.PUBLIC_URL}/images/common/oh_icon_light.png`}
                        />
                    </div>
                    <div className={styles.headerContainer}>
                        <div className={styles.headerTitle}>OMNIHIVE</div>
                        {props.mode.toLowerCase() === "add" && <div className={styles.headerSubtitle}>ADD SERVER</div>}
                        {props.mode.toLowerCase() === "edit" && (
                            <div className={styles.headerSubtitle}>EDIT SERVER</div>
                        )}
                    </div>
                    <div>
                        <div className={formStyles.ohFormInputContainer}>
                            <label className={formStyles.ohFormInputLabel}>Server Label</label>
                            <input
                                className={`${formStyles.ohFormInput} ${
                                    labelError !== "" ? formStyles.ohFormErrorInputBorder : ""
                                }`}
                                type="text"
                                name="serverLabel"
                                value={serverLabel}
                                onChange={(e) => {
                                    setServerLabel(e.target.value);
                                    checkLabel(e.target.value);
                                }}
                            />
                            {labelError !== "" && <div className={formStyles.ohFormError}>{labelError}</div>}
                        </div>
                        <div className={formStyles.ohFormInputContainer}>
                            <label className={formStyles.ohFormInputLabel}>
                                Server Address (Include Protocol and Port Number)
                            </label>
                            <input
                                className={`${formStyles.ohFormInput} ${
                                    addressError !== "" ? formStyles.ohFormErrorInputBorder : ""
                                }`}
                                type="text"
                                name="serverAddress"
                                value={serverAddress}
                                onChange={(e) => {
                                    setServerAddress(e.target.value);
                                    checkAddress(e.target.value);
                                }}
                            />
                            {addressError !== "" && <div className={formStyles.ohFormError}>{addressError}</div>}
                        </div>
                        <div className={formStyles.ohFormInputContainer}>
                            <label className={formStyles.ohFormInputLabel}>Server Group ID</label>
                            <input
                                className={`${formStyles.ohFormInput} ${
                                    serverGroupIdError !== "" ? formStyles.ohFormErrorInputBorder : ""
                                }`}
                                type="password"
                                name="serverGroupId"
                                value={serverGroupId}
                                onChange={(e) => {
                                    setServerGroupId(e.target.value);
                                    checkServerGroupId(e.target.value);
                                }}
                            />
                            {serverGroupIdError !== "" && (
                                <div className={formStyles.ohFormError}>{serverGroupIdError}</div>
                            )}
                        </div>
                        <div className={formStyles.ohFormInputContainer}>
                            <label className={formStyles.ohFormInputLabel}>Admin Password</label>
                            <input
                                className={`${formStyles.ohFormInput} ${
                                    adminPasswordError !== "" ? formStyles.ohFormErrorInputBorder : ""
                                }`}
                                type="password"
                                name="adminPassword"
                                value={adminPassword}
                                onChange={(e) => {
                                    setAdminPassword(e.target.value);
                                    checkAdminPassword(e.target.value);
                                }}
                            />
                            {adminPasswordError !== "" && (
                                <div className={formStyles.ohFormError}>{adminPasswordError}</div>
                            )}
                        </div>
                        <div className={styles.registerContainer}>
                            {disableSubmit() && !processing && (
                                <button
                                    disabled={true}
                                    className={`${styles.registerButton} ${styles.registerButtonDisabled}`}
                                >
                                    {props.mode.toLowerCase() === "add" && <span>Register</span>}
                                    {props.mode.toLowerCase() === "edit" && <span>Edit</span>}
                                </button>
                            )}
                            {!disableSubmit() && !processing && (
                                <button onClick={submit} className={styles.registerButton}>
                                    {props.mode.toLowerCase() === "add" && <span>Register</span>}
                                    {props.mode.toLowerCase() === "edit" && <span>Edit</span>}
                                </button>
                            )}
                            {processing && (
                                <button disabled={true} className={styles.registerButton}>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/common/spinner.png`}
                                        alt="spinner"
                                        className={styles.registerSpinner}
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEditServer;
