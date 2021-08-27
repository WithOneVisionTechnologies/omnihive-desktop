import { DesktopModuleKey } from "../enums/DesktopModuleKey";
import { RegisteredDockTab } from "../models/RegisteredDockTab";

export interface IReactStore {
    activeModuleKey: DesktopModuleKey;
    globalTabNumber: number;
    registeredDockTabs: RegisteredDockTab[];
}
