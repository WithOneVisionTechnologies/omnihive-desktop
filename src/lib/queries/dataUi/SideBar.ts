import { DataNode } from "rc-tree/lib/interface";

export const getUserViews = async (): Promise<DataNode[]> => {
    return [
        {
            key: "f1",
            title: "Folder 1",
            children: [
                {
                    key: "f1-1",
                    title: "View 1-1",
                    isLeaf: true,
                },
                {
                    key: "f1-2",
                    title: "View 1-2",
                    isLeaf: true,
                },
                {
                    key: "f1-3",
                    title: "View 1-3",
                    isLeaf: true,
                },
                {
                    key: "f1-4",
                    title: "View 1-4",
                    isLeaf: true,
                },
                {
                    key: "f1-5",
                    title: "View 1-5",
                    isLeaf: true,
                },
                {
                    key: "f1-6",
                    title: "View 1-6",
                    isLeaf: true,
                },
            ],
        },
        {
            key: "f2",
            title: "Folder 2",
            children: [
                {
                    key: "f2-1",
                    title: "View 2-1",
                    isLeaf: true,
                },
                {
                    key: "f2-2",
                    title: "View 2-2",
                    isLeaf: true,
                },
                {
                    key: "f2-3",
                    title: "View 2-3",
                    isLeaf: true,
                },
                {
                    key: "f2-4",
                    title: "View 2-4",
                    isLeaf: true,
                },
                {
                    key: "f2-5",
                    title: "View 2-5",
                    isLeaf: true,
                },
                {
                    key: "f2-6",
                    title: "View 2-6",
                    isLeaf: true,
                },
            ],
        },
    ];
};
