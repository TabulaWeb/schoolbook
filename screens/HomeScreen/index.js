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
import {save} from '../../store/global';
import {SvgXml} from 'react-native-svg';
import {svgFlash, svgArrow, svgBookmark} from '../../components/svgImage'

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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  saveLinkButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveLinkText: {
    marginLeft: 14,
    fontSize: 18,
    color: '#c2c2c2',
  },
});
