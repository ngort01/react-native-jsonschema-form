import React from 'react';
import { Image as ImageType } from 'react-native-image-crop-picker';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFormContext } from '../../FormContext';

const DeleteButton = ({ onPress }: { onPress: () => void; }) => {
  const { theme } = useFormContext();
  return (
    <TouchableOpacity
      style={ [
        styles.deleteButton, {
          backgroundColor: theme.requiredColor,
        },
      ] }
      onPress={ onPress }
    >
      <Text style={ styles.deleteButtonText }>
        { '\u2573' }
      </Text>

    </TouchableOpacity>
  );
};

export const MediaPreview = ({
                               item,
                               onDelete,
                             }: {
  item: ImageType | ImageType[];
  onDelete: (item: ImageType) => () => void;
}) => {

  return (
    <View style={ styles.container }>
      {
        item && !Array.isArray(item) && (
          <View style={ styles.imageWrapper }>
            <Image
              style={ styles.image }
              source={ { uri: item.path } }
              resizeMethod={ 'scale' }
              resizeMode={ 'cover' }
            />
            <DeleteButton onPress={ onDelete(item) }/>
          </View>
        )
      }

      {
        Array.isArray(item) && item.map((image) => (
          <View key={ image.path } style={ styles.imageWrapper }>
            <Image
              style={ styles.image }
              source={ { uri: image.path } }
              resizeMethod={ 'scale' }
              resizeMode={ 'cover' }
            />
            <DeleteButton onPress={ onDelete(image) }/>
          </View>
        ))
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  imageWrapper: {
    flex: 1,
    minHeight: 150,
    minWidth: 150,
    maxWidth: '50%',
    maxHeight: 200,
    padding: 8,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
  },
});
