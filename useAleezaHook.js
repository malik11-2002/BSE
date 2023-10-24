
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export function useAleezaHook() {
  const [loading, setLoading] = useState(true);
  const [bitcoinData, setBitcoinData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Attempt to fetch data from local storage
        const savedData = await AsyncStorage.getItem('bitcoinData');
        if (savedData) {
          // If data is found in AsyncStorage, parse and use it
          setBitcoinData(JSON.parse(savedData));
          setLoading(false);
        } else {
          // If no data is found, fetch data from the API
          const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
          setBitcoinData(response.data.bpi);
          setLoading(false);
          // Store the fetched data in local storage
          await AsyncStorage.setItem('bitcoinData', JSON.stringify(response.data.bpi));
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, bitcoinData };
}
