import DockLayout, { DividerBox, LayoutData } from "rc-dock";
import React from "react";
import { atomCurrentServerManagerTabId } from "../lib/stores/ServerManagerStore";
import "rc-dock/dist/rc-dock.css";
import styles from "./ServerManager.module.scss";
import { useAtom } from "jotai";

const defaultGroups = {
    default: { animated: false },
};

const defaultLayout: LayoutData = {
    dockbox: {
        mode: "vertical",
        children: [
            {
                id: "serverManagerDock",
                tabs: [
                    {
                        id: "tabStart",
                        title: <span title="Start Page">Start Page</span>,
                        closable: true,
                        group: "default",
                        content: (
                            <div>
                                <span style={{ color: "white" }}>Start Page</span>
                            </div>
                        ),
                    },
                ],
            },
        ],
    },
};

const ServerManager: React.FC = (): React.ReactElement => {
    const [currentServerManagerTabId, setCurrentServerManagerTabId] = useAtom(atomCurrentServerManagerTabId);
    const dockRef = React.useRef<DockLayout>(null);

    const addServer = () => {
        dockRef.current?.dockMove(
            {
                id: currentServerManagerTabId.toString(),
                title: <span title="Testing Add">Testing Add</span>,
                closable: true,
                group: "default",
                content: (
                    <div>
                        <span style={{ color: "white" }}>Testing Add</span>
                    </div>
                ),
            },
            "serverManagerDock",
            "middle"
        );

        const newTabId = currentServerManagerTabId + 1;
        setCurrentServerManagerTabId(newTabId);
    };

    return (
        <div>
            <DividerBox className={styles.managerDividerBox}>
                <div className={styles.serverTree}>
                    <div className={styles.serverTreeHeader}>
                        <div className={styles.serverTreeHeaderLeft}>OMNIHIVE SERVERS</div>
                        <div className={styles.serverTreeHeaderRight}>
                            <div className={styles.serverTreeHeaderButton} title="Add Server" onClick={addServer}>
                                <img src={`${process.env.PUBLIC_URL}/images/manager/add.png`} />
                            </div>
                            <div className={styles.serverTreeHeaderButton} title="Remove All Servers">
                                <img src={`${process.env.PUBLIC_URL}/images/manager/trash.png`} />
                            </div>
                        </div>
                    </div>
                </div>
                <DockLayout
                    style={{ width: "75%" }}
                    ref={dockRef}
                    groups={defaultGroups}
                    defaultLayout={defaultLayout}
                />
            </DividerBox>
        </div>
    );
};

export default ServerManager;
