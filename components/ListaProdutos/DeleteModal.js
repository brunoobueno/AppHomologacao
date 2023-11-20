import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const DeleteModal = ({ isVisible, product, onDelete, onCancel }) => {
  const handleDelete = async () => {
    await confirmDelete(product);
    onDelete(product);
    onCancel();
  };

  const confirmDelete = async (product) => {
    // Lógica para enviar solicitação de exclusão para o servidor
    try {
      const response = await fetch(`http://localhost:3000/excluir-produto/${product.ins_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Produto excluído com sucesso!');
      } else {
        console.error('Erro ao excluir produto:', response.statusText);
        // Trate o erro de acordo com a sua necessidade
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error.message);
      // Trate o erro de acordo com a sua necessidade
    }
  };

  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeaderText}>Deseja excluir o produto:</Text>
        <Text style={styles.productName}>{product?.ins_nome}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
  },
  modalHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#1a1a27',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10, // Ajuste o valor conforme necessário
    width: '40%', // Ajuste o valor conforme necessário
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DeleteModal;
