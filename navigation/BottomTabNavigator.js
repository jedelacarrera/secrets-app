import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import DocsScreen from '../screens/DocsScreen';
import NewScreen from '../screens/NewScreen';
import SecretsScreen from '../screens/SecretsScreen';
import Colors from '../constants/Colors'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Secrets';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTitle: getHeaderTitle(route),
    headerTitleStyle: {
      fontSize: 24,
      paddingLeft: 20
    },
    headerTintColor: '#fff',
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Secrets"
        component={SecretsScreen}
        options={{
          title: 'Secrets',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-lock" />,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="New"
        component={NewScreen}
        options={{
          title: 'New',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add" />,
        }}
      />
      <BottomTab.Screen
        name="Docs"
        component={DocsScreen}
        options={{
          title: 'Docs',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Secrets':
      return 'My Secrets';
    case 'New':
      return 'Add a new secret';
    case 'Docs':
      return 'Docs';
  }
}
