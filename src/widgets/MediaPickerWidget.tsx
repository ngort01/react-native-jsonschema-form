import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export const MediaPickerWidget = () => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const openCamera = () => {
  };

  const openPicker = () => {
  };

  return (
    <View>
      <TouchableHighlight
        style={ styles.pickMediaButton }
        underlayColor="#979B9E"
        onPress={ showModal }>
        <Text style={ styles.pickMediaButtonText }>+ Add File</Text>
      </TouchableHighlight>
      <Modal
        animationType="fade"
        transparent={ true }
        visible={ modalVisible }
        onRequestClose={ hideModal }>
        <View style={ styles.centeredView }>
          <View style={ styles.modalView }>
            <View style={ styles.modalHeader }></View>
            <View>
              <TouchableHighlight
                style={ styles.modalButton }
                underlayColor="#979B9E"
                onPress={ openCamera }>
                <Text style={ styles.modalButtonText }>Take Photo/Video...</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={ styles.modalButton }
                underlayColor="#979B9E"
                onPress={ openPicker }>
                <Text style={ styles.modalButtonText }>
                  Select from Library...
                </Text>
              </TouchableHighlight>
            </View>
            <View style={ styles.modalFooter }>
              <TouchableHighlight
                style={ styles.modalButton }
                underlayColor="#979B9E"
                onPress={ hideModal }>
                <Text style={ styles.modalButtonText }>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickMediaButton: {
    paddingVertical: 16,
  },
  pickMediaButtonText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#66BFFF',
    fontWeight: 'bold',
    fontFamily: '', // hack for cutoff text on OnePlus/Oppo/... phones
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '80%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 9,
    paddingVertical: 16,
    elevation: 5,
  },
  modalHeader: {},
  modalFooter: {},
  modalButton: {
    padding: 16,
  },
  modalButtonText: {
    fontSize: 16,
  },
});

export default MediaPickerWidget;
