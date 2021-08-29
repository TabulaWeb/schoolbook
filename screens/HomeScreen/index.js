import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import {dataArticle} from '../../data/chapter1';
import {save} from '../../store/global';

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

  console.log(save);

  return (
    <View style={styles.container}>
      <View style={[styles.content, styles.searchContent]}>
        <TextInput style={styles.searchInput} placeholder="Поиск" />
      </View>
      <ScrollView style={[styles.content, styles.itemsbook]}>
        {save.savedArticle != null && save.savedSubArticle != null ? (
          <Pressable
            style={styles.saveLinkContainer}
            onPress={() =>
              navigation.navigate('ArticleScreen', {
                articleKey: save.savedSubArticle,
                chapterId: save.savedArticle,
              })
            }>
            <View style={styles.saveLinkButtonContent}>
              <Svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <G opacity="0.3">
                  <Path
                    d="M16.453 0H3.54708C3.14298 0 2.8154 0.327617 2.8154 0.731678V2.76882C2.8154 3.03824 3.0338 3.2566 3.30317 3.2566H16.6969C16.9663 3.2566 17.1846 3.0382 17.1846 2.76882V0.731678C17.1847 0.327617 16.8571 0 16.453 0Z"
                    fill="#020A0E"
                  />
                  <Path
                    d="M16.6969 4.23218H3.30317C3.03376 4.23222 2.8154 4.45061 2.8154 4.72003V19.2501C2.8154 19.9355 3.61176 20.2379 4.06442 19.7851L10 13.8495L15.9356 19.785C16.3852 20.2348 17.1847 19.9408 17.1847 19.2486V4.71999C17.1847 4.45058 16.9663 4.23218 16.6969 4.23218Z"
                    fill="#020A0E"
                  />
                </G>
              </Svg>
              <Text style={styles.saveLinkText}>Перейти к закладкам</Text>
            </View>
            <View>
              <Svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  opacity="0.3"
                  d="M0.182228 0.186385C-0.0607287 0.434864 -0.0607702 0.83781 0.18227 1.08633L5.9645 6.99985L0.182228 12.9137C-0.0607288 13.1621 -0.0607704 13.5651 0.18227 13.8136C0.425268 14.0621 0.819218 14.0621 1.06222 13.8136L7.28444 7.4498C7.40113 7.33046 7.46667 7.16861 7.46667 6.99985C7.46667 6.83109 7.40108 6.66919 7.2844 6.5499L1.06218 0.186428C0.819218 -0.0621357 0.425227 -0.0621366 0.182228 0.186385Z"
                  fill="#020A0E"
                />
              </Svg>
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
