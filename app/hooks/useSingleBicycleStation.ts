import { BicycleStation } from "@/types/BicycleStation";
import { useState, useEffect } from "react";
const BASE_URL = 'https://api.jcdecaux.com/vls/v3';
import { JCDECAUX_TOKEN } from '@env';

export function useSingleBicycleStation(stationNumber: string, contractName: string) {
    const [station, setStation] = useState<BicycleStation | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); 
  
    useEffect(() => {
      if (!stationNumber && !contractName) return; 
  
      const fetchStation = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/stations/${stationNumber}?contract=${contractName}&apiKey=${JCDECAUX_TOKEN}`);
          if (!response.ok) {
            throw new Error(`Erreur : ${response.statusText}`);
          }
          const data: BicycleStation = await response.json();
          setStation(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Une erreur est survenue'); 
        } finally {
          setLoading(false);
        }
      };
  
      fetchStation();
    }, [stationNumber, contractName]);
  
    return { station, loading, error };
  }