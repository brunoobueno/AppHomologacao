import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuantilyProduct = () => {
  const navigation = useNavigation();

  const handleFinished = () => {
    // Reinicia a pilha de navegação para a tela 'OperatorDashboardScreen'
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdministradorDashboardScreen' }],
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.message}>REGISTRO CONCLUÍDO</Text>
      <Button title="Próximo" onPress={handleFinished} color="#1A1A27" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A1A27',
  },
});

export default QuantilyProduct;