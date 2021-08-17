import React from "react";
import styles from "./DataGrid.module.scss";

export interface DataGridProps {
    tableName: string;
    connection: string;
}

const DataGrid: React.FC<DataGridProps> = (props): React.ReactElement => {
    return (
        <>
            <div className={styles.outerContainer}>Placeholder</div>
        </>
    );
};

export default DataGrid;
