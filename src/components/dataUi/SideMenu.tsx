import React, { useEffect, useState } from "react";
import ConnectionSelect from "../shared/ConnectionSelect";
import styles from "./SideMenu.module.scss";
import { RegisteredServerModel } from "../../lib/models/RegisteredServerModel";
import ViewTree from "./ViewTree";
import { DataNode } from "rc-tree/lib/interface";
import { useQuery } from "react-query";
import { getUserViews } from "../../lib/queries/dataUi/SideBar";

export interface SideBarProps {
    dockRef: any;
}

const SideMenu: React.FC<SideBarProps> = (props): React.ReactElement => {
    const [connection, setConnection] = useState<RegisteredServerModel | undefined>(undefined);
    const [treeData, setTreeData] = useState<DataNode[] | undefined>([]);
    // const userViewQuery = useQuery("dataUi-userViews", getUserViews);

    // useEffect(() => {
    //     if (!userViewQuery.isLoading) {
    //         setTreeData(userViewQuery.data);
    //     }
    // }, [userViewQuery.isLoading]);

    useEffect(() => {
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
                            <img src={`${process.env.PUBLIC_URL}/images/dataUi/add.png`} />
                        </div>
                        <div className={styles.sideBarHeaderButton} title="Add Folder">
                            <img src={`${process.env.PUBLIC_URL}/images/dataUi/add-folder.png`} />
                        </div>
                    </div>
                </div>
                {treeData && (
                    <ViewTree
                        className={styles.sideBarTree}
                        dockRef={props.dockRef}
                        data={treeData}
                        setData={setTreeData}
                    />
                )}
            </div>
        </>
    );
};

export default SideMenu;
