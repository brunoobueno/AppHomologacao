import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput } from 'react-native';
import moment from 'moment';


const EditModal = ({ isVisible, selectedProduct, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState({
    ins_id: null, // Adicione o ins_id ao estado
    ins_nome: '',
    ins_quantidade: 0,
    ins_medida: '',
    ins_cadastro: '',
  });

  useEffect(() => {
    if (selectedProduct) {
      setEditedProduct({
        ins_id: selectedProduct.ins_id, // Certifique-se de adicionar o ins_id
        ins_nome: selectedProduct.ins_nome,
        ins_quantidade: selectedProduct.ins_quantidade,
        ins_medida: selectedProduct.ins_medida,
        ins_cadastro: moment(selectedProduct.ins_cadastro).format('DD/MM/YYYY'), // Adicione a formatação da data de cadastro
    });
    }
  }, [selectedProduct]);

  const handleSave = () => {
    // Certifique-se de que ins_id não é undefined antes de fazer a requisição PUT
    if (editedProduct.ins_id !== undefined) {
      // Execute a lógica de validação, se necessário
      onSave(editedProduct);
    } else {
      console.error('ID do produto não definido ao salvar.');
    }
  };

  return (
        <Modal visible={isVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.modalTitle}>Editar Produto</Text>
              </View>
      
              <View style={styles.infoColumn}>
  <Text style={styles.infoTitle}>ID do Produto:</Text>
  <View style={styles.borderedTextContainer}>
    <Text style={styles.borderedText}>{editedProduct?.ins_id}</Text>
  </View>
      
                <View style={styles.infoColumn}>
                  <Text style={styles.infoTitle}>Nome do Produto:</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProduct?.ins_nome}
                    onChangeText={(text) => setEditedProduct({ ...editedProduct, ins_nome: text })}
                  />
                </View>
      
                <View style={styles.infoColumn}>
                  <Text style={styles.infoTitle}>Quantidade:</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProduct?.ins_quantidade.toString()}
                    onChangeText={(text) => setEditedProduct({ ...editedProduct, ins_quantidade: Number(text) })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
      
              <View style={styles.infoContainer}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoTitle}>Unidade de Medida:</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProduct?.ins_medida}
                    onChangeText={(text) => setEditedProduct({ ...editedProduct, ins_medida: text })}
                  />
                </View>
      
                <View style={styles.infoColumn}>
                  <Text style={styles.infoTitle}>Data de Cadastro:</Text>
                  <View style={styles.borderedTextContainer}>
                  <Text style={styles.borderedText}>{editedProduct?.ins_cadastro}</Text>
                </View>
                </View>
              </View>
      
              <View style={styles.buttonContainer}>
                <Button title="Cancelar" onPress={onCancel} color="#1a1a27" />
                <Button title="Salvar" onPress={handleSave} color="#1a1a27" />
              </View>
            </View>
          </View>
        </Modal>
      );
      };
      
      const styles = StyleSheet.create({
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        modalContent: {
          backgroundColor: 'white',
          width: '80%',
          borderRadius: 10,
          elevation: 5,
          padding: 20,
        },
        header: {
          backgroundColor: '#1a1a27',
          padding: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          marginBottom: 10,
        },
        modalTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: 'white',
        },
        infoContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        },
        infoColumn: {
          flex: 1,
          marginRight: 10,
        },
        infoTitle: {
          fontWeight: 'bold',
        },
        input: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 10,
          padding: 5,
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        },
        borderedTextContainer: {
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            padding: 5,
            backgroundColor: '#f0eded', // Adicione a cor cinza de fundo
          },
          borderedText: {
            height: 40,
          },
      });

export default EditModal;
