import React, {useEffect, useState} from 'react';
import GlobalStore from '../../store/global';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {observer} from 'mobx-react';

const BookmarkScreen = observer(({navigation}) => {
  let [bookmarkContent, setBookmarkContent] = useState(
    GlobalStore.bookMarkSave,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Закладки',
      headerTitleAlign: 'center',
      headerShadowVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    const getBookmark = navigation.addListener('focus', async () => {
      if (GlobalStore.bookMarkSave.length < 1) {
        navigation.navigate('HomeScreen');
      }
    });
    return getBookmark;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const getSaveBookmark = navigation.addListener('focus', async () => {
        await setBookmarkContent(GlobalStore.bookMarkSave);
      });
      return getSaveBookmark;
    }, [navigation]),
  );

  // console.log(bookmarkContent[0].info);
  // console.log(GlobalStore.bookMarkSave[0]);

  return (
    <ScrollView style={styles.container}>
      {bookmarkContent.map((i, k) => (
        <View style={styles.bookmarkContainer} key={bookmarkContent.indexOf(i)}>
          {GlobalStore.bookData[i.info.section_id - 1].articles.map(
            (p, q) => (p.id == i.info.article_id ? (
              <Pressable
                style={styles.itembook}
                onPress={() =>
                  navigation.navigate('ArticleScreen', {
                    articleKey: q+1,
                    chapterId: i.info.section_id,
                  })
                }>
                <Text style={styles.itembookNumber}>{k + 1}</Text>
                <Text style={styles.itembookTitle}>{p.title}</Text>
              </Pressable>
            ) : null),
          )}
        </View>
      ))}
    </ScrollView>
  );
});

export default BookmarkScreen;

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
  bookmarkContainer: {
    paddingLeft: 20,
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
});
