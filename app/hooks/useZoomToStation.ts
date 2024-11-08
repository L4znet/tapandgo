import { useEffect } from 'react';
import { useAllBicycleStations } from './useAllBicycleStations';
import { useSearch } from '../contexts/SearchContext';

import { MutableRefObject } from 'react';

export function useZoomToStation(mapRef: MutableRefObject<{ animateToRegion: (region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number }) => void } | null>, stationName: string) {
    const { stations } = useAllBicycleStations();
    const { setCoordinates } = useSearch();

    useEffect(() => {
        if (!stations || !stationName) return;

        const station = stations.find(station =>
            station.name.toLowerCase() === stationName.toLowerCase()
        );

        if (station && station.position) {
            const { latitude, longitude } = station.position;
            const longitudeDelta = 0.001; 
            const latitudeDelta = 0.001; 
            setCoordinates({ latitude, longitude, latitudeDelta, longitudeDelta });

            if (mapRef.current) {
                const targetRegion = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.001, 
                    longitudeDelta: 0.001, 
                };
                mapRef.current.animateToRegion(targetRegion);
            }
        }
    }, [stations, stationName, mapRef, setCoordinates]);
}