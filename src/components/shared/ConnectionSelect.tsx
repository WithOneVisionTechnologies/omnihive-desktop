import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import styles from "./ConnectionSelect.module.scss";
import { RegisteredServerModel } from "../../lib/models/RegisteredServerModel";
import { ServerStatus } from "@withonevision/omnihive-core/enums/ServerStatus";

type AvailableConnection = {
    id: number;
    name: string;
    status: string;
};

const connections: RegisteredServerModel[] = [
    {
        address: "address1",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Online Test",
        status: ServerStatus.Online,
        urls: [{ path: "https://example.url.com", type: "graphql", metadata: {} }],
    },
    {
        address: "address2",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Error Test",
        status: ServerStatus.Error,
        urls: [{ path: "https://example.url.com", type: "graphql", metadata: {} }],
    },
    {
        address: "address3",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Offline Test",
        status: ServerStatus.Offline,
        urls: [{ path: "https://example.url.com", type: "graphql", metadata: {} }],
    },
    {
        address: "address4",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Admin Test",
        status: ServerStatus.Admin,
        urls: [{ path: "https://example.url.com", type: "graphql", metadata: {} }],
    },
    {
        address: "address5",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Rebuilding Test",
        status: ServerStatus.Rebuilding,
        urls: [{ path: "https://example.url.com", type: "graphql", metadata: {} }],
    },
    {
        address: "address6",
        adminPassword: "password",
        serverGroupId: "123",
        label: "Unknown Test",
        status: ServerStatus.Unknown,
        urls: [{ path: "https://example.url.com", type: "graphql", metadata: {} }],
    },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function ConnectionSelect() {
    const [selected, setSelected] = useState(connections[3]);

    const getStatusColor = (status: ServerStatus): string => {
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
        <Listbox value={selected} onChange={setSelected}>
            {({ open }: { open: boolean }) => (
                <>
                    <div className={styles.connectionSelect}>
                        <Listbox.Button className={styles.connectionSelectButton}>
                            <div className={styles.connectionSelectButtonView}>
                                <span
                                    aria-label={selected.status}
                                    className={classNames(
                                        getStatusColor(selected.status),
                                        styles.connectionSelectButtonViewStatus
                                    )}
                                />
                                <span className={styles.connectionSelectButtonViewText}>{selected.label}</span>
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
                                        {({ selected, active }: { selected: boolean; active: boolean }) => (
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
}
