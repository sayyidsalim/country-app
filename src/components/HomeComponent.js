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

const HomeComponent = () => {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const itemsPerPage = 20; // Jumlah item per halaman

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
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: item.flags?.png}} style={styles.image} />
      <Text style={styles.countryName}>{item.name.common}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="tomato" style={styles.indicator} />
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
                <ActivityIndicator size="large" color="tomato" />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    flex: 1,
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
    marginVertical: 5,
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default HomeComponent;
