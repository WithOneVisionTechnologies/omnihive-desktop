import React from "react";
import ReactTooltip from "react-tooltip";
import { useAtom } from "jotai";
import styles from "./App.module.scss";
import ServerManager from "./ServerManager";
import DataUi from "./DataUi";
import { atomActiveModule, atomRegisteredModules } from "../lib/stores/AppStore";
import { DesktopModuleKey } from "../lib/enums/DesktopModuleKey";
import { DesktopModule } from "../lib/models/DesktopModule";

const App: React.FC = (): React.ReactElement => {
    const [activeModule, setActiveModule] = useAtom(atomActiveModule);
    const [registeredModules] = useAtom(atomRegisteredModules);

    const renderBlanks = (): React.ReactElement[] => {
        const items: React.ReactElement[] = [];

        for (let i = 0; i < 10 - registeredModules.length; i++) {
            items.push(
                <div key={i} className={styles.sidebarLink}>
                    <img
                        className={styles.sidebarImage}
                        src={`${process.env.PUBLIC_URL}/images/blank_app.png`}
                        alt="Blank App"
                    />
                </div>
            );
        }

        return items;
    };

    return (
        <div className={styles.appContainer}>
            <div className={styles.sidebar}>
                {registeredModules.map((desktopModule: DesktopModule) => (
                    <React.Fragment key={desktopModule.key}>
                        <div
                            className={`${styles.sidebarLink} ${styles.sidebarLinkFilled} ${
                                activeModule === desktopModule.key ? `${styles.sidebarLinkActive}` : ``
                            }`}
                            data-tip
                            data-for={`${desktopModule.key}-tooltip`}
                            onClick={() => {
                                if (desktopModule.key !== activeModule) {
                                    setActiveModule(desktopModule.key);
                                }
                            }}
                        >
                            <img
                                className={styles.sidebarImage}
                                src={desktopModule.imageSource}
                                alt={desktopModule.displayName}
                            />
                        </div>
                        <ReactTooltip id={`${desktopModule.key}-tooltip`} place="top" effect="solid" type="warning">
                            {desktopModule.displayName}
                        </ReactTooltip>
                    </React.Fragment>
                ))}
                {renderBlanks()}
            </div>
            <div className={styles.appActive}>
                {activeModule === DesktopModuleKey.ServerManager && <ServerManager />}
                {activeModule === DesktopModuleKey.DataUi && <DataUi />}
            </div>
        </div>
    );
};

export default App;
