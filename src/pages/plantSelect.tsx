import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { FilterEnvironment } from '../components/filterEnvironment';
import { Header } from '../components/header';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantCard } from "../components/plantCard";
import { Loader } from "../components/loader";
import { useNavigation } from '@react-navigation/native';

interface FilterEnvironmentProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export function PlantSelect() {
  const navigation = useNavigation();
  const [environments, setEnvironments] = useState<FilterEnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  function handleEnvironments(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant => plant.environments.includes(environment));

    return setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=4`);

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantsProps){
    navigation.navigate('PlantDetails', { plant });
  }

  useEffect(() => {
    async function fetchEnvirionments() {
      const { data } = await api.get('/plants_environments?_sort=title&_order=asc');

      setEnvironments([
        {key: 'all', title: 'Todos'}, ...data
      ]);

    }

    fetchEnvirionments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterListEnvironment}
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({item}) => (
            <FilterEnvironment
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironments(item.key)}
            />

          )}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => <PlantCard key={item.id} data={item} onPress={() => handlePlantSelect(item)}/>}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : null
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  filterListEnvironment: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});
