import React from "react";
import styles from "./ViewTree.module.css";
import Tree, { TreeNode, TreeNodeProps } from "rc-tree";
import { DataNode, EventDataNode } from "rc-tree/lib/interface";
import DockLayout from "rc-dock";
import { rendererReactStore } from "../../lib/stores/RendererReactStore";
import DataGrid from "./DataGrid";
import { useSnapshot } from "valtio";

export interface ViewTreeProps {
    className: any;
    data: DataNode[];
    setTreeData(nodes: DataNode[]): void;
}

const ViewTree = React.forwardRef<DockLayout, ViewTreeProps>((props, ref) => {
    const [expandedKeys, setExpandedKeys] = React.useState<string[]>([]);
    const rendererReactStoreSnapshot = useSnapshot(rendererReactStore);

    const onClick = (node: EventDataNode) => {
        if (node.children) {
            if (node.expanded) {
                setExpandedKeys(expandedKeys.filter((x) => x !== node.key));
            } else if (!expandedKeys.some((x) => x === node.key.toString())) {
                const keys = [...expandedKeys];
                keys.push(node.key.toString());

                setExpandedKeys(keys);
            }
            node.expanded = !node.expanded;
        } else if (node.title && typeof node.title === "string") {
            (ref as React.MutableRefObject<DockLayout>).current?.dockMove(
                {
                    id: rendererReactStoreSnapshot.globalTabNumber.toString(),
                    title: <span title={node.title}>{node.title}</span>,
                    closable: true,
                    group: "default",
                    content: <DataGrid tableName={node.title} connection={"MinistryPlatform-Dev"} ref={ref} />,
                },
                "dataUiDock",
                "middle"
            );

            rendererReactStore.globalTabNumber++;
        }
    };

    const onDrop = (dragNode: EventDataNode, targetNode: EventDataNode) => {
        let currentTree = [...props.data];
        currentTree = removeDrag(dragNode, currentTree);
        currentTree = moveToTarget(dragNode, targetNode, currentTree);

        props.setTreeData(currentTree);
    };

    const removeDrag = (dragNode: EventDataNode, currentTree: DataNode[]) => {
        const splitTarget = dragNode.key.toString().split("-");
        let parentNode = undefined;

        if (splitTarget.length > 1) {
            parentNode = findParentNode(splitTarget, currentTree);
        }

        if (parentNode?.children) {
            parentNode.children = parentNode.children.filter((node) => node.key !== dragNode.key);
        } else {
            currentTree = currentTree.filter((node) => node.key !== dragNode.key);
        }

        return currentTree;
    };

    const moveToTarget = (dragNode: EventDataNode, targetNode: EventDataNode, currentTree: DataNode[]) => {
        const splitTarget = targetNode.key.toString().split("-");
        let parentNode = undefined;

        if (splitTarget.length > 1) {
            parentNode = findParentNode(splitTarget, currentTree);
        }

        let targetIndex: number = 0;

        if (parentNode?.children) {
            targetIndex = parentNode.children.findIndex((node) => targetNode.key === node.key) + 1;
        } else {
            targetIndex = currentTree.findIndex((node) => targetNode.key === node.key) + 1;
        }

        if (parentNode?.children) {
            parentNode.children = [
                ...parentNode.children.slice(0, targetIndex),
                dragNode as DataNode,
                ...parentNode.children.slice(targetIndex),
            ];
        } else {
            currentTree = [
                ...currentTree.slice(0, targetIndex),
                dragNode as DataNode,
                ...currentTree.slice(targetIndex),
            ];
        }

        if (parentNode?.children) {
            reKeyChildren(parentNode.children, parentNode?.key.toString());
        } else {
            reKeyChildren(currentTree);
        }

        return currentTree;
    };

    const findParentNode = (targetNode: string[], currentTreeData: DataNode[]): DataNode | undefined => {
        const matchingNode = currentTreeData.find(
            (node) => targetNode[0].startsWith("f") && targetNode[0] === node.key.toString()
        );

        if (matchingNode) {
            if (
                targetNode[1] &&
                targetNode[1].startsWith("f") &&
                matchingNode.children &&
                matchingNode.children.length > 0
            ) {
                return findParentNode(targetNode.slice(1), matchingNode.children);
            } else {
                return matchingNode;
            }
        }
    };

    const reKeyChildren = (nodes: DataNode[], parentKey?: string) => {
        nodes.map((x, index) => (x.key = (parentKey ? `${parentKey}-` : "") + index.toString()));
    };

    const getNodeIcon = (props: TreeNodeProps) => {
        if (props.data) {
            if (!props.data.isLeaf) {
                if (props.expanded) {
                    return (
                        <img className={styles.treeNodeFolder} src="/assets/images/sharedComponents/down-chevron.svg" />
                    );
                }

                return (
                    <img className={styles.treeNodeFolder} src="/assets/images/sharedComponents/right-chevron.svg" />
                );
            }
        }
    };

    const buildTreeNodes = (nodes: DataNode[], indent: number = 0) =>
        nodes.map((data) => (
            <TreeNode
                className={`${indent > 0 ? `pl-${indent * 4} ` : ""} ${styles.treeNode} ${
                    !data.isLeaf ? styles.treeNodeParent : ""
                }`}
                key={data.key}
                title={data.title}
                isLeaf={data.isLeaf}
            >
                {data.children && buildTreeNodes(data.children, indent + 1)}
            </TreeNode>
        ));

    return (
        <>
            <div className={props.className}>
                <Tree
                    className={"text-white"}
                    expandedKeys={expandedKeys}
                    draggable={true}
                    dropIndicatorRender={() => <div className={"bg-omnihiveModal"}></div>}
                    icon={(props) => getNodeIcon(props)}
                    onSelect={(_selectedKeys, { node }) => {
                        onClick(node);
                    }}
                    onDrop={({ node, dragNode }) => {
                        onDrop(dragNode, node);
                    }}
                >
                    {props.data && buildTreeNodes(props.data)}
                </Tree>
            </div>
        </>
    );
});

export default ViewTree;
