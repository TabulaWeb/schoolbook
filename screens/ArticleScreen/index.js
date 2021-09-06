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
import {SvgXml} from 'react-native-svg';
import {
  svgButtonText,
  svgButtonSun,
  svgHeaderAcriveMark,
  svgHeaderAnactiveMark,
  svgSmallText,
  svgBigText,
  svgSmallLight,
  svgBigLight,
} from '../../components/svgImage';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import GlobalStore from '../../store/global';

const ArticleScreen = ({route, navigation}) => {
  const {articleKey, chapterId} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleLight, setModalVisibleLight] = useState(false);
  const [checkSaveArticle, setCheckSaveArticle] = useState(null);

  useEffect(() => {
    GlobalStore.save.map(i => {
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
            <SvgXml xml={svgButtonText} />
          </Pressable>
          <Pressable
            style={[styles.iconHeader, styles.iconHeaderCenter]}
            onPress={() => toggleModalLight()}>
            <SvgXml xml={svgButtonSun} />
          </Pressable>
          {checkSaveArticle ? (
            <Pressable onPress={() => removeSavedAeticle()}>
              <SvgXml xml={svgHeaderAcriveMark} />
            </Pressable>
          ) : (
            <Pressable onPress={() => createSavedAeticle()}>
              <SvgXml xml={svgHeaderAnactiveMark} />
            </Pressable>
          )}
        </View>
      ),
    });
  }, [articleKey, chapterId, navigation, toggleModal, toggleModalLight]);

  function createSavedAeticle() {
    GlobalStore.setSaveBookmark({
      savedArticle: chapterId,
      savedSubArticle: articleKey,
    });
    setCheckSaveArticle(true);
  }

  function removeSavedAeticle() {
    setCheckSaveArticle(false);
    let itemsqwerty = GlobalStore.save.findIndex(
      i => i.savedSubArticle == articleKey && i.savedArticle == chapterId,
    );
    GlobalStore.removeSaveBookmark(itemsqwerty);
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
          {i.img !== '' ? (
            <Image style={styles.imageArticle} source={i.img} />
          ) : (
            <Text />
          )}
        </View>
      ))}
      {dataArticle[chapterId].detail.length == articleKey ? (
        <Pressable 
          style={styles.buttonNext}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonNextText}>Завершить</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.buttonNext}
          onPress={() =>
            navigation.navigate('ArticleScreen', {
              articleKey: articleKey + 1,
              chapterId: chapterId,
            })
          }>
          <Text style={styles.buttonNextText}>Далее</Text>
        </Pressable>
      )}

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.3}
        swipeDirection="down"
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.containerLight}>
            <View style={[styles.smalLight, styles.svgLight]}>
              <SvgXml xml={svgSmallText} />
            </View>
            <MultiSlider
              values={sliderOneValue}
              stepsAs={[2, 4, 8, 10]}
              sliderLength={window.width - 100}
              onValuesChangeStart={sliderOneValuesChangeStart}
              onValuesChange={sliderOneValuesChange}
            />
            <View style={[styles.bigLight, styles.svgLight]}>
              <SvgXml xml={svgBigText} />
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
              <SvgXml xml={svgSmallLight} />
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
              <SvgXml xml={svgBigLight} />
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
    paddingHorizontal: 20,
  },
  articleTitle: {
    marginTop: 25,
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
  buttonNextText: {
    fontSize: 21,
    fontWeight: '700',
  },
  buttonNext: {
    flexDirection: 'row',
    borderColor: '#000',
    borderRadius: 7,
    borderWidth: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageArticle: {
    marginBottom: 20
  }
});
