import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {svgPhone} from '../../components/svgImage';

const IntroScreen = ({navigation}) => {
  const [subscription, setSubscription] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Полная версия',
      headerTitleAlign: 'center',
      headerShown: true,
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SvgXml style={styles.subscriptionImg} xml={svgPhone} />

      <Text style={styles.subscriptionDescr}>
        В бесплатной версии Вы можете ознакомиться с первыми 2 главами, чтобы
        открыть остальные, преобретите, пожалуйста, полную версию.
      </Text>

      <Pressable
        style={styles.subscriptionButton}
        onPress={() => alert('Click!')}>
        <Text style={styles.subscriptionButtonText}>
          Купить полную версию за 499 ₽
        </Text>
      </Pressable>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  subscriptionImg: {
    marginBottom: 35,
  },
  subscriptionDescr: {
    fontSize: 21,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 35,
    width: '89%',
  },
  subscriptionButton: {
    paddingVertical: 15,
    paddingHorizontal: 27,
    backgroundColor: '#387EA6',
    borderRadius: 10,
    width: '100%',
  },
  subscriptionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
});
