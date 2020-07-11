import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { useFormContext } from '../../FormContext';
import { WidgetProps } from '@rjsf/core';
import { MediaPreview } from './MediaPreview';

const asBase64 = (item: Image | Image[]) => {
  if (item) {
    if (Array.isArray(item)) {
      return item.map(image => `data:${ image.mime };base64,${ image.data }`);
    } else {
      return `data:${ item.mime };base64,${ item.data }`;
    }
  }
  return item;
};

export const MediaPickerWidget = ({
                                    value,
                                    onChange,
                                    multiple,
                                  }: WidgetProps) => {
  const { theme } = useFormContext();
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ selectedMedia, setSelectedMedia ] = useState(value);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const options = {
    includeBase64: true,
    compressImageMaxWidth: 1920,
    compressImageMaxHeight: 1080,
    compressImageQuality: 0.8,
    multiple,
  };

  useEffect(() => {
    onChange(asBase64(selectedMedia));
  }, [ onChange, selectedMedia ]);

  const onItemsChange = (item: Image | Image[]) => {
    if (Array.isArray(item)) {
      setSelectedMedia([ ...selectedMedia, ...item ]);
    } else {
      setSelectedMedia(item);
    }
  };

  const deleteSelected = (item: Image) => () => {
    setSelectedMedia(selectedMedia.filter((media: Image) => media.path !== item.path));
  };

  const openCamera = () => {
    ImagePicker.openCamera(options).then(res => {
      hideModal();
      onItemsChange(res);
    });
  };

  const openPicker = () => {
    ImagePicker.openPicker(options).then(res => {
      hideModal();
      onItemsChange(res);
    });
  };

  return (
    <View>
      <TouchableHighlight
        style={ styles.pickMediaButton }
        underlayColor="#979B9E"
        onPress={ showModal }>
        <Text style={ [
          styles.pickMediaButtonText,
          { color: theme.primaryColor },
        ] }
        >
          + Fotos hinzufügen
        </Text>
      </TouchableHighlight>
      <MediaPreview
        item={ selectedMedia }
        onDelete={ deleteSelected }
      />

      <Modal
        animationType="fade"
        transparent={ true }
        visible={ modalVisible }
        onRequestClose={ hideModal }
      >
        <TouchableWithoutFeedback style={ styles.container } onPress={ hideModal }>
          <View style={ styles.centeredView }>
            <View style={ styles.modalView }>

              <View style={ styles.modalContent }>
                <TouchableHighlight
                  style={ styles.modalButton }
                  underlayColor="#979B9E"
                  onPress={ openCamera }>
                  <Text style={ styles.modalButtonText }>Foto aufnehmen...</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={ styles.modalButton }
                  underlayColor="#979B9E"
                  onPress={ openPicker }>
                  <Text style={ styles.modalButtonText }>
                    Aus der Gallerie auswählen...
                  </Text>
                </TouchableHighlight>
              </View>

              <View style={ styles.modalFooter }>
                <TouchableHighlight
                  style={ styles.modalButton }
                  underlayColor="#979B9E"
                  onPress={ hideModal }>
                  <Text style={ styles.modalButtonText }>Abbrechen</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
  modalView: {
    margin: 20,
    width: '80%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 9,
    paddingVertical: 16,
    paddingHorizontal: 8,
    elevation: 5,
  },
  modalContent: {},
  modalFooter: {},
  modalButton: {
    padding: 16,
    borderRadius: 4,
  },
  modalButtonText: {
    fontSize: 16,
  },
});

export default MediaPickerWidget;
