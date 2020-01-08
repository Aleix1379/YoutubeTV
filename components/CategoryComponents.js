import React from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight} from 'react-native';

const CategoryComponent = ({
  category,
  index,
  currentChannelId,
  onRowSelected,
}) => {
  const styles = StyleSheet.create({
    container: {},
    picture: {
      width: 50,
      height: 50,
    },
    name: {},
  });

  const getContainerStyle = position => {
    const style = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#222',
      paddingVertical: 4,
      paddingHorizontal: 16,
      borderColor: 'white',
    };

    if (position > 0) {
      style.borderTopWidth = 1;
    }

    return style;
  };

  const getNameStyle = () => {
    const style = {
      flex: 1,
      textAlign: 'right',
      fontSize: 22,
      color: '#fafafa',
    };

    if (category.id === currentChannelId) {
      style.color = '#FF00B4';
    }

    return style;
  };

  return (
    <TouchableHighlight onPress={() => onRowSelected(category)}>
      <View style={getContainerStyle(index)}>
        <Image
          style={styles.picture}
          source={{
            uri: category.icon,
          }}
        />

        <Text style={getNameStyle()}>{category.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default CategoryComponent;
