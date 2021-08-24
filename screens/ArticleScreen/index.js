import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import data from '../../data/chapter.json';

const ArticleScreen = ({route, navigation}) => {
  const {articleKey, chapterId} = route.params;

  return (
    <View style={[styles.container, styles.articleContainer]}>
      <Text style={styles.articleTitle}>
        {data[chapterId - 1].detail[articleKey - 1].articleTitle}
      </Text>
      {data[chapterId - 1].detail[articleKey - 1].contentText.map(i => (
        <Text style={styles.articleText}>{i.text}</Text>
      ))}
    </View>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  articleText: {
    fontSize: 16,
    marginBottom: 15,
  },
});
