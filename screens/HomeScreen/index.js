import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import data from '../../data/chapter.json';

const HomeScreen = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Биофизика',
      headerTitleAlign: 'center',
      headerRight: () => (
        <View>
          <Pressable onPress={() => alert('Click!')}>
            <Svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M17.7729 8.48243C17.7329 8.41189 17.675 8.35322 17.6049 8.31239C17.5349 8.27157 17.4552 8.25006 17.3742 8.25006H11.37L12.3766 0.558879C12.3874 0.455945 12.3633 0.352371 12.308 0.264833C12.2528 0.177295 12.1697 0.110887 12.0722 0.0763024C11.9746 0.0417173 11.8683 0.0409673 11.7703 0.074173C11.6722 0.107379 11.5882 0.172608 11.5318 0.259358L4.23008 13.0517C4.18738 13.1211 4.16398 13.2007 4.16229 13.2822C4.1606 13.3637 4.18067 13.4442 4.22045 13.5154C4.26023 13.5865 4.31827 13.6458 4.38858 13.687C4.4589 13.7283 4.53894 13.75 4.62047 13.7501H10.5349L9.73718 21.4528C9.72935 21.5554 9.75604 21.6576 9.81302 21.7433C9.86999 21.829 9.95398 21.8931 10.0516 21.9255C10.1493 21.9579 10.2549 21.9568 10.3518 21.9222C10.4487 21.8877 10.5313 21.8217 10.5864 21.7348L17.7674 8.94386C17.8091 8.8743 17.8315 8.79495 17.8325 8.71389C17.8334 8.63283 17.8129 8.55296 17.7729 8.48243Z"
                fill="#50C7F8"
              />
            </Svg>
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

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
