import DockLayout from "rc-dock";
import React from "react";
import styles from "./DataGrid.module.css";

export interface DataGridProps {
    tableName: string;
    connection: string;
}

const DataGrid = React.forwardRef<DockLayout, DataGridProps>((_props, _ref) => {
    return (
        <>
            <div className={styles.outerContainer}>Placeholder</div>
        </>
    );
});

export default DataGrid;
