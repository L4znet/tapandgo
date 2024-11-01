import { useAllBicycleStations } from './useAllBicycleStations';
import { useMemo } from 'react';

/**
 * Here we calcule the distance between two points use the Haversine formula
 * 
 * @param lat1 
 * @param lon1 
 * @param lat2 
 * @param lon2 
 * @returns 
 */
const calcDistances = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in km
};

const stations = useAllBicycleStations(); 

/**
 * This hook returns the nearest bicycle station from a given position
 * 
 * @param latitude 
 * @param longitude 
 * @returns 
 */
export function useNearestBicycleStation(latitude, longitude) {

    const nearestStation = useMemo(() => {
        if (!stations || !latitude || !longitude) return null;

        let closestStation = null;
        let shortestDistance = Infinity;

        stations.forEach(station => {
            const distance = calcDistances(
                latitude,
                longitude,
                station.position.latitude,
                station.position.longitude
            );

            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestStation = station;
            }
        });

        return closestStation;
    }, [stations, latitude, longitude]);

    return { nearestStation, loading, error };
}