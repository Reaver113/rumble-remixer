'use client'

import { createContext, useState } from "react"
import TrackContainer from "../TrackCategory/TrackCategory"
import PentaKillLate from '@/json/pentakill_late.json'
import TrackList from "../TrackList/TrackList"
import useTrackPlayer, { UseTrackPlayer } from "@/hooks/useTrackPlayer"


// Context + Provider to share a single playlist across the app
const TrackPlayerContext = createContext<UseTrackPlayer | undefined>(undefined);

const TrackPlayerProvider = ({
	children,
	initial = [],
}: {
	children: React.ReactNode;
	initial?: string[];
}) => {
	const value = useTrackPlayer(initial);
	return (
		<TrackPlayerContext.Provider value={value}>
		<TrackList />
    <TrackContainer {...PentaKillLate} />
		</TrackPlayerContext.Provider>
	);
}


export default TrackPlayerProvider