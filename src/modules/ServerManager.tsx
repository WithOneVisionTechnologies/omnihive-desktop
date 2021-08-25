import DockLayout, { DividerBox, DropDirection, LayoutBase, LayoutData } from "rc-dock";
import React from "react";
import "rc-dock/dist/rc-dock.css";
import styles from "./ServerManager.module.css";
import { IsHelper } from "@withonevision/omnihive-core/helpers/IsHelper";
import { useSnapshot } from "valtio";
import { IAppStore, AppStoreProxy } from "../lib/stores/AppStore";
import AddEditServer from "../components/serverManager/AddEditServer";

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
    const dockRef = React.useRef<DockLayout>(null);
    const appStoreSnap = useSnapshot<IAppStore>(AppStoreProxy);
    const [dockLayout, setDockLayout] = React.useState<LayoutData>(defaultLayout);

    const addServerClick = () => {
        dockRef.current?.dockMove(
            {
                id: appStoreSnap.globalTabNumber.toString(),
                title: <span title="Add New Server">Add New Server</span>,
                closable: true,
                group: "default",
                content: <AddEditServer mode="add" ref={dockRef} />,
            },
            "serverManagerDock",
            "middle"
        );

        AppStoreProxy.globalTabNumber++;
    };

    const onDockLayoutChange = (
        _newLayout: LayoutBase,
        _currentTabId?: string | undefined,
        _direction?: DropDirection | undefined
    ) => {
        if (!IsHelper.isNullOrUndefined(dockRef.current)) {
            setDockLayout(dockRef.current.getLayout());
        }
    };

    return (
        <div>
            <DividerBox className={styles.managerDividerBox}>
                <div className={styles.serverTree}>
                    <div className={styles.serverTreeHeader}>
                        <div className={styles.serverTreeHeaderLeft}>OMNIHIVE SERVERS</div>
                        <div className={styles.serverTreeHeaderRight}>
                            <div className={styles.serverTreeHeaderButton} title="Add Server" onClick={addServerClick}>
                                <img src="/assets/images/manager/add.png" />
                            </div>
                            <div className={styles.serverTreeHeaderButton} title="Remove All Servers">
                                <img src="/assets/images/manager/trash.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <DockLayout
                    style={{ width: "75%" }}
                    ref={dockRef}
                    groups={defaultGroups}
                    onLayoutChange={onDockLayoutChange}
                    defaultLayout={dockLayout}
                />
            </DividerBox>
        </div>
    );
};

export default ServerManager;
