//Cronometro
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CountdownTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0); // armazenar o tempo total em segundos
  const [customInterval, setCustomInterval] = useState(); // armazenar o intervalo do temporizador personalizado
  const [isRunning, setIsRunning] = useState(false); // informar se o temporizador está em execução
  const [inputDays, setInputDays] = useState(''); // armazenar a entrada do usuário (quantidade de dias)

  const navigation = useNavigation();

  // Inicia o temporizador com a quantidade de dias informado
  const startTimer = () => {
    if (!inputDays || isNaN(inputDays)) {
      // Verifica se o valor inserido é válido
      alert('Por favor, insira um número válido de dias.');
      return;
    }

    const seconds = parseInt(inputDays, 10) * 24 * 60 * 60;
    setTotalSeconds(seconds);
    setIsRunning(true);
  };

  // Para o temporizador
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Limpa o temporizador e a entrada do usuário
  const clearTimer = () => {
    stopTimer();
    setTotalSeconds(0);
    setInputDays('');
  };

  // converte o tempo em dias, horas, minutos e segundos
  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = time % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Atualiza o temporizador diminuindo um segundo
const updateTimer = () => {
  setTotalSeconds((prevSeconds) => {
    if (prevSeconds === 0) {
      setIsRunning(false); // Se o temporizador chegar a 0, define isRunning como falso
      return 0; // Retorna 0 para garantir que o temporizador não tenha valores negativos
    }
    return prevSeconds - 1; // Reduz o temporizador em um segundo
  });
};


  // lógica do temporizador
  useEffect(() => {
    if (isRunning) {
      setCustomInterval(setInterval(updateTimer, 1000));
    } else {
      clearInterval(customInterval);
    }

    return () => {
      clearInterval(customInterval);
    };
  }, [isRunning, customInterval]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade de dias"
        keyboardType="numeric"
        value={inputDays}
        onChangeText={(text) => setInputDays(text)}
      />
      <Text>{formatTime(totalSeconds)}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Start" onPress={startTimer} disabled={isRunning} />
        <Button title="Stop" onPress={stopTimer} disabled={!isRunning} />
        <Button title="Clear" onPress={clearTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default CountdownTimer;
