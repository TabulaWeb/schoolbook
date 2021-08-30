import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Button,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {dataArticle} from '../../data/chapter1';
import DeviceBrightness from '@adrianso/react-native-device-brightness';
import Svg, {Path} from 'react-native-svg';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ImageViewer from 'react-native-image-zoom-viewer';
import {save} from '../../store/global';

const ArticleScreen = ({route, navigation}) => {
  const {articleKey, chapterId} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleLight, setModalVisibleLight] = useState(false);
  const [checkSaveArticle, setCheckSaveArticle] = useState(null);

  useEffect(() => {
    save.map(i => {
      if (i.savedSubArticle == articleKey && i.savedArticle == chapterId) {
        setCheckSaveArticle(true);
      }
    });
  }, [articleKey, chapterId, checkSaveArticle]);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  });

  const toggleModalLight = useCallback(() => {
    setModalVisibleLight(!isModalVisibleLight);
  });

  const window = useWindowDimensions();

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
            onPress={() => toggleModalLight()}>
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
          {checkSaveArticle ? (
            <Pressable onPress={() => removeSavedAeticle()}>
              <Svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M18.0982 0H3.90177C3.45726 0 3.09692 0.360378 3.09692 0.804846V3.04571C3.09692 3.34206 3.33716 3.58226 3.63347 3.58226H18.3665C18.6629 3.58226 18.9031 3.34202 18.9031 3.04571V0.804846C18.9031 0.360378 18.5427 0 18.0982 0Z"
                  fill="#020A0E"
                />
                <Path
                  d="M18.3665 4.65527H3.63347C3.33712 4.65532 3.09692 4.89555 3.09692 5.19191V21.175C3.09692 21.9289 3.97293 22.2616 4.47085 21.7635L11 15.2343L17.5292 21.7634C18.0237 22.2582 18.9032 21.9348 18.9032 21.1734V5.19187C18.9031 4.89551 18.6629 4.65527 18.3665 4.65527Z"
                  fill="#020A0E"
                />
              </Svg>
            </Pressable>
          ) : (
            <Pressable onPress={() => createSavedAeticle()}>
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
          )}
        </View>
      ),
    });
  }, [articleKey, chapterId, navigation, toggleModal, toggleModalLight]);

  function createSavedAeticle() {
    save.push({savedArticle: chapterId, savedSubArticle: articleKey});
    setCheckSaveArticle(true);
  }

  function removeSavedAeticle() {
    setCheckSaveArticle(false);
    let itemsqwerty = save.findIndex(
      i => i.savedSubArticle == articleKey && i.savedArticle == chapterId,
    );
    save.splice(itemsqwerty, 1);
  }

  // Slider text
  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([0]);
  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
  const sliderOneValuesChange = values => setSliderOneValue(values);

  // Slider light
  const [sliderOneChangingLight, setSliderOneChangingLight] = React.useState(false);
  const [sliderOneValueLight, setSliderOneValueLight] = React.useState([1]);
  const sliderOneValuesChangeStartLight = () => setSliderOneChangingLight(true);
  const sliderOneValuesChangeLight = values => setSliderOneValueLight(values);

  // Add memory
  let numberLight = 0 + +sliderOneValueLight;

  DeviceBrightness.setBrightnessLevel(numberLight);

  return (
    <ScrollView style={[styles.container, styles.articleContainer]}>
      <Text style={[styles.articleTitle, {fontSize: 18 + +sliderOneValue}]}>
        {dataArticle[chapterId].detail[articleKey - 1].articleTitle}
      </Text>
      {dataArticle[chapterId].detail[articleKey - 1].contentText.map(i => (
        <View
          key={dataArticle[chapterId].detail[
            articleKey - 1
          ].contentText.indexOf(i)}>
          <Text style={[styles.articleText, {fontSize: 16 + +sliderOneValue}]}>
            {i.text}
          </Text>
          {i.img !== '' ? <Image source={i.img} /> : <Text />}
        </View>
      ))}
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.3}
        swipeDirection="down"
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.containerLight}>
            <View style={[styles.smalLight, styles.svgLight]}>
              <Svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M4.63918 8.29915H4.22683V1.70116H6.70106V2.11358C6.70106 2.34161 6.88537 2.52592 7.1134 2.52592C7.34144 2.52592 7.52575 2.34161 7.52575 2.11358V1.28881C7.52575 1.06078 7.34144 0.876465 7.1134 0.876465H0.412346C0.184314 0.876465 0 1.06078 0 1.28881V2.11358C0 2.34161 0.184314 2.52592 0.412346 2.52592C0.640378 2.52592 0.824768 2.34161 0.824768 2.11358V1.70116H3.40206V8.29915H2.98972C2.76168 8.29915 2.57729 8.48346 2.57729 8.71149C2.57729 8.93952 2.76168 9.12384 2.98972 9.12384H4.63918C4.86721 9.12384 5.05152 8.93952 5.05152 8.71149C5.05152 8.48346 4.86721 8.29915 4.63918 8.29915Z"
                  fill="#020A0E"
                />
                <Path
                  d="M9.58756 4.5874H6.28857C6.06053 4.5874 5.87622 4.77172 5.87622 4.99975V5.72137C5.87622 5.94941 6.06053 6.1338 6.28857 6.1338C6.5166 6.1338 6.70099 5.94941 6.70099 5.72137V5.4121H7.52568V8.29875H7.31954C7.09151 8.29875 6.90712 8.48306 6.90712 8.7111C6.90712 8.93913 7.09151 9.12344 7.31954 9.12344H8.55666C8.78469 9.12344 8.969 8.93913 8.969 8.7111C8.969 8.48306 8.78469 8.29875 8.55666 8.29875H8.35045V5.4121H9.17521V5.61831C9.17521 5.84634 9.35953 6.03065 9.58756 6.03065C9.81559 6.03065 9.99991 5.84634 9.99991 5.61831V4.99975C9.99991 4.77172 9.81559 4.5874 9.58756 4.5874Z"
                  fill="#020A0E"
                />
              </Svg>
            </View>
            <MultiSlider
              values={sliderOneValue}
              stepsAs={[2, 4, 8, 10]}
              sliderLength={window.width - 100}
              onValuesChangeStart={sliderOneValuesChangeStart}
              onValuesChange={sliderOneValuesChange}
            />
            <View style={[styles.bigLight, styles.svgLight]}>
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
            </View>
          </View>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>

      <Modal
        isVisible={isModalVisibleLight}
        backdropOpacity={0.3}
        swipeDirection="down"
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.containerLight}>
            <View style={[styles.smalLight, styles.svgLight]}>
              <Svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M6.77253 3.22756C6.3228 2.77782 5.68788 2.48682 5.00004 2.48682C4.31221 2.48682 3.67729 2.76459 3.22756 3.22756C2.77782 3.67729 2.48682 4.31221 2.48682 5.00004C2.48682 5.68787 2.77782 6.3228 3.22756 6.77253C3.67729 7.22227 4.31221 7.51327 5.00004 7.51327C5.68788 7.51327 6.3228 7.23549 6.77253 6.77253C7.22227 6.3228 7.51327 5.68787 7.51327 5.00004C7.51327 4.31221 7.2355 3.67729 6.77253 3.22756Z"
                  fill="#020A0E"
                />
                <Path
                  d="M5.00004 1.70635C5.18523 1.70635 5.34396 1.54762 5.34396 1.36243V0.343915C5.34396 0.15873 5.18523 0 5.00004 0C4.81486 0 4.65613 0.15873 4.65613 0.343915V1.36243C4.65613 1.54762 4.81486 1.70635 5.00004 1.70635Z"
                  fill="#020A0E"
                />
                <Path
                  d="M7.81746 2.67205L8.54497 1.94454C8.67725 1.81226 8.67725 1.60062 8.54497 1.46835C8.4127 1.33607 8.20106 1.33607 8.06878 1.46835L7.34127 2.19586C7.209 2.32814 7.209 2.53978 7.34127 2.67205C7.46032 2.80433 7.67196 2.80433 7.81746 2.67205Z"
                  fill="#020A0E"
                />
                <Path
                  d="M9.65614 4.65576H8.63762C8.45243 4.65576 8.2937 4.81449 8.2937 4.99968C8.2937 5.18486 8.45243 5.34359 8.63762 5.34359H9.65614C9.84132 5.34359 10.0001 5.18486 10.0001 4.99968C10.0001 4.81449 9.84132 4.65576 9.65614 4.65576Z"
                  fill="#020A0E"
                />
                <Path
                  d="M7.80428 7.32821C7.672 7.19594 7.46036 7.19594 7.32809 7.32821C7.19581 7.46049 7.19581 7.67213 7.32809 7.8044L8.0556 8.53191C8.18788 8.66419 8.39952 8.66419 8.53179 8.53191C8.66407 8.39964 8.66407 8.188 8.53179 8.05572L7.80428 7.32821Z"
                  fill="#020A0E"
                />
                <Path
                  d="M5.00004 8.29346C4.81486 8.29346 4.65613 8.45219 4.65613 8.63737V9.65589C4.65613 9.84108 4.81486 9.99981 5.00004 9.99981C5.18523 9.99981 5.34396 9.84108 5.34396 9.65589V8.63737C5.34396 8.45219 5.18523 8.29346 5.00004 8.29346Z"
                  fill="#020A0E"
                />
                <Path
                  d="M2.18255 7.32821L1.45504 8.05572C1.32277 8.188 1.32277 8.39964 1.45504 8.53191C1.58732 8.66419 1.79896 8.66419 1.93123 8.53191L2.65874 7.8044C2.79102 7.67213 2.79102 7.46049 2.65874 7.32821C2.5397 7.19594 2.32806 7.19594 2.18255 7.32821Z"
                  fill="#020A0E"
                />
                <Path
                  d="M1.70635 4.99968C1.70635 4.81449 1.54762 4.65576 1.36243 4.65576H0.343915C0.15873 4.65576 0 4.81449 0 4.99968C0 5.18486 0.15873 5.34359 0.343915 5.34359H1.36243C1.54762 5.34359 1.70635 5.18486 1.70635 4.99968Z"
                  fill="#020A0E"
                />
                <Path
                  d="M2.18255 2.67205C2.31483 2.80433 2.52647 2.80433 2.65874 2.67205C2.79102 2.53978 2.79102 2.32814 2.65874 2.19586L1.93123 1.46835C1.79896 1.33607 1.58732 1.33607 1.45504 1.46835C1.32277 1.60062 1.32277 1.81226 1.45504 1.94454L2.18255 2.67205Z"
                  fill="#020A0E"
                />
              </Svg>
            </View>
            <MultiSlider
              values={sliderOneValueLight}
              min={0}
              max={1}
              step={0.1}
              sliderLength={window.width - 100}
              onValuesChangeStart={sliderOneValuesChangeStartLight}
              onValuesChange={sliderOneValuesChangeLight}
            />
            <View style={[styles.bigLight, styles.svgLight]}>
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
            </View>
          </View>
          <Button title="Hide modal" onPress={toggleModalLight} />
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
    fontWeight: 'bold',
    marginBottom: 25,
  },
  articleText: {
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
  containerLight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  bigLight: {
    marginLeft: 10,
  },
  smalLight: {
    marginRight: 10,
  },
});
