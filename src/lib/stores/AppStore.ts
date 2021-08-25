import { proxy } from "valtio";
import { DesktopModuleKey } from "../enums/DesktopModuleKey";

export interface IAppStore {
    activeModuleKey: DesktopModuleKey;
    globalTabNumber: number;
}

export const AppStore = {
    activeModuleKey: DesktopModuleKey.ServerManager,
    globalTabNumber: 0,
};

export const AppStoreProxy = proxy<IAppStore>(AppStore);
