import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {dataArticle} from '../../data/chapter1';
import {save} from '../../store/global';
import {SvgXml} from 'react-native-svg';
import {svgFlash, svgArrow, svgBookmark} from '../../components/svgImage';
import {introScreen} from '../../store/global';
import SliderIntro from 'react-native-slider-intro';

const slides = [
  {
    index: 1,
    title: 'Биофизика',
    text: 'Интерактивное образовательное приложение предназначено для студентов медицинских, биологических и фармацевтических специальностей.',
    image: require('../../assets/atom.png'),
    backgroundColor: '#EFF2F3',
  },
  {
    index: 2,
    title: 'Биофизика',
    text: 'Приложение будет интересно студентам, аспирантам – всем, кто интересуется современным состоянием биологической и медицинской физики.',
    image: require('../../assets/atom.png'),
    backgroundColor: '#EFF2F3',
  },
  {
    index: 3,
    title: 'Биофизика',
    text: 'Учебное пособие «Биофизика. Физика для медицинских специальностей» с функцией поиска по главам.',
    image: require('../../assets/atom.png'),
    backgroundColor: '#EFF2F3',
  },
];

const renderNextButton = () => {
  return (
    <View style={styles.nextButton}>
      <Text style={styles.text}>Next</Text>
    </View>
  );
};

const renderDoneButton = () => {
  return (
    <View style={styles.nextButton}>
      <Text style={styles.text}>Done</Text>
    </View>
  );
};

const renderSkipButton = () => {
  return (
    <View>
      <Text style={styles.text}>Skip</Text>
    </View>
  );
};

function closeIntro() {
  introScreen.showIntro = false;
  console.log(introScreen.showIntro);
}

console.log(introScreen.showIntro);

const HomeScreen = ({navigation}) => {
  const [checkBookmark, setCheckBookmark] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Биофизика',
      headerTitleAlign: 'center',
      headerRight: () => (
        <View>
          <Pressable onPress={() => alert('Click!')}>
            <SvgXml xml={svgFlash} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (save.length >= 1) {
        setCheckBookmark(true);
      } else {
        setCheckBookmark(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {introScreen.showIntro ? (
        <SliderIntro
          renderNextButton={renderNextButton}
          renderDoneButton={renderDoneButton}
          renderSkipButton={renderSkipButton}
          navContainerMaxSizePercent={0.3}
          // navigationBarHeight={150}
          fixDotBackgroundColor={'#93B8CC'}
          animatedDotBackgroundColor={'#387EA6'}
          statusBar={true}
          statusBarColor={'#387EA6'}
          columnButtonStyle={false}
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
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textSlider: {
    color: '#000',
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
  // saveLinkButtonContent: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // saveLinkText: {
  //   marginLeft: 14,
  //   fontSize: 18,
  //   color: '#c2c2c2',
  // },
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
