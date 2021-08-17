import { useAtom } from "jotai";
import React from "react";
import { atomGlobalTabNumber } from "../../lib/stores/AppStore";
import ConnectionSelect from "../shared/ConnectionSelect";
import DataGrid from "./DataGrid";
import styles from "./ViewTree.module.scss";

export interface ViewTreeProps {
    dockRef: any;
}

const ViewTree: React.FC<ViewTreeProps> = (props): React.ReactElement => {
    const [globalTabNumber, setGlobalTabNumber] = useAtom(atomGlobalTabNumber);

    const addView = () => {
        props.dockRef.current?.dockMove(
            {
                id: globalTabNumber.toString(),
                title: <span title="Add New View">Add New View</span>,
                closable: true,
                group: "default",
                content: <DataGrid tableName={"dboContacts"} connection={"MinistryPlatform-Dev"} />,
            },
            "dataUiDock",
            "middle"
        );

        const newTabId = globalTabNumber + 1;
        setGlobalTabNumber(newTabId);
    };

    return (
        <>
            <div className={styles.viewTree}>
                <div className={styles.viewTreeHeader}>
                    <div className={styles.viewTreeHeaderLeft}>
                        <ConnectionSelect />
                    </div>
                    <div className={styles.viewTreeHeaderRight}>
                        <div className={styles.viewTreeHeaderButton} title="Add View" onClick={addView}>
                            <img src={`${process.env.PUBLIC_URL}/images/dataUi/add.png`} />
                        </div>
                        <div className={styles.viewTreeHeaderButton} title="Add Folder">
                            <img src={`${process.env.PUBLIC_URL}/images/dataUi/add-folder.png`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewTree;
