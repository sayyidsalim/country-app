import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {PointerType} from 'react-native-gesture-handler';
const HomeComponent = () => {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const itemsPerPage = 20; // Jumlah item per halaman
  const navigation = useNavigation();

  // Fetch API
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setDisplayedCountries(data.slice(0, itemsPerPage));
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Load More Data (Dengan Button)
  const loadMore = () => {
    if (displayedCountries.length < countries.length) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setTimeout(() => {
        setDisplayedCountries(countries.slice(0, itemsPerPage * nextPage));
        setPage(nextPage);
        setLoadingMore(false);
      }, 1000); // Simulasi loading
    }
  };

  // Render Item
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('Details', {
          paramId: item.name.common,
        });
      }}>
      <Image source={{uri: item.flags?.png}} style={styles.image} />
      <Text style={styles.countryName}>{item.name.common}</Text>
      <Text style={styles.pop}>Pop: {item.population.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <FlatList
            data={displayedCountries}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Grid Layout (2 kolom)
          />
          {displayedCountries.length < countries.length && (
            <View style={styles.loadMoreContainer}>
              {loadingMore ? (
                <ActivityIndicator size="large" color="blue" />
              ) : (
                <Button title="Load More" onPress={loadMore} />
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  card: {
    flex: 1,
    cursor: 'pointer',
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  image: {
    width: 80,
    height: 50,
    marginBottom: 10,
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadMoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  pop: {
    color: 'grey',
    marginVertical: 4,
  },
});

export default HomeComponent;
