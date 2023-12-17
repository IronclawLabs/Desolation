import styles from '/styles/type-effect.module.scss'
import {createRef, useEffect} from "react";

export default function TypeEffect() {

    return (
        <section className={styles.typewriterSec}>
        <div className={styles.typewriter}>
            <p>This is a time for potential rebirth,</p>
            <p>a second genesis born from the ashes of the old world,</p>
            <p>and the digital pulse of the new</p>
        </div>
        </section>
    )
}