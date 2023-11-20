import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, BackHandler, ScrollView, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontSize, Color, FontFamily, Padding } from '../../EstilosGlobais/GlobalStyles';
import axios from 'axios';
import { HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment'; // Importe o Moment.js para trabalhar com datas


// Lista de unidades
const unidades = ['ML', 'LT', 'UN', 'g', 'KG'];

// Função para cadastrar produto
const cadastrarProduto = async (dadosProduto) => {
  try {
    const response = await axios.post('http://localhost:3000/inserir-produto', dadosProduto);

    if (response.status === 200) {
      console.log('Produto cadastrado com sucesso!');
      return true;
    } else {
      console.error('Erro ao cadastrar o produto na API:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Erro ao cadastrar o produto na API:', error.message);
    return false;
  }
};

const RegistrationProduct = () => {
  const navigation = useNavigation();

  const [codigoProduto, setCodigoProduto] = useState('');
  const [erroCodigo, setErroCodigo] = useState('');

  const [nomeProduto, setNomeProduto] = useState('');
  const [erroNome, setErroNome] = useState('');

  const [quantityProduct, setQuantityProduct] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('ML'); // Unidade selecionada

  const [batchNumber, setBatchNumber] = useState('');
  const [showBatchError, setShowBatchError] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () => backHandler.remove();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
    return true;
  };

  const onPressFinalizar = async () => {
    const codigoValido = codigoProduto.trim() !== '';
    const nomeValido = nomeProduto.trim() !== '';
    const loteValido = batchNumber !== '';

    setErroCodigo(codigoValido ? '' : 'Digite um código válido!!!');
    setErroNome(nomeValido ? '' : 'Digite um nome válido!!!');
    setShowBatchError(loteValido ? false : true);
    

    if (codigoValido && nomeValido && loteValido) {
      // Calcula a data de vencimento (data atual + 90 dias)
      const ins_cadastro = moment().format('YYYY-MM-DD HH:mm:ss');
      const dataVencimento = moment().add(90, 'days').format('YYYY-MM-DD HH:mm:ss');
  
      const dadosProduto = {
        nomeProduto,
        quantityProduct,
        batchNumber,
        selectedUnit,
        ins_medida: selectedUnit,
        ins_cadastro,
        ins_vencimento: dataVencimento,
      };

      try {
        const cadastradoComSucesso = await cadastrarProduto(dadosProduto);
  
        if (cadastradoComSucesso) {
          navigation.navigate('RegisteredProduct');
        } else {
          // Tratar o caso de falha ao cadastrar o produto, se necessário
        }
      } catch (error) {
        console.error('Erro ao cadastrar o produto:', error);
        // Tratar o erro, se necessário
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Adicione o ícone de seta para a esquerda no canto superior esquerdo */}
      <Icon
        name="arrow-left"
        size={24}
        color="#1A1A27"
        style={styles.backIcon}
        onPress={handleGoBack}
      />
      <Text style={styles.title}>PREENCHA AS INFORMAÇÕES ABAIXO PARA FINALIZAR O CADASTRO</Text>

      <View style={styles.column}>
        <Text style={styles.label}>CÓDIGO DO PRODUTO</Text>
        <TextInput
          style={[styles.input, erroCodigo && styles.inputError]}
          placeholder="Digite o código do produto"
          onChangeText={(text) => {
            setCodigoProduto(text);
            setErroCodigo('');
          }}
          value={codigoProduto}
        />
        <Text style={styles.errorMessage}>{erroCodigo}</Text>

        <Text style={styles.label}>QUANTIDADE:</Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={[styles.input, styles.quantityInput]}
            placeholder="Digite a quantidade"
            onChangeText={(text) => setQuantityProduct(text.replace(/[^0-9]/g, ''))}
            value={quantityProduct}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={selectedUnit}
            style={[styles.input, styles.picker, styles.quantityInput]}
            onValueChange={(itemValue, itemIndex) => setSelectedUnit(itemValue)}
          >
            {unidades.map((unidade, index) => (
              <Picker.Item key={index} label={unidade} value={unidade} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>NOME</Text>
        <TextInput
          style={[styles.input, erroNome && styles.inputError]}
          placeholder="Digite o nome do produto"
          onChangeText={(text) => {
            setNomeProduto(text);
            setErroNome('');
          }}
          value={nomeProduto}
        />
        <Text style={styles.errorMessage}>{erroNome}</Text>

        <Text style={styles.label}>LOTE:</Text>
        <TextInput
          style={[styles.input, showBatchError && styles.inputError]}
          placeholder="Digite o lote do produto"
          onChangeText={(text) => {
            setBatchNumber(text);
            setShowBatchError(false);
          }}
          value={batchNumber}
        />
        {showBatchError && (
          <Text style={styles.errorMessage}>Digite um lote válido!!!</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={onPressFinalizar}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    padding: 16,
    fontFamily: FontFamily.montserratRegular,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    marginBottom: 20,
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A27',
    fontFamily: FontFamily.montserratRegular,
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: 'white',  // Cor de fundo branca
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
    fontFamily: FontFamily.montserratRegular,
  },
  inputError: {
    borderColor: 'red',
    fontFamily: FontFamily.montserratRegular,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#1A1A27',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    elevation: 2,
    fontFamily: FontFamily.montserratRegular,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: FontFamily.montserratRegular,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  quantityInput: {
    flex: 1,
  },
  picker: {
    height: 40,
    width: 20, // Largura desejada
    borderRadius: 12,
    borderWidth: 1,
    marginLeft: 8, // Espaçamento entre o TextInput e o Picker
    backgroundColor: 'white',  // Cor de fundo branca
  },
  backIcon: {
    position: 'absolute',
    top: 16,
    left: 80,
    zIndex: 1,
  },
});

export default RegistrationProduct;
