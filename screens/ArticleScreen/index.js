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
import UserStore from '../../store/user';
import {observer} from 'mobx-react';

const ArticleScreen = observer(({route, navigation}) => {
  const {articleKey, chapterId} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleLight, setModalVisibleLight] = useState(false);
  const [checkSaveArticle, setCheckSaveArticle] = useState(null);
  const [deleteSaveArticle, setDeleteSave] = useState(null);
  const [tooltip, setTooltip] = useState(false);
  const [textTooltip, setTextTooltip] = useState(null);

  const getBookmarSavekJson = async () => {
    const bookMarkDatas = await fetch(
      `http://194.67.111.21:1337/api/bookmarks/?token=${UserStore.userToken}`,
      {
        method: 'GET',
      },
    );
    const bookmark = await bookMarkDatas.json();

    bookmark.map(i => {
      if (i.info.article_id == articleKey && i.info.section_id == chapterId) {
        setDeleteSave(i.id);
      }
    });
  };

  //Проверка на наличе в закладках
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getBookmarSavekJson();
      GlobalStore.bookMarkSave.map(i => {
        if (i.info.article_id == articleKey && i.info.section_id == chapterId) {
          setCheckSaveArticle(true);
        }
      });
    });

    return unsubscribe;
  }, [articleKey, chapterId, navigation]);

  // const recheckSaveButton = () => {
  //   getBookmarSavekJson();
  //   GlobalStore.bookMarkSave.map(i => {
  //     if (i.info.article_id == articleKey && i.info.section_id == chapterId) {
  //       setCheckSaveArticle(true);
  //     }
  //   });
  // };

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  });

  const toggleModalLight = useCallback(() => {
    setModalVisibleLight(!isModalVisibleLight);
  });

  const window = useWindowDimensions();

  React.useLayoutEffect(() => {
    getBookmarSavekJson();

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
    fetch('http://194.67.111.21:1337/api/bookmark/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: `${UserStore.userToken}`,
        article_id:
          GlobalStore.bookData[chapterId - 1].articles[articleKey - 1].id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // console.log(json);
      });
    GlobalStore.pushBookMark({
      info: {section_id: chapterId, article_id: articleKey},
    });
    setCheckSaveArticle(true);
  }

  // Убрать из закладок
  async function removeSavedAeticle() {
    let requestOptions = {
      method: 'DELETE',
    };

    fetch(
      `http://194.67.111.21:1337/api/bookmark/delete/${deleteSaveArticle}/`,
      requestOptions,
    );

    await GlobalStore.bookMarkSave.map((i, k) => {
      if (i.info.article_id == articleKey && i.info.section_id == chapterId) {
        GlobalStore.removeBookMark(k);
      }
    });
    // console.log(GlobalStore.bookMarkSave);
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
      <View>
        {GlobalStore.bookData[chapterId - 1].articles[
          articleKey - 1
        ].detail.map(i => (
          <View
            key={GlobalStore.bookData[chapterId - 1].articles[
              articleKey - 1
            ].detail.indexOf(i)}>
            <View style={{flexDirection: 'row', width:'100%', flexWrap:'wrap'}}>
              {i.text.split(' ').map(k => (
               <View>
                {k == i.word ? (
                  <Pressable
                    onPress={() => {
                        setTooltip(!tooltip);
                        setTextTooltip(i.additional_text);
                    }}
                    style={{marginRight: 6, borderBottomWidth: 1, borderStyle: 'dashed'}}
                  >
                    <Text
                      style={{fontSize: 16 + +sliderOneValue}}
                    >{k}</Text>
                  </Pressable>
                ) : (
                  <Text style={{marginRight: 6, fontSize: 16 + +sliderOneValue}}>{k}</Text>
                )}
                </View>
                )
              )}
            </View>
            {i.image !== null ? (
              <Image
                style={styles.imageArticle}
                source={{uri: `http://194.67.111.21:1337${i.image}`}}
              />
            ) : (
              <Text />
            )}
          </View>
        ))}
      </View>
      {GlobalStore.bookData[chapterId - 1].articles.length == articleKey ? (
        <Pressable 
          style={styles.buttonNext}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonNextText}>Завершить</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.buttonNext}
          onPress={() => {
            navigation.navigate('ArticleScreen', {
              articleKey: articleKey + 1,
              chapterId: chapterId,
            });
            GlobalStore.bookMarkSave.map(i => {
              console.log(articleKey);
              if (i.info.article_id == articleKey + 1 && i.info.section_id == chapterId) {
                setCheckSaveArticle(true);
              } else {
                setCheckSaveArticle(false);
              }
            });
          }}>
          <Text style={styles.buttonNextText}>Далее</Text>
        </Pressable>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={tooltip}
        style={styles.modalContainerTooltip}>
        <TouchableWithoutFeedback onPress={() => setTooltip(!tooltip)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{textTooltip}</Text>
            <Pressable
              style={[styles.buttonTooltip, styles.buttonCloseTooltip]}
              onPress={() => setTooltip(!tooltip)}>
              <Text style={styles.textStyle}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  modalContainerTooltip: {
    justifyContent: 'center',
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
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonTooltip: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonCloseTooltip: {
    backgroundColor: "#50C7F8",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
