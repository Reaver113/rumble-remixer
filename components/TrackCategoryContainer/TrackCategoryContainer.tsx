import TrackCategory from "../TrackCategory/TrackCategory"
import { TrackContainerProps } from '../../types/trackTypes';

type TrackCategoryContainerProps = Record<string, TrackContainerProps[]>;

const TrackCategoryContainer = (props: TrackCategoryContainerProps) => {
    const containers = Object.values(props).flat() as TrackContainerProps[];

    return (
        <>
            {containers.map((container, index) => (
                <TrackCategory key={`${container.name}-${index}`} {...container} />
            ))}
        </>
    )
}

export default TrackCategoryContainer;