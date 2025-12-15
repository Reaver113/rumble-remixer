'use client'

import React, { createContext, useCallback, useContext, useState, useEffect, useRef } from "react";

export type UseTrackPlayer = {
	list: string[];
	add: (file: string) => void;
	remove: (file: string) => void;
	has: (file: string) => boolean;
	clear: () => void;
	setList: React.Dispatch<React.SetStateAction<string[]>>;
	playAll: () => void;
	stopAll: () => void;
};

/**
 * Hook to manage a list of track file paths (strings).
 * Provides helpers to add, remove, check presence, and clear the list.
 * Optionally accept an initial list.
 */
export function createTrackPlayer(initial: string[] = []): UseTrackPlayer {
	const [list, setList] = useState<string[]>(() => [...initial]);

	// Map to hold Audio objects for each file so we can control playback
	const audioMapRef = useRef<Map<string, HTMLAudioElement>>(new Map());

	const add = useCallback((file: string) => {
		setList((prev) => {
			if (prev.includes(file)) return prev;
			return [...prev, file];
		});
	}, []);

	const remove = useCallback((file: string) => {
		const audio = audioMapRef.current.get(file);
		if (audio) {
			try { audio.pause(); } catch (e) {}
			audio.currentTime = 0;
			audioMapRef.current.delete(file);
		}
		setList((prev) => prev.filter((f) => f !== file));
	}, []);

	const has = useCallback((file: string) => list.includes(file), [list]);

	const stopAll = useCallback(() => {
		audioMapRef.current.forEach((audio) => {
			try { audio.pause(); } catch (e) {}
			audio.currentTime = 0;
		});
		audioMapRef.current.clear();
	}, []);

	const clear = useCallback(() => {
		stopAll();
		setList([]);
	}, [stopAll]);

	const playAll = useCallback(() => {
		list.forEach((file) => {
			let audio = audioMapRef.current.get(file);
			if (!audio) {
				audio = new Audio(file);
				audio.preload = 'auto';
				audioMapRef.current.set(file, audio);
			}
			audio.play().catch(() => {});
		});
	}, [list]);

	// cleanup on unmount
	useEffect(() => {
		return () => {
			stopAll();
		};
	}, [stopAll]);

	return { list, add, remove, has, clear, setList, playAll, stopAll };
}

// default hook kept for backwards compatibility if someone wants a local instance
export default function useTrackPlayer(initial: string[] = []) {
	return createTrackPlayer(initial);
}

// Shared context so components can access a single playlist
const TrackPlayerContext = createContext<UseTrackPlayer | undefined>(undefined);

export function TrackPlayerProvider({ children, initial = [] }: { children: React.ReactNode; initial?: string[]; }) {
	const value = createTrackPlayer(initial);
	return <TrackPlayerContext.Provider value={value}>{children}</TrackPlayerContext.Provider>;
}

export function useTrackPlayerContext(): UseTrackPlayer {
	const ctx = useContext(TrackPlayerContext);
	if (!ctx) throw new Error('useTrackPlayerContext must be used within TrackPlayerProvider');
	return ctx;
}

