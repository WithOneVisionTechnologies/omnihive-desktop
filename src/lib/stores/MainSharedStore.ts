import { proxy } from "valtio/vanilla";
import { ISharedStore } from "../interfaces/ISharedStore";
import { AppSettings } from "../models/AppSettings";

export const mainSharedStore = proxy<ISharedStore>({
    appSettings: new AppSettings(),
});
