import { atom } from "jotai";
import { LayoutData } from "rc-dock";

export const serverManagerDockLayout = atom<LayoutData | undefined>(undefined);
