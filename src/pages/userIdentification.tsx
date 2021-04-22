import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
 } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {Button} from '../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFocused(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if(!name){
      return Alert.alert('Por favor me diga seu nome 😢')
    }
    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: `Agora vamos começar a cuidar das suas plantinhas com muito cuidado.`,
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      });
    } catch {
      Alert.alert('Não foi possível salvar o seu nome. 😢');
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <View style={styles.form}>
                <View style={styles.body}>
                  <Text style={styles.emoji}>
                    {isFilled ? '😄' : '🙂'}
                  </Text>
                  <Text style={styles.title}>
                    Como podemos {'\n'}
                    chamar você?
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      (isFocused || isFilled) && { borderColor: colors.green }
                    ]}
                    placeholder="Your name"
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onChangeText={handleInputChange}
                  />
                </View>
                <View style={styles.footer}>
                  <Button title="Confirmar" onPress={handleSubmit}/>
                </View>
              </View>
            </View>

          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 34,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20
  },
  emoji:{
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: Dimensions.get('window').width * 0.7,
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  body: {
    alignItems: 'center'
  },
  footer: {
    marginTop: 30,
    paddingHorizontal: 20,
    width: '100%',
  }
});
