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
import {observer} from 'mobx-react';
import GlobalStore from '../../store/global';
import {SearchBar} from 'react-native-elements';

const HomeScreen = observer(({navigation}) => {
  const [checkBookmark, setCheckBookmark] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(dataArticle);
  }, []);

  const updateSearch = search => {
    setSearch(search);
    const filtredBook = dataArticle.filter(book => {
      return book.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(filtredBook);

    console.log(filter);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Биофизика',
      headerTitleAlign: 'center',
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: '#EEF1F3',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerLeft: () => <Text />,
      headerRight: () => (
        <View>
          <Pressable onPress={() => navigation.navigate('SubscriptionScreen')}>
            <SvgXml xml={svgFlash} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

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
      <View>
        <View style={[styles.content, styles.searchContent]}>
          <SearchBar
            placeholder="Поиск"
            lightTheme="true"
            clearIcon={true}
            round="true"
            inputContainerStyle={styles.searchInput}
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchbar}
            inputStyle={styles.inputStyl}
          />
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
          {filter.map(i => (
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
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    backgroundColor: null,
    borderColor: null,
    borderTopWidth: null,
    marginTop: 10,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  searchInput: {
    backgroundColor: '#DBDBDD',
    borderColor: null,
    borderTopWidth: null,
  },
  inputStyl: {
    paddingHorizontal: 0,
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
