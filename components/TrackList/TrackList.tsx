"use client"

import { useTrackPlayerContext } from '@/hooks/useTrackPlayer';
import styles from './track-list.module.css';

const TrackList = () => {
    const { list } = useTrackPlayerContext();
    return (
        <div className={styles.trackList}>
             {list.map((listItem, index) => (
                <div key={`${listItem}-${index}`} className={styles.listItem}>{listItem}</div>
             ))}
        </div>
    )
}

export default TrackList;