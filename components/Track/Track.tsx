"use client"

import styles from './track.module.css';
import { TrackProps } from '@/types/trackTypes';
import { useTrackPlayerContext } from '@/hooks/useTrackPlayer';

const Track = ({ name, src }: TrackProps) => {
    const { add, remove, has } = useTrackPlayerContext();

    const handleClick = () => {
        if (src) 
            if (!has(src)) add(src)
            else remove(src);
    };

    return (
        <div onClick={handleClick} className={`${styles.track} ${has(src) ? styles.selected : ''}`}>
            {name}
        </div>
    );
};

export default Track;