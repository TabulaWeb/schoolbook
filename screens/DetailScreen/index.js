import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import GlobalStore from '../../store/global';
import UserStore from '../../store/user';

const DetailScreen = ({route, navigation}) => {
  const {idChapter} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [subscription, setSubscription] = useState('');

  const getUrlPay = () => {
    fetch(
      `http://194.67.111.21:1337/api/pay/url/?token=${UserStore.userToken}`,
      {
        method: 'GET',
      },
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        setSubscription(json.url);
        console.log(json);
      });
  };

  useEffect(() => {
    const getBookmark = navigation.addListener('focus', async () => {
      console.log(UserStore.userPay);

      if (UserStore.userPay == false || UserStore.userPay == undefined) {
        getUrlPay();
        if (idChapter > 2) {
          setModalVisible(!modalVisible);
        }
      }
    });
    return getBookmark;
  }, [idChapter, modalVisible, navigation]);
  // const getUserPayStatus = async () => {
  //   const responsePay = await fetch(
  //     `http://194.67.116.116:1337/api/pay/check/?token=${UserStore.userToken}`,
  //     {
  //       method: 'GET',
  //     },
  //   );

  //   const resultPayResponse = await responsePay.json();
  //   setPayStatus(resultPayResponse.pay);
  // };

  // useEffect(() => {
  //   getUserPayStatus();
  //   console.log(payStatus);
  //   console.log(GlobalStore.bookData[idChapter - 1].id);

  //   if (GlobalStore.bookData[idChapter - 1].id <= 2) {
  //     setTrialVersion(true);
  //   }

  //   if (payStatus == true) {
  //     setTrialVersion(false);
  //   }
  // }, [idChapter, payStatus]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: GlobalStore.bookData[idChapter - 1].title,
      headerTitleAlign: 'center',
      headerShadowVisible: false,
    });
  }, [idChapter, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.content, styles.itemsbook]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          backdropOpacity={0}
          style={styles.modalContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('HomeScreen')}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                В бесплатной версии приложения доступны первые 2 главы.
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => Linking.openURL(subscription)}>
                <Text style={styles.textStyle}>
                  Купить полную версию за 499 ₽{' '}
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {GlobalStore.bookData[idChapter - 1].articles.map(i => (
          <View key={i.key}>
            <Pressable
              style={styles.itembook}
              onPress={() =>
                navigation.navigate('ArticleScreen', {
                  articleKey:
                    GlobalStore.bookData[idChapter - 1].articles.indexOf(i) + 1,
                  chapterId: idChapter,
                })
              }>
              <Text style={styles.itembookNumber}>
                {GlobalStore.bookData[idChapter - 1].articles.indexOf(i) + 1}
              </Text>
              <Text style={styles.itembookTitle}>{i.title}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemsbook: {
    paddingLeft: 20,
  },
  itembook: {
    paddingTop: 15,
    flexDirection: 'row',
    paddingRight: 20,
  },
  itembookNumber: {
    marginRight: 21,
    fontSize: 16,
    color: '#B1B5B7',
    fontWeight: '500',
  },
  itembookTitle: {
    fontSize: 18,
    color: '#020A0E',
    fontWeight: '400',
    width: '100%',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C2C2C2',
    paddingRight: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: '#50C7F8',
    borderWidth: 3,
  },
  button: {
    padding: 10,
    width: '100%',
    borderColor: '#50C7F8',
    borderTopWidth: 3,
  },
  textStyle: {
    color: "#50C7F8",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    marginHorizontal: 25,
    marginTop: 15,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center"
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
