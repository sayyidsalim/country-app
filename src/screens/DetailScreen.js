import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, ActivityIndicator, Button, IconButton, Divider } from 'react-native-paper';

const DetailScreen = ({ route, navigation }) => {
  const { countryName } = route.params;
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => response.json())
      .then(data => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.headerBackButton}
        />
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating size="large" color="tomato" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text variant="titleLarge" style={styles.countryName}>
              {country.name.common}
            </Text>
            <IconButton
              icon={isFavorite ? 'heart' : 'heart-outline'}
              iconColor={isFavorite ? 'red' : 'gray'}
              size={24}
              onPress={() => setIsFavorite(!isFavorite)}
            />
          </View>

          {/* Gambar Bendera */}
          <Card.Cover source={{ uri: country.flags.png }} style={styles.flag} />

          {/* Divider */}
          <Divider bold style={styles.divider} />

          {/* Informasi Negara */}
          <Text variant="bodyLarge" style={styles.detailText}>
            <Text style={styles.boldText}>Official Name:</Text> {country.name.official}
          </Text>
          <Text variant="bodyLarge" style={styles.detailText}>
            <Text style={styles.boldText}>Capital:</Text> {country.capital}
          </Text>
          <Text variant="bodyLarge" style={styles.detailText}>
            <Text style={styles.boldText}>Region:</Text> {country.region}
          </Text>
          <Text variant="bodyLarge" style={styles.detailText}>
            <Text style={styles.boldText}>Subregion:</Text> {country.subregion}
          </Text>
          <Text variant="bodyLarge" style={styles.detailText}>
            <Text style={styles.boldText}>Population:</Text> {country.population}
          </Text>
          <Text variant="bodyLarge" style={styles.detailText}>
            <Text style={styles.boldText}>Area:</Text> {country.area} km²
          </Text>

          {/* Button Checkout */}
          <Button
            mode="contained"
            buttonColor="tomato"
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            Checkout Now
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryName: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  flag: {
    marginVertical: 10,
    borderRadius: 10,
  },
  divider: {
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
  headerBackButton: {
    marginLeft: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;
