import React, { SyntheticEvent, useMemo, useRef, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { WidgetProps } from '@rjsf/core';

import { htmlContent } from './webapp/html';
import signaturePadScript from './webapp/js/signature_pad';
import { appScript } from './webapp/js/app';

const SignatureWidget = ({
                           value,
                           onChange,
                         }: WidgetProps) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const source = useMemo(() => {
    const script = signaturePadScript + appScript({ dataURL: value });
    const html = htmlContent({ script });
    return { html };
  }, [ value ]);

  const onModalClose = () => setModalVisible(false);

  const handleSignature = (signature: String) => {
    onChange(signature);
    setModalVisible(false);
  };

  const readSignature = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript('readSignature();true;');
    }
  };
  const clearSignature = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript('clearSignature();true;');
    }
  };

  const onMessage = (e: any) => {
    switch (e.nativeEvent.data) {
      case 'BEGIN':
        break;
      case 'END':
        break;
      case 'EMPTY':
        break;
      case 'CLEAR':
        break;
      default:
        handleSignature(e.nativeEvent.data);
    }
  };

  const renderError = (e: SyntheticEvent) => {
    const { nativeEvent } = e;
    console.warn('WebView error: ', nativeEvent);
  };

  return (
    <>
      <TouchableHighlight
        style={ styles.webBg }
        underlayColor="#979B9E"
        onPress={ () => {
          setModalVisible(!modalVisible);
        } }>
        <View style={ styles.flex }>
          <Image
            style={ styles.image }
            source={ { uri: value } }
            resizeMode="contain"
          />
        </View>
      </TouchableHighlight>

      <Modal
        animationType="slide"
        transparent={ false }
        visible={ modalVisible }
        presentationStyle="fullScreen"
        onRequestClose={ onModalClose }>
        <View style={ styles.header }>
          <TouchableOpacity style={ styles.closeButton } onPress={ onModalClose }>
            <Text style={ styles.buttonText }>Schließen</Text>
          </TouchableOpacity>
        </View>

        <WebView
          ref={ webViewRef }
          source={ source }
          onMessage={ onMessage }
          javaScriptEnabled={ true }
          onError={ renderError }
        />
        <View style={ styles.footer }>
          <TouchableHighlight style={ styles.button } onPress={ clearSignature }>
            <Text style={ styles.buttonText }>Löschen</Text>
          </TouchableHighlight>
          <TouchableHighlight style={ styles.button } onPress={ readSignature }>
            <Text style={ styles.buttonText }>Speichern</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </>
  );
};

export default SignatureWidget;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  webBg: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFF',
    borderColor: '#979B9E',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
    fontSize: 16,
  },
  loadingOverlayContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  header: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 50,
  },

  footer: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
  },

  button: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue',
    borderRadius: 9,
    //elevation: 2,
  },

  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: '', // hack for cutoff text on OnePlus/Oppo/... phones
  },
});
