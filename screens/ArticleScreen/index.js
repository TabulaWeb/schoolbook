import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import {dataArticle} from '../../data/chapter1';
import DeviceBrightness from '@adrianso/react-native-device-brightness';
import Svg, {Path} from 'react-native-svg';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const ArticleScreen = ({route, navigation}) => {
  const {articleKey, chapterId} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={styles.buttonContent}>
          <Pressable onPress={() => toggleModal()}>
            <Svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M10.2062 18.2576H9.29903V3.74206H14.7423V4.64938C14.7423 5.15106 15.1478 5.55655 15.6495 5.55655C16.1512 5.55655 16.5566 5.15106 16.5566 4.64938V2.8349C16.5566 2.33322 16.1512 1.92773 15.6495 1.92773H0.907161C0.40549 1.92773 0 2.33322 0 2.8349V4.64938C0 5.15106 0.40549 5.55655 0.907161 5.55655C1.40883 5.55655 1.81449 5.15106 1.81449 4.64938V3.74206H7.48454V18.2576H6.57738C6.0757 18.2576 5.67005 18.6631 5.67005 19.1648C5.67005 19.6665 6.0757 20.072 6.57738 20.072H10.2062C10.7079 20.072 11.1133 19.6665 11.1133 19.1648C11.1133 18.6631 10.7079 18.2576 10.2062 18.2576Z"
                fill="#020A0E"
              />
              <Path
                d="M21.0927 10.0928H13.8349C13.3332 10.0928 12.9277 10.4983 12.9277 10.9999V12.5875C12.9277 13.0892 13.3332 13.4948 13.8349 13.4948C14.3366 13.4948 14.7422 13.0892 14.7422 12.5875V11.9071H16.5565V18.2577H16.103C15.6014 18.2577 15.1957 18.6632 15.1957 19.1649C15.1957 19.6666 15.6014 20.0721 16.103 20.0721H18.8247C19.3264 20.0721 19.7319 19.6666 19.7319 19.1649C19.7319 18.6632 19.3264 18.2577 18.8247 18.2577H18.371V11.9071H20.1855V12.3608C20.1855 12.8624 20.591 13.2679 21.0927 13.2679C21.5944 13.2679 21.9998 12.8624 21.9998 12.3608V10.9999C21.9998 10.4983 21.5944 10.0928 21.0927 10.0928Z"
                fill="#020A0E"
              />
            </Svg>
          </Pressable>
          <Pressable
            style={[styles.iconHeader, styles.iconHeaderCenter]}
            onPress={() => alert('Clicked!')}>
            <Svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M14.8995 7.10082C13.9101 6.1114 12.5133 5.47119 11 5.47119C9.48682 5.47119 8.09 6.0823 7.10058 7.10082C6.11116 8.09024 5.47095 9.48706 5.47095 11.0003C5.47095 12.5135 6.11116 13.9103 7.10058 14.8998C8.09 15.8892 9.48682 16.5294 11 16.5294C12.5133 16.5294 13.9101 15.9183 14.8995 14.8998C15.8889 13.9103 16.5291 12.5135 16.5291 11.0003C16.5291 9.48706 15.918 8.09024 14.8995 7.10082Z"
                fill="#020A0E"
              />
              <Path
                d="M11 3.75397C11.4074 3.75397 11.7566 3.40476 11.7566 2.99735V0.756613C11.7566 0.349206 11.4074 0 11 0C10.5926 0 10.2434 0.349206 10.2434 0.756613V2.99735C10.2434 3.40476 10.5926 3.75397 11 3.75397Z"
                fill="#020A0E"
              />
              <Path
                d="M17.1985 5.87812L18.799 4.27759C19.09 3.98659 19.09 3.52098 18.799 3.22997C18.508 2.93897 18.0424 2.93897 17.7514 3.22997L16.1509 4.8305C15.8599 5.12151 15.8599 5.58712 16.1509 5.87812C16.4128 6.16913 16.8784 6.16913 17.1985 5.87812Z"
                fill="#020A0E"
              />
              <Path
                d="M21.2435 10.2432H19.0027C18.5953 10.2432 18.2461 10.5924 18.2461 10.9998C18.2461 11.4072 18.5953 11.7564 19.0027 11.7564H21.2435C21.6509 11.7564 22.0001 11.4072 22.0001 10.9998C22.0001 10.5924 21.6509 10.2432 21.2435 10.2432Z"
                fill="#020A0E"
              />
              <Path
                d="M17.1694 16.1216C16.8784 15.8306 16.4128 15.8306 16.1218 16.1216C15.8308 16.4126 15.8308 16.8782 16.1218 17.1692L17.7223 18.7697C18.0134 19.0607 18.479 19.0607 18.77 18.7697C19.061 18.4787 19.061 18.0131 18.77 17.7221L17.1694 16.1216Z"
                fill="#020A0E"
              />
              <Path
                d="M11 18.2461C10.5926 18.2461 10.2434 18.5953 10.2434 19.0027V21.2435C10.2434 21.6509 10.5926 22.0001 11 22.0001C11.4074 22.0001 11.7566 21.6509 11.7566 21.2435V19.0027C11.7566 18.5953 11.4074 18.2461 11 18.2461Z"
                fill="#020A0E"
              />
              <Path
                d="M4.80145 16.1216L3.20092 17.7221C2.90991 18.0131 2.90991 18.4787 3.20092 18.7697C3.49193 19.0607 3.95753 19.0607 4.24854 18.7697L5.84907 17.1692C6.14007 16.8782 6.14007 16.4126 5.84907 16.1216C5.58716 15.8306 5.12155 15.8306 4.80145 16.1216Z"
                fill="#020A0E"
              />
              <Path
                d="M3.75397 10.9998C3.75397 10.5924 3.40476 10.2432 2.99735 10.2432H0.756613C0.349206 10.2432 0 10.5924 0 10.9998C0 11.4072 0.349206 11.7564 0.756613 11.7564H2.99735C3.40476 11.7564 3.75397 11.4072 3.75397 10.9998Z"
                fill="#020A0E"
              />
              <Path
                d="M4.80145 5.87812C5.09245 6.16913 5.55806 6.16913 5.84907 5.87812C6.14007 5.58712 6.14007 5.12151 5.84907 4.8305L4.24854 3.22997C3.95753 2.93897 3.49193 2.93897 3.20092 3.22997C2.90991 3.52098 2.90991 3.98659 3.20092 4.27759L4.80145 5.87812Z"
                fill="#020A0E"
              />
            </Svg>
          </Pressable>
          <Pressable onPress={() => alert('Clicked!')}>
            <Svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M18.0983 0H3.90177C3.45726 0 3.09692 0.360379 3.09692 0.804848V21.1945C3.09692 21.9115 3.96627 22.2683 4.47085 21.7636L11.0001 15.2344L17.5293 21.7636C18.032 22.2665 18.9032 21.9157 18.9032 21.1945V0.804848C18.9032 0.360379 18.5428 0 18.0983 0ZM4.70662 1.6097H17.2935V3.31401H4.70662V1.6097ZM17.2934 19.2514L11.5692 13.5271C11.2549 13.2128 10.7453 13.2128 10.4309 13.5271L4.70662 19.2514V4.92371H17.2935V19.2514H17.2934Z"
                fill="#020A0E"
              />
            </Svg>
          </Pressable>
        </View>
      ),
    });
  }, [articleKey, chapterId, navigation, toggleModal]);

  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([5]);
  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
  const sliderOneValuesChange = values => setSliderOneValue(values);

  DeviceBrightness.setBrightnessLevel(0.1);

  return (
    <ScrollView style={[styles.container, styles.articleContainer]}>
      <Text style={styles.articleTitle}>
        {dataArticle[chapterId].detail[articleKey - 1].articleTitle}
      </Text>
      {dataArticle[chapterId].detail[articleKey - 1].contentText.map(i => (
        <View
          key={dataArticle[chapterId].detail[
            articleKey - 1
          ].contentText.indexOf(i)}>
          <Text style={styles.articleText}>{i.text}</Text>
          {i.img !== '' ? <Image source={i.img} /> : <Text />}
        </View>
      ))}
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.3}
        swipeDirection="down"
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{sliderOneValue}</Text>
          <MultiSlider
            values={sliderOneValue}
            onValuesChangeStart={sliderOneValuesChangeStart}
            onValuesChange={sliderOneValuesChange}
          />
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  articleText: {
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContent: {
    flexDirection: 'row',
  },
  iconHeaderCenter: {
    paddingHorizontal: 20,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
  },
});
