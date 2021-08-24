import React from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import data from '../../data/chapter1.json';

const DetailScreen = ({route, navigation}) => {
  const {idChapter} = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: data[idChapter].title,
      headerTitleAlign: 'center',
    });
  }, [idChapter, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.content, styles.itemsbook]}>
        {data[idChapter].detail.map(i => (
          <Pressable
            style={styles.itembook}
            onPress={() =>
              navigation.navigate('ArticleScreen', {
                articleKey: i.key,
                chapterId: idChapter,
              })
            }>
            <Text style={styles.itembookNumber}>{i.number}</Text>
            <Text style={styles.itembookTitle}>{i.articleTitle}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
