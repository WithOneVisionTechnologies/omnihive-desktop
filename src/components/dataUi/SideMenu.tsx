import React from "react";
import ConnectionSelect from "../shared/ConnectionSelect";
import styles from "./SideMenu.module.css";
import { RegisteredServerModel } from "../../lib/models/RegisteredServerModel";
import ViewTree from "./ViewTree";
import { DataNode } from "rc-tree/lib/interface";
import { getUserViews } from "../../lib/queries/dataUi/SideBar";
import DockLayout from "rc-dock";

const SideMenu = React.forwardRef<DockLayout, {}>((_props, ref) => {
    const [connection, setConnection] = React.useState<RegisteredServerModel | undefined>(undefined);
    const [treeData, setTreeData] = React.useState<DataNode[] | undefined>([]);

    // const userViewQuery = useQuery("dataUi-userViews", getUserViews);

    // useEffect(() => {
    //     if (!userViewQuery.isLoading) {
    //         setTreeData(userViewQuery.data);
    //     }
    // }, [userViewQuery.isLoading]);

    React.useEffect(() => {
        getUserViews().then((views) => {
            setTreeData(views);
        });
    }, []);

    return (
        <>
            <div className={styles.sideBar}>
                <div className={styles.sideBarHeader}>
                    <div className={styles.sideBarHeaderLeft}>
                        <ConnectionSelect connection={connection} setConnection={setConnection} />
                    </div>
                    <div className={styles.sideBarHeaderRight}>
                        <div
                            className={styles.sideBarHeaderButton}
                            title="Add View"
                            onClick={() => {
                                return;
                            }}
                        >
                            <img src="/assets/images/dataUi/add.png" />
                        </div>
                        <div className={styles.sideBarHeaderButton} title="Add Folder">
                            <img src="/assets/images/dataUi/add-folder.png" />
                        </div>
                    </div>
                </div>
                {treeData && (
                    <ViewTree className={styles.sideBarTree} data={treeData} setTreeData={setTreeData} ref={ref} />
                )}
            </div>
        </>
    );
});

export default SideMenu;
