import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {introScreen} from './store/global';

import ArticleScreen from './screens/ArticleScreen';
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F3F5F5',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'normal',
            textAlign: 'center',
          },
        }}>
        {introScreen.showIntro ? (
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
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
              headerTitleStyle: {
                fontWeight: '500',
              },
            }}
          />
        )}
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
};

export default App;
