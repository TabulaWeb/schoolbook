import React, {useEffect} from 'react';
import {dataArticle} from '../../data/chapter1';
import {save} from '../../store/global';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';

const BookmarkScreen = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Закладки',
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    const getBookmark = navigation.addListener('focus', async () => {
      console.log(save);
    });
    return getBookmark;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {save.map(i => (
        <View
          style={styles.bookmarkContainer}
          key={dataArticle[i.savedArticle].detail[
            i.savedSubArticle - 1
          ].contentText.indexOf(i)}>
          <Pressable
            style={styles.itembook}
            onPress={() =>
              navigation.navigate('ArticleScreen', {
                articleKey: i.savedSubArticle,
                chapterId: i.savedArticle,
              })
            }>
            <Text style={styles.itembookNumber}>
              {dataArticle[i.savedArticle].detail[i.savedSubArticle - 1].number}
            </Text>
            <Text style={styles.itembookTitle}>
              {
                dataArticle[i.savedArticle].detail[i.savedSubArticle - 1]
                  .articleTitle
              }
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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