import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const IntroScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text>Интро</Text>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
