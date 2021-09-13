import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import GlobalStore from '../../store/global';

const DetailScreen = ({route, navigation}) => {
  const {idChapter} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: GlobalStore.bookData[idChapter - 1].title,
      headerTitleAlign: 'center',
      headerShadowVisible: false,
    });
  }, [idChapter, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.content, styles.itemsbook]}>
        {GlobalStore.bookData[idChapter - 1].articles.map(i => (
          <View key={i.key}>
            <Pressable
              style={styles.itembook}
              onPress={() =>
                navigation.navigate('ArticleScreen', {
                  articleKey:
                    GlobalStore.bookData[idChapter - 1].articles.indexOf(i) + 1,
                  chapterId: idChapter,
                })
              }>
              <Text style={styles.itembookNumber}>
                {GlobalStore.bookData[idChapter - 1].articles.indexOf(i) + 1}
              </Text>
              <Text style={styles.itembookTitle}>{i.title}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

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
