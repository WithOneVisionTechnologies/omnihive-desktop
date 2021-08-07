import { atom } from "jotai";
import { DesktopModuleKey } from "../enums/DesktopModuleKey";
import { DesktopModule } from "../models/DesktopModule";
import { RegisteredServerModel } from "../models/RegisteredServerModel";

export const atomActiveModule = atom<DesktopModuleKey>(DesktopModuleKey.ServerManager);

export const atomRegisteredModules = atom<DesktopModule[]>([
    {
        key: DesktopModuleKey.ServerManager,
        displayName: "Server Manager",
        imageSource: `${process.env.PUBLIC_URL}/images/modules/server_manager.png`,
    },
    {
        key: DesktopModuleKey.DataUi,
        displayName: "Data UI",
        imageSource: `${process.env.PUBLIC_URL}/images/modules/data_ui.png`,
    },
]);

export const atomRegisteredServers = atom<RegisteredServerModel[]>([]);
export const atomGlobalTabNumber = atom<number>(0);
