import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListaProdutos from '../../components/ListaProdutos/ListaProdutos';
import axios from 'axios';
import Modal from 'react-native-modal';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdministradorDashboardScreen = () => {
  const [userType, setUserType] = useState('Administrador');
  const [currentDate, setCurrentDate] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [estoqueBaixo, setEstoqueBaixo] = useState(0);
  const [vencimentoProximo, setVencimentoProximo] = useState(0);
  const [itensComLacunas, setItensComLacunas] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [vencimentoProximoProducts, setVencimentoProximoProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [produtosComLacunas, setProdutosComLacunas] = useState([]);
  const [pageState, setPageState] = useState(/* Seu estado inicial aqui */);
  const [pageKey, setPageKey] = useState(Date.now()); // Valor inicial pode ser qualquer valor único, como Date.now()
  const navigation = useNavigation();

  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  const resetPage = () => {
    // Altere o valor de pageKey para forçar o reset da página
    setPageKey(Date.now());
  };

  

  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleModal2 = () => setModalVisible2(!isModalVisible2);
  const toggleModal3 = () => setModalVisible3(!isModalVisible3);

  const openModalFromDashboardItem1 = () => {
    openModal();
  };

  const openModalFromDashboardItem2 = () => {
    openModal2();
  };

  const openModalFromDashboardItem3 = () => {
    openModal3();
  };

  const openModal = async () => {
    try {
      const response = await axios.get('http://localhost:3000/lista-estoque-baixo');
      setSelectedProducts(response.data.produtosEstoqueBaixo);
      toggleModal();
    } catch (error) {
      console.error('Erro ao buscar produtos com estoque baixo:', error);
    }
  };

  const openModal2 = async () => {
    try {
      const response = await axios.get('http://localhost:3000/lista-vencimento-proximo');
      setVencimentoProximoProducts(response.data.produtosVencimentoProximo);
      toggleModal2();
    } catch (error) {
      console.error('Erro ao buscar produtos com vencimento próximo:', error);
    }
  };

  const openModal3 = async () => {
    try {
      const response = await axios.get('http://localhost:3000/lista-produtos-com-lacunas');
      setProdutosComLacunas(response.data.produtosComLacunas);
      toggleModal3();
    } catch (error) {
      console.error('Erro ao buscar produtos com lacunas:', error);
    }
  };

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

    const fetchEstoqueBaixo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/estoque-baixo');
        setEstoqueBaixo(response.data.quantidadeEstoqueBaixo);
      } catch (error) {
        console.error('Erro ao buscar produtos com estoque baixo:', error);
      }
    };

    const fetchVencimentoProximo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/vencimento-proximo');
        setVencimentoProximo(response.data.quantidadeVencimentoProximo);
      } catch (error) {
        console.error('Erro ao buscar itens com vencimento próximo:', error);
      }
    };

    const fetchItensComLacunas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos-com-lacunas');
        setItensComLacunas(response.data.quantidadeProdutosComLacunas);
      } catch (error) {
        console.error('Erro ao buscar itens com lacunas:', error);
      }
    };

    fetchItensComLacunas();
    fetchVencimentoProximo();
    setCurrentDate(getCurrentDate());
    fetchProducts();
    fetchEstoqueBaixo();
    fetchItensComLacunas();
  }, []);

  return (
    <View style={styles.container}>
<View style={styles.header}>
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={(itemValue) => handleUserTypeChange(itemValue)}
        >
          <Picker.Item label="Administrador" value="administrador" />
          <Picker.Item label="Operador" value="operador" />
        </Picker>

        <View style={styles.bottomButtons1}>
        <Button
          title="Cadastrar Produto"
          onPress={() => {
            navigation.navigate('RegistrationProduct'); // Navegar para a tela de cadastro de produto
          }}
          color="#1a1a27" // Cor do botão alterada para rgb(26, 26, 39)
        />
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.dateLabelContainer}>
            <Text style={styles.dateLabel}>Data Atual</Text>
          </View>
          <View style={styles.dateValueContainer}>
            <Text style={styles.dateValue}>{currentDate}</Text>
          </View>
          
        </View>
      </View>

      <View style={styles.dashboard}>


        <br></br>
        <br></br>


        <View style={styles.dashboard}>
        <View style={styles.dashboardInfo}>
          
          {/* Dashboard Item 1 */}
          <View style={styles.dashboardItem1} onTouchEnd={openModalFromDashboardItem1}>
        <View style={styles.dashboardValueContainer}>
          <Text style={styles.dashboardValue} onPress={openModalFromDashboardItem1}>{estoqueBaixo}</Text>
          <Text style={styles.dashboardUnit}>Un.</Text>
        </View>
        <Text style={styles.dashboardTitle} onPress={openModalFromDashboardItem1}>Produtos com Estoque Baixo</Text>
      </View>


          {/* Dashboard Item 2 */}
          <View style={styles.dashboardItem2} onTouchEnd={openModalFromDashboardItem2}>
  <View style={styles.dashboardValueContainer}>
    <Text style={styles.dashboardValue}  onPress={openModalFromDashboardItem2}>{vencimentoProximo}</Text>
    <Text style={styles.dashboardUnit}>Un.</Text>
  </View>
  <Text style={styles.dashboardTitle} onPress={openModalFromDashboardItem2}>Validade Próxima do Vencimento</Text>
</View>

          {/* Dashboard Item 3 */}
      <View style={styles.dashboardItem3} onTouchEnd={openModalFromDashboardItem3}>
        <View style={styles.dashboardValueContainer}>
          <Text style={styles.dashboardValue}  onPress={openModalFromDashboardItem3}>{itensComLacunas}</Text>
          <Text style={styles.dashboardUnit}>Un.</Text>
        </View>
        <Text style={styles.dashboardTitle}  onPress={openModalFromDashboardItem3}>
          Itens que requerem atenção no Cadastro
        </Text>
      </View>

          {/* Dashboard Item 4 */}
          <View style={styles.dashboardItem4}>
          <View style={styles.dashboardValueContainer}>
              <Text style={styles.dashboardValue}>{9.3}</Text>
              <Text style={styles.dashboardUnit}>Dias</Text>
            </View>
            <Text style={styles.dashboardTitle}>Tempo médio de Reposição</Text>
          </View>

        </View>
      </View>
      </View>


      <ListaProdutos key={pageKey} products={allProducts} />

 {/* Modal 1 */}
 <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
  <View style={styles.modalContainer}>
    {/* Adicione um estilo ao View do título */}
    <View style={styles.modalTitleContainer}>
      <Text style={styles.modalTitle}>{estoqueBaixo} Produtos com Estoque Baixo</Text>
    </View>
    <FlatList
      data={selectedProducts}
      keyExtractor={(item) => item.ins_id.toString()}
      renderItem={({ item, index }) => (
        <View style={[styles.modalItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }]}>
          <View style={styles.row}>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Nome do Produto:</Text>
              <Text style={styles.modalItemText}>{item.ins_nome}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Quantidade:</Text>
              <Text style={styles.modalItemText}>{item.ins_quantidade}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Unidade de Medida:</Text>
              <Text style={styles.modalItemText}>{item.ins_medida}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Data de Vencimento:</Text>
              <Text style={styles.modalItemText}>{moment(item.ins_vencimento).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.icone1}>
            <TouchableOpacity onPress={() => handleEdit(selectedProduct)}>
      <Icon name="pencil" size={20} color="#1a1a27" />
    </TouchableOpacity>
    </View>
    <View style={styles.icone2}>
    <TouchableOpacity onPress={() => handleDelete(selectedProduct, handleDeleteCallback)}>
      <Icon name="trash" size={20} color="red" />
    </TouchableOpacity>
    </View>
          </View>
        </View>
      )}
    />
    <View style={styles.modalButtonContainer}>
    <Button title="Fechar" onPress={toggleModal} color="#1a1a27" buttonStyle={styles.modalCloseButton}/>
    </View>
  </View>
</Modal>

{/* Modal 2 */}
<Modal isVisible={isModalVisible2} onBackdropPress={toggleModal2}>
  <View style={styles.modalContainer}>
    <View style={styles.modalTitleContainer}>
      <Text style={styles.modalTitle}>{vencimentoProximo} Produtos com Vencimento Próximo</Text>
    </View>
    <FlatList
      data={vencimentoProximoProducts}
      keyExtractor={(item) => item.ins_id.toString()}
      renderItem={({ item, index }) => (
        <View style={[styles.modalItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }]}>
          <View style={styles.row}>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Nome do Produto:</Text>
              <Text style={styles.modalItemText}>{item.ins_nome}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Quantidade:</Text>
              <Text style={styles.modalItemText}>{item.ins_quantidade}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Unidade de Medida:</Text>
              <Text style={styles.modalItemText}>{item.ins_medida}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Data de Vencimento:</Text>
              <Text style={styles.modalItemText}>{moment(item.ins_vencimento).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.icone1}>
            <TouchableOpacity onPress={() => handleEdit(selectedProduct)}>
      <Icon name="pencil" size={20} color="#1a1a27" />
    </TouchableOpacity>
    </View>
    <View style={styles.icone2}>
    <TouchableOpacity onPress={() => handleDelete(selectedProduct, handleDeleteCallback)}>
      <Icon name="trash" size={20} color="red" />
    </TouchableOpacity>
    </View>
          </View>
        </View>
      )}
    />
    <View style={styles.modalButtonContainer}>
      <Button title="Fechar" onPress={toggleModal2} color="#1a1a27" buttonStyle={styles.modalCloseButton} />
    </View>
  </View>
</Modal>

{/* Modal 3 */}
<Modal isVisible={isModalVisible3} onBackdropPress={toggleModal3}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              {itensComLacunas} Produtos que requerem atenção no Cadastro
            </Text>
          </View>
          <FlatList
      data={produtosComLacunas}
      keyExtractor={(item) => item.ins_id.toString()}
      renderItem={({ item, index }) => (
        <View style={[styles.modalItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }]}>
          <View style={styles.row}>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Nome do Produto:</Text>
              <Text style={styles.modalItemText}>{item.ins_nome}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Quantidade:</Text>
              <Text style={styles.modalItemText}>{item.ins_quantidade}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Unidade de Medida:</Text>
              <Text style={styles.modalItemText}>{item.ins_medida}</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Text style={styles.modalLabel}>Data de Vencimento:</Text>
              <Text style={styles.modalItemText}>{moment(item.ins_vencimento).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.icone1}>
            <TouchableOpacity onPress={() => handleEdit(selectedProduct)}>
      <Icon name="pencil" size={20} color="#1a1a27" />
    </TouchableOpacity>
    </View>
    <View style={styles.icone2}>
    <TouchableOpacity onPress={() => handleDelete(selectedProduct, handleDeleteCallback)}>
      <Icon name="trash" size={20} color="red" />
    </TouchableOpacity>
    </View>
          </View>
        </View>
      )}
    />
          <View style={styles.modalButtonContainer}>
            <Button
              title="Fechar"
              onPress={toggleModal3}
              color="#1a1a27"
              buttonStyle={styles.modalCloseButton}
            />
          </View>
        </View>
      </Modal>

      
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

export default AdministradorDashboardScreen;
