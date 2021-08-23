import DockLayout, { DividerBox, LayoutData } from "rc-dock";
import React from "react";
import SideMenu from "../components/dataUi/SideMenu";
import styles from "./DataUi.module.scss";

const defaultGroups = {
    default: { animated: false },
};

const defaultLayout: LayoutData = {
    dockbox: {
        mode: "vertical",
        children: [
            {
                id: "dataUiDock",
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

const DataUi: React.FC = (): React.ReactElement => {
    const dockRef = React.useRef<DockLayout>(null);

    return (
        <div>
            <DividerBox className={styles.dataUiDividerBox}>
                <SideMenu dockRef={dockRef} />
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

export default DataUi;
