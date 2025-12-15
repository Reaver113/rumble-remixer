import styles from './track-category.module.css';
import { TrackContainerProps } from '../../types/trackTypes';
import Track from '../Track/Track';

const TrackCategory = ({
    name,
    tracks
}: TrackContainerProps) => {
    return (
    <div className={styles.trackContainer}>
        <div className={styles.heading}>{name}</div>
        <div className={styles.trackList}>
            {tracks?.map((track, index) => (
                <Track key={`${track.name}-${index}`} {...track}/>
            ))}
        </div>

    </div>
)}

export default TrackCategory;