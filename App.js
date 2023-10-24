// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import axios from 'axios';

// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [bitcoinData, setBitcoinData] = useState(null);

//   useEffect(() => {
//     // Send an HTTP GET request to the CoinDesk API
//     axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
//       .then((response) => {
//         setBitcoinData(response.data.bpi);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching Bitcoin data:', error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bitcoin Price Index</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : (
//         <FlatList
//           data={Object.keys(bitcoinData)}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <View style={styles.itemContainer}>
//               <Text style={styles.itemDescription}>{bitcoinData[item].description} ({bitcoinData[item].code}):</Text>
//               <Text style={styles.itemValue}>Symbol:  {bitcoinData[item].symbol}</Text>
//               <Text style={styles.itemValue}>Price:  {bitcoinData[item].rate}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   itemContainer: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemDescription: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   itemValue: {
//     fontSize: 16,
//     color: '#007AFF',
//   },
// });

// export default App;



// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [bitcoinData, setBitcoinData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Attempt to fetch data from AsyncStorage
//         const savedData = await AsyncStorage.getItem('bitcoinData');
//         if (savedData) {
//           // If data is found in AsyncStorage, parse and use it
//           setBitcoinData(JSON.parse(savedData));
//           setLoading(false);
//         } else {
//           // If no data is found, fetch data from the API
//           const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
//           setBitcoinData(response.data.bpi);
//           setLoading(false);
//           // Store the fetched data in AsyncStorage
//           await AsyncStorage.setItem('bitcoinData', JSON.stringify(response.data.bpi));
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bitcoin Price Index</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : (
//         <FlatList
//           data={Object.keys(bitcoinData)}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <View style={styles.itemContainer}>
//               <Text style={styles.itemDescription}>
//                 {bitcoinData[item].description} ({bitcoinData[item].code}):
//               </Text>
//               <Text style={styles.itemValue}>
//                 {bitcoinData[item].symbol}
//               </Text>
//               <Text style={styles.itemValue}>
//                 {bitcoinData[item].rate}
//               </Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   itemContainer: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemDescription: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   itemValue: {
//     fontSize: 16,
//     color: '#007AFF',
//   },
// });

// export default App;

import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useAleezaHook } from './useAleezaHook';

const App = () => {
  const { loading, bitcoinData } = useAleezaHook();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin Price Index</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={Object.keys(bitcoinData)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemDescription}>
                {bitcoinData[item].description} ({bitcoinData[item].code}):
              </Text>
              <Text style={styles.itemValue}>
                {bitcoinData[item].symbol}
                {bitcoinData[item].rate}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemValue: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default App;
