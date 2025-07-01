import AboutMe from "../components/About/AboutMe";
import Career from "../components/Career/Career";
import Intro from "../components/Intro/Intro";

import styles from "./MainPage.module.css";

const MainPage = () => {
    return (
        <div className={styles.layout}>
            <Intro />
            <AboutMe />
            <Career />
        </div>
    );
};

export default MainPage;
