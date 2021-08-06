import React from "react";
import ReactTooltip from "react-tooltip";
import { useAtom } from "jotai";
import styles from "./App.module.scss";
import ServerManager from "./ServerManager";
import DataUi from "./DataUi";
import { atomActiveApplication, atomRegisteredApplications } from "../lib/stores/AppStore";
import { DesktopApplicationKey } from "../lib/enums/DesktopApplicationKey";
import { DesktopApplication } from "../lib/models/DesktopApplication";

const App: React.FC = (): React.ReactElement => {
    const [activeApplication, setActiveApplication] = useAtom(atomActiveApplication);
    const [registeredApplications] = useAtom(atomRegisteredApplications);

    const renderBlanks = (): React.ReactElement[] => {
        const items: React.ReactElement[] = [];

        for (let i = 0; i < 10 - registeredApplications.length; i++) {
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
                {registeredApplications.map((app: DesktopApplication) => (
                    <React.Fragment key={app.key}>
                        <div
                            className={`${styles.sidebarLink} ${styles.sidebarLinkFilled} ${
                                activeApplication === app.key ? `${styles.sidebarLinkActive}` : ``
                            }`}
                            data-tip
                            data-for={`${app.key}-tooltip`}
                            onClick={() => {
                                if (app.key !== activeApplication) {
                                    setActiveApplication(app.key);
                                }
                            }}
                        >
                            <img className={styles.sidebarImage} src={app.imageSource} alt={app.displayName} />
                        </div>
                        <ReactTooltip id={`${app.key}-tooltip`} place="top" effect="solid" type="warning">
                            {app.displayName}
                        </ReactTooltip>
                    </React.Fragment>
                ))}
                {renderBlanks()}
            </div>
            <div className={styles.appActive}>
                {activeApplication === DesktopApplicationKey.ServerManager && <ServerManager />}
                {activeApplication === DesktopApplicationKey.DataUi && <DataUi />}
            </div>
        </div>
    );
};

export default App;
