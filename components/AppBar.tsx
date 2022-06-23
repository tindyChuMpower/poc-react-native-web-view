import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import create from 'zustand';
import {useNavigation} from '@react-navigation/native';
import {THomeProp} from '../pages/Home';

type TProcessStore = {
  key: string;
  setKey: (key: string) => void;
};

export const appBarStore = create<TProcessStore>(set => ({
  key: '',
  setKey: (key: string) => {
    set({key});
  },
}));

export default function AppBar() {
  const key = appBarStore(state => state.key);
  const setKey = appBarStore(state => state.setKey);
  const navigation = useNavigation<THomeProp>();

  const leftStyle = {
    ...styles.buttonLeft,
  };
  if (key === 'items') {
    leftStyle.opacity = 1;
  }

  const rightStyle = {
    ...styles.buttonRight,
  };
  if (key === 'settings') {
    rightStyle.opacity = 1;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Text
        style={leftStyle}
        onPress={() => {
          setKey('items');
          navigation.navigate('Items');
        }}>
        Items
      </Text>
      <Text style={rightStyle}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLeft: {
    width: '50%',
    backgroundColor: '#004280',
    opacity: 0.6,
    textAlign: 'center',
  },
  buttonRight: {
    width: '50%',
    backgroundColor: '#80004d',
    opacity: 0.6,
    textAlign: 'center',
  },
});
