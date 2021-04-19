import React, {useState} from 'react';
import { Text, Image, StyleSheet, SafeAreaView } from 'react-native';

import watteringImg from '../assets/watering.png';
import { Button } from '../components/button';
import colors from '../styles/colors';

export function Welcome() {
  const [visible, setVisible] = useState(false);

  function handleVisibility() {
    setVisible(!visible);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>
      <Image source={watteringImg} style={styles.image}/>
      {visible && <Text>Estou visível!</Text>}
      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas.
        Nós cuidamos de lembrar você sempre que prcisar.
      </Text>
      <Button title="Avançar" onPress={handleVisibility}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  image: {
    width: 292,
    height: 284,
  }
});
