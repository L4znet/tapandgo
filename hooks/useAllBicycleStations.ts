import { useQuery } from '@tanstack/react-query';
import { BicycleStation } from '@/types/BicycleStation';
const BASE_URL = 'https://api.jcdecaux.com/vls/v3';
import { JCDECAUX_TOKEN } from '@env';

const fetchStations = async (): Promise<BicycleStation[]> => {
    const response = await fetch(`${BASE_URL}/stations?apiKey=${JCDECAUX_TOKEN}`);
    if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
    }
    const data: BicycleStation[] = await response.json();
    return data;
};

export function useAllBicycleStations() {
    const { data: stations, error, isLoading: loading } = useQuery<BicycleStation[], Error>({
        queryKey: ['stations'],
        queryFn: fetchStations
    });

    return { stations, loading, error };
}