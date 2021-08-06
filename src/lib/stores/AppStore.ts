import { atom } from "jotai";
import { DesktopApplicationKey } from "../enums/DesktopApplicationKey";
import { DesktopApplication } from "../models/DesktopApplication";

export const atomActiveApplication = atom<DesktopApplicationKey>(DesktopApplicationKey.ServerManager);

export const atomRegisteredApplications = atom<DesktopApplication[]>([
    {
        key: DesktopApplicationKey.ServerManager,
        displayName: "Server Manager",
        imageSource: `${process.env.PUBLIC_URL}/images/server_manager.png`,
    },
    {
        key: DesktopApplicationKey.DataUi,
        displayName: "Data UI",
        imageSource: `${process.env.PUBLIC_URL}/images/data_ui.png`,
    },
]);
