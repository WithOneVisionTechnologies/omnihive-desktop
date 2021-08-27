import { proxy } from "valtio";
import { ISharedStore } from "../interfaces/ISharedStore";
import { AppSettings } from "../models/AppSettings";

export const rendererSharedStore = proxy<ISharedStore>({
    appSettings: new AppSettings(),
});
