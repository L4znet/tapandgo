import { useAllBicycleStations } from './useAllBicycleStations';
import { useMemo } from 'react';

/**
 * Here we calculate the distance between two points using the Haversine formula
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

/**
 * Function to check if the station is open and has available bikes
 * 
 * @param station 
 * @returns 
 */
const isStationAvailable = (station) => {
    const currentTime = new Date();
    const openingHours = station.opening_hours; // Assumes station has an `opening_hours` property
    const bikesAvailable = station.available_bikes > 0; // Assumes station has an `available_bikes` property

    // Check if the station is open
    if (!openingHours) return false;

    const isOpen = openingHours.some(hour => {
        const [start, end] = hour.split('-').map(t => new Date(`1970-01-01T${t}:00`));
        return currentTime >= start && currentTime <= end;
    });

    return isOpen && bikesAvailable;
};

/**
 * This hook returns the nearest bicycle station from a given position
 * 
 * @param latitude 
 * @param longitude 
 * @returns 
 */
export function useNearestBicycleStations(latitude, longitude) {
    const { stations, loading, error } = useAllBicycleStations();
    const nearestStation = useMemo(() => {
        if (!stations || !latitude || !longitude) return null;

        let closestStation = null;
        let shortestDistance = Infinity;

        // First, try to find the closest available station
        stations.forEach(station => {
            const distance = calcDistances(
                latitude,
                longitude,
                station.position.latitude,
                station.position.longitude
            );

            if (distance < shortestDistance && isStationAvailable(station)) {
                shortestDistance = distance;
                closestStation = station;
            }
        });

        // If no available station was found, search for the closest station regardless of availability
        if (!closestStation) {
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
        }

        return closestStation;
    }, [stations, latitude, longitude]);

    return { nearestStation, loading, error };
}
