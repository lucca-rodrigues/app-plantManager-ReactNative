import React, { useEffect, useState } from 'react';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { StyleSheet, View, Image, Text, FlatList, Alert } from 'react-native';
import { Header } from '../components/header';

import waterdrop from '../assets/waterdrop.png'
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDistance } from 'date-fns';
import { CardMyPlants } from '../components/cardMyPlants';
import { Loader } from '../components/loader';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async() => {
          try {
            await removePlant(plant.id)
            setMyPlants(oldValue =>
              oldValue.filter(item => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert('Não foi possível remover! 😢')
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {
          locale: pt
        }
      )

      setNextWatered(`Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}`)
      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <Header />

        <View style={styles.spotlight}>
          <Image source={waterdrop} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>
            Próximas regadas
          </Text>

          <FlatList
            data={myPlants}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <CardMyPlants
                data={item}
                handleRemove={() => handleRemove(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
});
