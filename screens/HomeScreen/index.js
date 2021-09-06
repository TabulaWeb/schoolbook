import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import {dataArticle} from '../../data/chapter1';
import {SvgXml} from 'react-native-svg';
import {svgFlash, svgArrow, svgBookmark} from '../../components/svgImage';
import {introScreen} from '../../store/global';
import GlobalStore from '../../store/global';
import SliderIntro from 'react-native-slider-intro';
import {observer} from 'mobx-react';

const slides = [
  {
    index: 1,
    title: 'Биофизика',
    text: 'Интерактивное образовательное приложение предназначено для студентов медицинских, биологических и фармацевтических специальностей. Приложение будет интересно студентам, аспирантам – всем, кто интересуется современным состоянием биологической и медицинской физики.',
    image: require('../../assets/atom.png'),
    backgroundColor: '#EFF2F3',
  },
  {
    index: 2,
    title: 'Биофизика',
    text: 'Учебное пособие «Биофизика. Физика для медицинских специальностей» с функцией поиска по главам.',
    image: require('../../assets/IntroTwo.png'),
    backgroundColor: '#EFF2F3',
  },
  {
    index: 3,
    title: 'Биофизика',
    text: 'Практикум по физике для студентов-медиков, который состоит из вопросов и задач по основным темам курса.',
    image: require('../../assets/IntroThree.png'),
    backgroundColor: '#EFF2F3',
  },
];

const renderNextButton = () => {
  return (
    <View style={styles.NextButton}>
      <Text style={styles.textNextButton}>Далее</Text>
    </View>
  );
};

const renderDoneButton = () => {
  return (
    <View style={styles.DoneButton}>
      <Text style={styles.textDoneButton}>Закрыть</Text>
    </View>
  );
};

const renderSkipButton = () => {
  return (
    <View style={styles.SkipButton}>
      <Text style={styles.textSkipButton}>Пропустить</Text>
    </View>
  );
};

function closeIntro() {
  GlobalStore.setSgowIntro(false);
}

console.log(introScreen.showIntro);

const HomeScreen = observer(({navigation}) => {
  const [checkBookmark, setCheckBookmark] = useState(false);

  if (GlobalStore.showIntro) {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Биофизика',
        headerTitleAlign: 'center',
        headerShown: false,
        headerRight: () => (
          <View>
            <Pressable onPress={() => alert('Click!')}>
              <SvgXml xml={svgFlash} />
            </Pressable>
          </View>
        ),
      });
    }, [navigation]);
  } else {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Биофизика',
        headerTitleAlign: 'center',
        headerShown: true,
        headerRight: () => (
          <View>
            <Pressable onPress={() => alert('Click!')}>
              <SvgXml xml={svgFlash} />
            </Pressable>
          </View>
        ),
      });
    }, [navigation]);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (GlobalStore.save.length >= 1) {
        setCheckBookmark(true);
      } else {
        setCheckBookmark(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {GlobalStore.showIntro ? (
        <SliderIntro
          renderNextButton={renderNextButton}
          renderDoneButton={renderDoneButton}
          renderSkipButton={renderSkipButton}
          navContainerMaxSizePercent={0.3}
          navigationBarHeight={200}
          fixDotBackgroundColor={'#93B8CC'}
          animatedDotBackgroundColor={'#387EA6'}
          statusBar={true}
          statusBarColor={'#387EA6'}
          columnButtonStyle={true}
          data={slides}
          onDone={closeIntro}
          onSkip={closeIntro}
        />
      ) : (
        <View>
          <View style={[styles.content, styles.searchContent]}>
            <TextInput style={styles.searchInput} placeholder="Поиск" />
          </View>
          <ScrollView style={[styles.content, styles.itemsbook]}>
            {checkBookmark ? (
              <Pressable
                style={styles.saveLinkContainer}
                onPress={() => navigation.navigate('BookmarkScreen')}>
                <View style={styles.saveLinkButtonContent}>
                  <SvgXml xml={svgBookmark} />
                  <Text style={styles.saveLinkText}>Перейти к закладкам</Text>
                </View>
                <View>
                  <SvgXml xml={svgArrow} />
                </View>
              </Pressable>
            ) : (
              <Text />
            )}
            {dataArticle.map(i => (
              <View key={i.id}>
                <Pressable
                  style={styles.itembook}
                  onPress={() =>
                    navigation.navigate('DetailScreen', {
                      idChapter: i.id,
                    })
                  }>
                  <Text style={styles.itembookNumber}>{i.id}</Text>
                  <Text style={styles.itembookTitle}>{i.title}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textSlider: {
    color: '#000',
  },
  NextButton: {
    paddingVertical: 13,
    backgroundColor: '#387EA6',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
  textNextButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 20,
  },
  DoneButton: {
    paddingVertical: 13,
    backgroundColor: '#387EA6',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
  textDoneButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 20,
  },
  saveLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    borderBottomColor: '#C2C2C2',
    borderBottomWidth: 1,
    paddingBottom: 15,
    alignItems: 'center',
  },
  searchContent: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: '#EEF1F3',
  },
  searchInput: {
    width: '100%',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 34,
    borderRadius: 8,
    backgroundColor: '#E7E9EB',
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
  textSkipButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#387EA6',
  },
  saveLinkButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveLinkText: {
    marginLeft: 14,
    fontSize: 18,
    color: '#c2c2c2',
  },
  // imageStyle: {
  //   height: 10,
  //   width: 10,
  // },
  // wrapper: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginVertical: 30,
  // },
  // header: {
  //   fontSize: 30,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  // },
  // paragraph: {
  //   fontSize: 17,
  // },
  // paginationWrapper: {
  //   position: 'absolute',
  //   bottom: 200,
  //   left: 0,
  //   right: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  // paginationDots: {
  //   height: 10,
  //   width: 10,
  //   borderRadius: 10 / 2,
  //   backgroundColor: '#0898A0',
  //   marginLeft: 10,
  // },
});
