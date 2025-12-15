'use client'

import { useTrackPlayerContext } from "@/hooks/useTrackPlayer";
import styles from './controls.module.css';

const Controls = () => {
      const {playAll, stopAll} = useTrackPlayerContext();
    return (
        <div className={styles.controls}>
            <div className={styles.play} onClick={playAll}>Play</div>
            <div className={styles.stop} onClick={stopAll}>Stop</div>
        </div>
    )
}

export default Controls;