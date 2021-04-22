import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [username, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUser() {
      const user = await AsyncStorage.getItem('@plantmanager:user');

      setUserName(user || '');
    }
    loadStorageUser();
  }, [])
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <Image
        style={styles.image}
        source={{ uri: 'https://avatars.githubusercontent.com/u/28636733?s=400&u=be238c759e2c90a37a904bc3afae2b7333451001&v=4' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 25,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
