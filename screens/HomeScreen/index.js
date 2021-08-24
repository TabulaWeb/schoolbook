import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import data from '../../data/chapter.json';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.content, styles.searchContent]}>
        <TextInput style={styles.searchInput} placeholder="Поиск" />
      </View>
      <ScrollView style={[styles.content, styles.itemsbook]}>
        {data.map(i => (
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
