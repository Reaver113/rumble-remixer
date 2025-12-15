import Controls from '@/components/Controls/Controls';
import TrackContainer from '@/components/TrackCategory/TrackCategory';
import TrackCategoryContainer from '@/components/TrackCategoryContainer/TrackCategoryContainer';
import TrackList from '@/components/TrackList/TrackList';
import { useTrackPlayerContext } from '@/hooks/useTrackPlayer';
import lateTracks from '@/json/late_tracks.json';


export default function Home() {

  return (
    <>
      <Controls />
      <TrackList />
      <TrackCategoryContainer {...lateTracks} />
    </>

  );
}
