import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStore from './store/global';
import ArticleScreen from './screens/ArticleScreen';
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import IntroScreen from './screens/IntroScreen';
import SubscriptionScreen from './screens/SubscruptionScreen';

const Stack = createNativeStackNavigator();

const getBookmarSavekJson = () => {
  fetch('http://194.67.116.116:1337/api/bookmarks/?token=TFETQRTTZAD0EPHP', {
    method: 'GET',
  })
    .then(response => {
      alert(`сохраненные главы ${response.status}`);
      return response.json();
    })
    .then(json => {
      json.map(i => {
        GlobalStore.pushBookMark({
          info: {
            section_id: i.info.section_id,
            article_id: i.info.article_id,
          },
        });
      });
    });
};

const App = () => {
  const [isFirstLaunch, setIsFeerstLaunch] = useState(null);

  useEffect(() => {
    GlobalStore.setSaveBookmark();
    GlobalStore.setBookmarks();
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFeerstLaunch(true);
      } else {
        setIsFeerstLaunch(false);
      }
    });
  }, []);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 2000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView source={require('./assets/animation.json')} autoPlay loop />
      </View>
    );
  }

  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#F3F5F5',
              elevation: null,
              shadowOpacity: null,
              borderBottomWidth: null,
            },
            headerLargeTitleShadowVisible: false,
            elevation: null,
            shadowOpacity: null,
            borderBottomWidth: null,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'normal',
              textAlign: 'center',
            },
          }}>
          <Stack.Screen
            name="IntroScreen"
            component={IntroScreen}
            options={{
              title: 'Биофизика',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#F3F5F5',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: 'Биофизика',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#F3F5F5',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{
              title: 'Подглава',
              headerStyle: {
                backgroundColor: '#EEF1F3',
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="SubscriptionScreen"
            component={SubscriptionScreen}
            options={{
              title: 'Подглава',
              headerStyle: {
                backgroundColor: '#EEF1F3',
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="ArticleScreen"
            component={ArticleScreen}
            options={{
              title: 'Глава',
              headerStyle: {
                backgroundColor: '#EEF1F3',
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="BookmarkScreen"
            component={BookmarkScreen}
            options={{
              title: 'Глава',
              headerStyle: {
                backgroundColor: '#EEF1F3',
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#F3F5F5',
              elevation: null,
              shadowOpacity: null,
              borderBottomWidth: null,
              shadowOffset: {
                height: null,
              },
              shadowRadius: null,
            },
            headerLargeTitleShadowVisible: false,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'normal',
              textAlign: 'center',
            },
          }}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: 'Биофизика',
              headerStyle: {
                backgroundColor: '#F3F5F5',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerLargeTitleShadowVisible: false,
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{
              title: 'Подглава',
              headerStyle: {
                backgroundColor: '#EEF1F3',
                elevation: null,
                shadowOpacity: null,
                borderBottomWidth: null,
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="SubscriptionScreen"
            component={SubscriptionScreen}
            options={{
              title: 'Подглава',
              headerStyle: {
                backgroundColor: '#EEF1F3',
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="ArticleScreen"
            component={ArticleScreen}
            options={{
              title: 'Глава',
              headerStyle: {
                backgroundColor: '#EEF1F3',
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
          <Stack.Screen
            name="BookmarkScreen"
            component={BookmarkScreen}
            options={{
              title: 'Глава',
              headerStyle: {
                backgroundColor: '#EEF1F3',
              },
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
