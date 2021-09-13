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
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
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
import {observer} from 'mobx-react';
import {configure} from 'mobx';

configure({enforceActions: 'observed'});

const ArticleScreen = observer(({route, navigation}) => {
  const {articleKey, chapterId} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleLight, setModalVisibleLight] = useState(false);
  const [checkSaveArticle, setCheckSaveArticle] = useState(null);
  const [deleteSaveArticle, setDeleteSave] = useState(null);

  // Проверка на наличе в закладках
  useEffect(() => {
    GlobalStore.bookMarkSave.map(i => {
      if (i.info.article_id == articleKey && i.info.section_id == chapterId) {
        setDeleteSave(i.id);
        setCheckSaveArticle(true);
      }
    });
  }, [articleKey, chapterId]);

  console.log(GlobalStore.bookMarkSave);

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
      headerShadowVisible: false,
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

  // Добавить в закладки
  function createSavedAeticle() {
    fetch('http://194.67.116.116:1337/api/bookmark/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: 'TFETQRTTZAD0EPHP',
        article_id:
          GlobalStore.bookData[chapterId - 1].articles[articleKey - 1].id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
    setCheckSaveArticle(true);
  }

  console.log(deleteSaveArticle);
  // Убрать из закладок
  function removeSavedAeticle() {
    fetch(
      `http://194.67.116.116:1337/api/bookmark​/delete​/${deleteSaveArticle}​/`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
    setCheckSaveArticle(false);
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
        {GlobalStore.bookData[chapterId - 1].articles[articleKey - 1].title}
      </Text>
      {GlobalStore.bookData[chapterId - 1].articles[articleKey - 1].detail.map(
        i => (
          <View
            key={GlobalStore.bookData[chapterId - 1].articles[
              articleKey - 1
            ].detail.indexOf(i)}>
            <Text
              style={[styles.articleText, {fontSize: 16 + +sliderOneValue}]}>
              {i.text}
            </Text>
            {i.img !== null ? (
              <Image style={styles.imageArticle} source={i.img} />
            ) : (
              <Text />
            )}
          </View>
        ),
      )}
      {GlobalStore.bookData[chapterId - 1].articles.length == articleKey ? (
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
        backdropOpacity={0}
        swipeDirection="down"
        style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
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
        </View>
      </Modal>

      <Modal
        isVisible={isModalVisibleLight}
        backdropOpacity={0}
        swipeDirection="down"
        style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={toggleModalLight}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
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
        </View>
      </Modal>
    </ScrollView>
  );
});

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginBottom: 20,
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
