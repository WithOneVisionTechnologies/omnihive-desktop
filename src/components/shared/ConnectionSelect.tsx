import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import styles from "./ConnectionSelect.module.scss";
import { RegisteredServerModel } from "../../lib/models/RegisteredServerModel";
import { ServerStatus } from "@withonevision/omnihive-core/enums/ServerStatus";

const connections: RegisteredServerModel[] = [
    {
        address: "https://omnihivedev.12stone.church/remote-admin",
        adminPassword: "dS2sS0aN7tI7fD9oJ0tO0eV4zA5vE3gC",
        serverGroupId: "e400fc13-f9de-45e3-9307-5c8319c879e5",
        label: "12Stone-Dev",
        status: ServerStatus.Online,
        urls: [],
    },
    {
        address: "address2",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Error Test",
        status: ServerStatus.Error,
        urls: [],
    },
    {
        address: "address3",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Offline Test",
        status: ServerStatus.Offline,
        urls: [],
    },
    {
        address: "address4",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Admin Test",
        status: ServerStatus.Admin,
        urls: [],
    },
    {
        address: "address5",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Rebuilding Test",
        status: ServerStatus.Rebuilding,
        urls: [],
    },
    {
        address: "address6",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Unknown Test",
        status: ServerStatus.Unknown,
        urls: [],
    },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export interface ConnectionSelectProps {
    connection?: RegisteredServerModel;
    setConnection: (value: RegisteredServerModel) => void;
}

const ConnectionSelect: React.FC<ConnectionSelectProps> = (props): React.ReactElement => {
    const getStatusColor = (status?: ServerStatus): string => {
        switch (status) {
            case ServerStatus.Admin:
                return "bg-omnihiveStatusOrange";
            case ServerStatus.Error:
                return "bg-omnihiveStatusRed";
            case ServerStatus.Offline:
                return "bg-omnihiveStatusRed";
            case ServerStatus.Online:
                return "bg-omnihiveStatusGreen";
            case ServerStatus.Rebuilding:
                return "bg-omnihiveStatusYellow";
            case ServerStatus.Unknown:
                return "bg-omnihiveStatusGrey";
            default:
                return "bg-omnihiveStatusGrey";
        }
    };

    return (
        <Listbox value={props.connection} onChange={props.setConnection}>
            {({ open }: { open: boolean }) => (
                <>
                    <div className={styles.connectionSelect}>
                        <Listbox.Button className={styles.connectionSelectButton}>
                            <div className={styles.connectionSelectButtonView}>
                                <span
                                    aria-label={props.connection?.status}
                                    className={classNames(
                                        getStatusColor(props.connection?.status),
                                        styles.connectionSelectButtonViewStatus
                                    )}
                                />
                                <span className={styles.connectionSelectButtonViewText}>
                                    {props.connection?.label ?? "No Connection"}
                                </span>
                                <span className={styles.connectionSelectListItemViewSelected}>
                                    <img
                                        className={styles.connectionSelectListItemViewSelectedImage}
                                        src={`${process.env.PUBLIC_URL}/images/sharedComponents/down-chevron.svg`}
                                    />
                                </span>
                            </div>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className={styles.connectionSelectList}>
                                {connections.map((connection) => (
                                    <Listbox.Option
                                        key={connection.label}
                                        className={styles.connectionSelectListItem}
                                        value={connection}
                                    >
                                        {({ selected }: { selected: boolean }) => (
                                            <>
                                                <div className={styles.connectionSelectListItemView}>
                                                    <span
                                                        className={classNames(
                                                            getStatusColor(connection.status),
                                                            styles.connectionSelectListItemViewStatus
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        className={classNames(
                                                            selected ? "font-semibold" : "font-normal",
                                                            styles.connectionSelectListItemViewText
                                                        )}
                                                    >
                                                        {connection.label}
                                                        <span className="sr-only"> is {connection.status}</span>
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span className={styles.connectionSelectListItemViewSelected}>
                                                        <img
                                                            className={styles.connectionSelectListItemViewSelectedImage}
                                                            src={`${process.env.PUBLIC_URL}/images/sharedComponents/check.svg`}
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};

export default ConnectionSelect;
