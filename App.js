import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from '@expo-google-fonts/montserrat';
import Navigation from './components/Navegação/Navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('./Fonts/Montserrat-Regular.ttf'), // Verifique o caminho do arquivo
  });

  if (!fontsLoaded) {
    return null; // Aguarde até que as fontes estejam carregadas
  }

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
