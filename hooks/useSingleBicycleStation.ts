import { BicycleStation } from "@/types/BicycleStation";
import { useState, useEffect } from "react";
const BASE_URL = 'https://api.jcdecaux.com/vls/v3';
const API_KEY = process.env.JCDECAUX_TOKEN;

export function useSingleBicycleStation(stationId: number) {
    const [station, setStation] = useState<BicycleStation | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); 
  
    useEffect(() => {
      if (!stationId) return; 
  
      const fetchStation = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/stations/${stationId}?apiKey=${API_KEY}`);
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
    }, [stationId]);
  
    return { station, loading, error };
  }