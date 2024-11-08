import { useMemo, useEffect } from 'react';
import { useAllBicycleStations } from './useAllBicycleStations';
import { useSearch } from '../contexts/SearchContext';

export function useSearchBicycleStations() {
    const { stations, loading, error } = useAllBicycleStations();
    const { searchTerm, setCoordinates } = useSearch();

    const filteredStations = useMemo(() => {
        if (!stations) return [];
        if (!searchTerm) return stations;
        return stations.filter(station =>
            station.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [stations, searchTerm]);

    useEffect(() => {
        if (filteredStations.length > 0) {
            const { position } = filteredStations[0];
            if (position && position.latitude && position.longitude) {
                setCoordinates({ latitude: position.latitude, longitude: position.longitude, latitudeDelta: 0.001, longitudeDelta: 0.001 });
            } else {
                setCoordinates({ latitude: null, longitude: null, latitudeDelta: 0.001, longitudeDelta: 0.001 });
            }
        } else {
            setCoordinates({ latitude: null, longitude: null, latitudeDelta: 0.001, longitudeDelta: 0.001 });
        }
    }, [filteredStations, setCoordinates]);

    return { filteredStations, loading, error };
}