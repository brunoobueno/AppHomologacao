import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListaProdutos from '../../components/ListaProdutos/ListaProdutos';
import axios from 'axios';
import Picker from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import moment from 'moment';

const OperadorDashboardScreen = () => {
    const [userType, setUserType] = useState('Operador');
    const [currentDate, setCurrentDate] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [pageKey, setPageKey] = useState(Date.now());
    const navigation = useNavigation();

    const getCurrentDate = () => {
        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      };
    
      const toggleModal = () => setModalVisible(!isModalVisible);
    
      const handleUserTypeChange = (value) => {
        setUserType(value);
        if (value === 'administrador') {
          console.log('Navegar para a página do administrador');
        }
      };
    
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:3000/produtos');
            setAllProducts(response.data);
          } catch (error) {
            console.error('Erro ao buscar produtos:', error);
          }
        };
    
        fetchProducts();
        setCurrentDate(getCurrentDate());
      }, []);

  return (
    <View style={styles.container}>
<View style={styles.header}>

        <View style={styles.dateContainer}>
          <View style={styles.dateLabelContainer}>
            <Text style={styles.dateLabel}>Data Atual</Text>
          </View>
          <View style={styles.dateValueContainer}>
            <Text style={styles.dateValue}>{currentDate}</Text>
          </View>
          
        </View>
      </View>

      <ListaProdutos key={pageKey} products={allProducts} />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a27', // Cor de fundo alterada para rgb(26, 26, 39)
    textAlign: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1a1a27',
  },
  picker: {
    color: 'white',
    backgroundColor: '#1a1a27',
    width: 150,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabelContainer: {
    backgroundColor: '#1a1a27',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  dateLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: 'white',
  },
  dateValueContainer: {
    backgroundColor: '#1a1a27',
    padding: 10,
    borderRadius: 5,
  },
  dateValue: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: 'white',
  },
  dashboard: {
    marginBottom: 16,
    marginLeft: 15,
    marginRight: 15,
  },
  container: {
    flex: 1,
  }, 
  dashboardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    alignItems: 'center',
  },
  dashboardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardItem1: {
    flex: 1,
    backgroundColor: '#ff6961', // Cor de fundo do retângulo arredondado
    borderRadius: 10, // Borda arredondada
    padding: 16,
    margin: 8,
  },
  dashboardItem2: {
    flex: 1,
    backgroundColor: '#77dd77', // Cor de fundo do retângulo arredondado
    borderRadius: 10, // Borda arredondada
    padding: 16,
    margin: 8,
  },
  dashboardItem3: {
    flex: 1,
    backgroundColor: '#dfd880', // Cor de fundo do retângulo arredondado
    borderRadius: 10, // Borda arredondada
    padding: 16,
    margin: 8,
  },
  dashboardItem4: {
    flex: 1,
    backgroundColor: '#77dd77', // Cor de fundo do retângulo arredondado
    borderRadius: 10, // Borda arredondada
    padding: 16,
    margin: 8,
  },
  dashboardValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  dashboardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 4,
  },
  dashboardUnit: {
    fontSize: 16,
  },
  productList: {
    flex: 1,
  },
  productListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#F2F2F2', // Cor de fundo do modal
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white', // Cor do texto do título
    backgroundColor: '#1a1a27',
    padding: 10,
  },
  modalItem: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalItemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalLabel: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  centeredColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtonContainer: {
    marginTop: 20, // Espaço acima do botão
    alignSelf: 'center', // Alinha o botão ao centro horizontalmente
  },
  modalCloseButton: {
    width: 120, // Aumente a largura do botão
    padding: 12, // Aumente o espaçamento interno do botão
    marginBottom: 10, // Mantenha o espaçamento abaixo do botão
  },
  icone1: {
    marginRight: 10,
  },
  icone2: {
    marginRight: 10,
  },
});

export default OperadorDashboardScreen;
