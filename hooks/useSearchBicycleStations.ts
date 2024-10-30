import { useMemo, useEffect } from 'react';
import { useAllBicycleStations } from './useAllBicycleStations';
import { useSearch } from '../app/contexts/SearchContext';

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
                setCoordinates({ latitude: position.latitude, longitude: position.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
            } else {
                setCoordinates({ latitude: null, longitude: null, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
            }
        } else {
            setCoordinates({ latitude: null, longitude: null, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
        }
    }, [filteredStations, setCoordinates]);

    return { filteredStations, loading, error };
}