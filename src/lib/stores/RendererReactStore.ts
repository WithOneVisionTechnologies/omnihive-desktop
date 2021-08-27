import { proxy } from "valtio";
import { DesktopModuleKey } from "../enums/DesktopModuleKey";
import { IReactStore } from "../interfaces/IReactStore";

export const rendererReactStore = proxy<IReactStore>({
    activeModuleKey: DesktopModuleKey.ServerManager,
    globalTabNumber: 0,
    registeredDockTabs: [],
});
