import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize } from '../../EstilosGlobais/GlobalStyles';

const SplashScreenComponent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Lugar adicional para acrescentar uma nova lógica
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      navigation.replace('LoginScreen'); // Navegue para a tela de login após 2 segundos
    }, 2000);
  }, []);

  return (
    <View style={styles.splashScreen}>
      <View style={styles.centered}>
        <Image
          style={styles.logoIcon}
          contentFit="cover"
          source={require('../../imagens/logo-branca.png')}
        />
      </View>

      <View style={styles.centered}>
        <Image
          style={styles.loadingGif}
          source={require('../../imagens/animacao.gif')} // Substitua com o caminho do seu gif
        />
      </View>

      <View style={styles.centered}>
        <Text style={styles.textTypo}>
          {`desenvolvido`}
        </Text>
        <Text style={styles.textTypo}>
          {`SPECTRUM SOLUTIONS`}
        </Text>
        <Text style={styles.textTypo}>
          {`© 2023 alquimia indústria. Todos os direitos reservados.`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#1a1a27',
    justifyContent: 'space-around',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTypo: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratRegular,
    textAlign: 'center',
    fontSize: FontSize.size_xs,
    marginVertical: 2, // Ajuste o espaçamento vertical entre os textos
  },
  logoIcon: {
    width: 151,
    height: 151,
    marginTop: 200,
  },
  loadingGif: {
    width: 80,
    height: 80,
  },
});

export default SplashScreenComponent;
